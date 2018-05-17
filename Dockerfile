FROM nginx:1.12.2
MAINTAINER Qiming Mei <meiqiming@talkweb.com.cn>
ADD default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/


