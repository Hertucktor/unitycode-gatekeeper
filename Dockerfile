FROM nginx:stable-perl

COPY index.html register.html login.html script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY images /usr/share/nginx/html/images
COPY styles /usr/share/nginx/html/styles

COPY nginx.conf /etc/nignx/nginx.conf