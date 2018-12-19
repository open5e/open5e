#!/bin/bash

#  Pre-requisites for running:  an existing, setup deployment from 
# https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04#create-a-gunicorn-systemd-service-file
# Author: augustjohnson on 2018.08.12.  

echo "[OPEN5E DEPLOYER] Stopping Gunicorn, Nginx"
# Stop services that need to be stopped.
systemctl stop nginx
systemctl stop gunicorn

echo "[OPEN5E DEPLOYER] Checking out new code, but keeping localized edits (to settings.py for example)."
# Stash existing, locally edited files.
git stash
# git pull
git pull
# pop the stash.
git stash pop

echo "[OPEN5E DEPLOYER] Running standard django deployment steps, migrate and collectstatic."
# django makemigrations
python ../manage.py makemigrations
# django migrate
python ../manage.py migrate
# django collectstatic
python ../manage.py collectstatic

echo "[OPEN5E DEPLOYER] Reloading config, and restarting webservices."
# Reload config and start services that were stopped.
systemctl daemon-reload
systemctl start nginx
systemctl start gunicorn
