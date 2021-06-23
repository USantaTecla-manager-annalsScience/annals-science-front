FROM node:current-alpine3.12 as builder
WORKDIR /front
ARG ENVIRONMENT=local
COPY . .
RUN npm install -y
RUN npm install -g @angular/cli -y
RUN ng build --configuration=$ENVIRONMENT --base-href /

FROM nginx:1.17.6-alpine
RUN rm -r /usr/share/nginx/html/
COPY --from="builder" /front/dist/annals-science-front/ /usr/share/nginx/html/
