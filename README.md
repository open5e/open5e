# open5e

[![Build Status](https://travis-ci.org/eepMoody/open5e.svg?branch=master)](https://travis-ci.org/eepMoody/open5e)

An SRD and open-source material reference site for 5th edition D&amp;D

## Contributing

Open5e is a community project driven by a small number of volunteers in their spare time. We welcome any and all contributions! Please join our Discord to help out: https://discord.gg/9RNE2rY or check out the issue board if you'd like to see what's being worked on!

# Starting the Server

The Django API uses Django REST Framework for its browsability and ease of use when developing CRUD endpoints.

Before launching the site, it is necessary to start up the server and populate a local SQLite database.

starting from root `/open5e` directory:

> cd server

__ALL COMMANDS ASSUME YOU ARE IN THE open5e/server DIRECTORY, NOT THE ROOT OF THE REPOSITORY.__

Export two environment variables used by the rest of the system.

> export OPEN_5E_ROOT=`pwd` # Used for the import process

> export DJANGO_SECRET='YOUR_UNIQUE_SECRET_HERE' # Unique key for DB hashing

Then, dependencies from our Pipfile.
> pipenv install

Create the empty database.
> pipenv run python manage.py migrate

Load the database with the 5e SRD data from the data folder.
> pipenv run python manage.py populatedb ../data/WOTC_5e_SRD_v5.1/ --flush

(flush is needed only on intiial load, `--append` may be used if adding new data)

Run the webserver.
> pipenv run python manage.py runserver

The server should then be up and running on http://localhost:8000.


# Building the UI layer

Open5e uses the Nuxt framework for Vue.js, which takes care of a lot of the architectural work for the frontend layer while allowing a large amount of flexibility.
From /open5e

``` bash
cd ui
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev
```

Other build options:
```
# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
