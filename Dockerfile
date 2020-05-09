FROM node:alpine

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /etc/nginx/html
COPY ./admin.nginx.conf /
COPY ./user.nginx.conf /

CMD [ "nginx","-c","/user.nginx.conf", "-g", "daemon off;" ]