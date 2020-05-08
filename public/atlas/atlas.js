(function () {

  Renderer = function (canvas) {
    canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d")
    var particleSystem = null

    var that = {
      init: function (system) {
        particleSystem = system
        particleSystem.screen({
          padding: [100, 60, 60, 60], // leave some space at the bottom for the param sliders
          step: .02
        }) // have the ‘camera’ zoom somewhat slowly as the graph unfolds 
        $(window).resize(that.resize)
        that.resize()

        that.initMouseHandling()
      },
      redraw: function () {
        if (particleSystem === null) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = "#d3d3d3"
        ctx.lineWidth = 1
        ctx.beginPath()
        particleSystem.eachEdge(function (edge, pt1, pt2) {
          // edge: {source:Node, target:Node, length:#, data:{}}
          // pt1:  {x:#, y:#}  source position in screen coords
          // pt2:  {x:#, y:#}  target position in screen coords

          var weight = null // Math.max(1,edge.data.border/100)
          var color = null // edge.data.color
          if (!color || ("" + color).match(/^[ \t]*$/)) color = null

          if (color !== undefined || weight !== undefined) {
            ctx.save()
            ctx.beginPath()

            if (!isNaN(weight)) ctx.lineWidth = weight

            ctx.strokeStyle = edge.source.data.color

            // if (color) ctx.strokeStyle = color
            ctx.fillStyle = null

            ctx.moveTo(pt1.x, pt1.y)
            ctx.lineTo(pt2.x, pt2.y)
            ctx.stroke()
            ctx.restore()
          } else {
            // draw a line from pt1 to pt2
            ctx.moveTo(pt1.x, pt1.y)
            ctx.lineTo(pt2.x, pt2.y)
          }
        })
        ctx.stroke()

        particleSystem.eachNode(function (node, pt) {
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt:   {x:#, y:#}  node position in screen coords


          // determine the box size and round off the coords if we'll be 
          // drawing a text label (awful alignment jitter otherwise...)
          var w = ctx.measureText(node.data.label || "").width + 6
          var label = node.data.label
          if (!(label || "").match(/^[ \t]*$/)) {
            pt.x = Math.floor(pt.x)
            pt.y = Math.floor(pt.y)
          } else {
            label = null
          }

          // clear any edges below the text label
          // ctx.fillStyle = 'rgba(255,255,255,.6)'
          // ctx.fillRect(pt.x-w/2, pt.y-7, w,14)


          ctx.clearRect(pt.x - w / 2, pt.y - 7, w, 14)



          // draw the text
          if (label) {
            ctx.font = "bold 11px Arial"
            ctx.textAlign = "center"

            // if (node.data.region) ctx.fillStyle = palette[node.data.region]
            // else ctx.fillStyle = "#888888"
            ctx.fillStyle = "#888888"

            // ctx.fillText(label||"", pt.x, pt.y+4)
            ctx.fillText(label || "", pt.x, pt.y + 4)
          }
        })
      },

      resize: function () {
        var w = $(window).width(), h = $(window).height();
        canvas.width = w; canvas.height = h // resize the canvas element to fill the screen
        particleSystem.screenSize(w, h) // inform the system so it can map coords for us
        that.redraw()
      },

      initMouseHandling: function () {
        // no-nonsense drag and drop (thanks springy.js)
        selected = null;
        nearest = null;
        var dragged = null;
        var oldmass = 1

        $(canvas).mousedown(function (e) {
          var pos = $(this).offset();
          var p = { x: e.pageX - pos.left, y: e.pageY - pos.top }
          selected = nearest = dragged = particleSystem.nearest(p);
          if (selected.distance >= 50) {
            selected = nearest = dragged = null;
            return false
          }

          if (selected.node !== null) {
            dragged.node.tempMass = 50
            dragged.node.fixed = true
          }
          return false
        });

        $(canvas).mousemove(function (e) {
          var old_nearest = nearest && nearest.node._id
          var pos = $(this).offset();
          var s = { x: e.pageX - pos.left, y: e.pageY - pos.top };

          nearest = particleSystem.nearest(s);
          if (!nearest) return

          if (dragged !== null && dragged.node !== null) {
            var p = particleSystem.fromScreen(s)
            dragged.node.p = { x: p.x, y: p.y }
            // dragged.tempMass = 10000
          }

          return false
        });

        $(window).bind('mouseup', function (e) {
          if (dragged === null || dragged.node === undefined) return
          dragged.node.fixed = false
          dragged.node.tempMass = 100
          dragged = null;
          selected = null
          return false
        });

        $(canvas).click(function (e) {
          var pos = $(this).offset();
          var p = { x: e.pageX - pos.left, y: e.pageY - pos.top }
          let clicked = particleSystem.nearest(p);
          if (clicked !== undefined && clicked.distance < 50)
            window.parent.postMessage(clicked.node.data.data, "*");
          return false
        });

      },

    }

    return that
  }

  function refresh() {
    var sys = arbor.ParticleSystem(4000, 500, 0.5, 55)
    sys.renderer = Renderer("#viewport")
    let res = JSON.parse(decodeURIComponent(location.hash.substring(1)))
    // load the raw data into the particle system as is (since it's already formatted correctly for .merge)
    let data = { nodes: {}, edges: {} }
    for (let cid in res.Clients) {
      data.nodes[cid] = { color: "#D68300", data: res.Clients[cid] }
      data.edges[cid] = {}
    }
    for (let id in res.Vertexes) {
      data.nodes[id] = { color: "#6D87CF", data: res.Vertexes[id] }
      for (let idto of res.Vertexes[id].EdgeTo) {
        if (data.edges[id] === undefined) data.edges[id] = {}
        data.edges[id][idto] = {}
      }
      for (let cid of res.Vertexes[id].Clients) {
        data.nodes[cid] = { color: "#D68300", data: res.Clients[cid] }
        if (data.edges[cid] === undefined) data.edges[cid] = {}
        data.edges[cid][id] = {}
      }
    }
    var nodes = data.nodes
    $.each(nodes, function (name, info) {
      info.label = name.replace(/(people's )?republic of /i, '').replace(/ and /g, ' & ')
    })

    sys.merge({ nodes: nodes, edges: data.edges })
    sys.parameters({ stiffness: 400 })
  }

  $(document).ready(refresh)

})()