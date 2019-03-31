# Getting Started

## Clone repo

```sh
$ git clone git@github.com:eepMoody/open5e.git
Cloning into 'open5e'...
remote: Enumerating objects: 80, done.
remote: Counting objects: 100% (80/80), done.
remote: Compressing objects: 100% (57/57), done.
remote: Total 24817 (delta 33), reused 33 (delta 21), pack-reused 24737
Receiving objects: 100% (24817/24817), 42.13 MiB | 9.61 MiB/s, done.
Resolving deltas: 100% (13538/13538), done.

```

## Environment Setup

```sh
export DJANGO_SECRET="some random long string"
export SERVER_NAME="test-api.open5e.com" # (or whatever it should be)
```

## Run

```sh
$ pipenv install
Creating a virtualenv for this project…
Pipfile: /home/testuser/tmp/open5e/Pipfile
Using /usr/local/bin/python3.7 (3.7.0) to create virtualenv…
⠴Running virtualenv with interpreter /usr/local/bin/python3.7
Using base prefix '/usr/local'
New python executable in /home/testuser/.local/share/virtualenvs/open5e-bnZVKfh8/bin/python3.7
Also creating executable in /home/testuser/.local/share/virtualenvs/open5e-bnZVKfh8/bin/python
Installing setuptools, pip, wheel...
done.

Virtualenv location: /home/testuser/.local/share/virtualenvs/open5e-bnZVKfh8
Installing dependencies from Pipfile.lock (760223)…
  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 5/5 — 00:00:01
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.

$ pipenv shell
$ python create_certs.py

```

## Start docker containers and verify the server is working

```sh
sudo docker-compose up -d api-beta
sudo docker-compose up -d nginx
```

**Verify the server is working by going to:**

[https://test-api.open5e.com/](https://test-api.open5e.com/)
