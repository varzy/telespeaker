# 打包
FROM node:lts AS buildserver
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build

# Nginx 部署
FROM nginx:stable-alpine
COPY --from=buildserver /app/dist /usr/share/nginx/html
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf
