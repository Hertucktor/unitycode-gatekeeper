FROM nginx:stable-perl

COPY index.html script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY styles /usr/share/nginx/html/styles

COPY nginx.conf /etc/nignx/nginx.conf