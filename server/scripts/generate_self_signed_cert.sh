#!/bin/bash

mkdir -p ./nginx/api
touch ./nginx/api/nginx-selfsigned.key
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./nginx/api/nginx-selfsigned.key -out ./nginx/api/nginx-selfsigned.crt -subj "/C=UA/ST=KS/L=OP/O=Open5e/OU=Awesome/CN=$SERVER_NAME"