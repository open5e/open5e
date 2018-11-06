#!/bin/bash

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /server/nginx-selfsigned.key -out /server/nginx-selfsigned.crt -subj "/C=UA/ST=KS/L=OP/O=Open5e/OU=Awesome/CN=api"