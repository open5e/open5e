# open5e is being rebuilt in Django and Vue.js!

## Check the [Beta Site](https://beta.open5e.com) and [Beta API](https://api-beta.open5e.com) to see what's up!

We have a discord going for discussing the rebuild, and I hope you'll join us! https://discord.gg/9RNE2rY 

Open5e is a community project driven by a small number of volunteers in their spare time. We welcome any and all contributions! Please join our Discord to help out: https://discord.gg/9RNE2rY or check out the issue board if you'd like to see what's being worked on!

# Starting the Server

The Django API uses Django REST Framework for its browsability and ease of use when developing CRUD endpoints.

## Server Quickstart

The server runs in a docker container. You'll need to first install docker on your system, then getting it running is extremely simple:

starting from root `/open5e` directory:

``` bash
export OPEN_5E_ROOT=`pwd` #set the /server folder as the root of the Python project
export DJANGO_SECRET='@pt#ouh)@!c+2eh(!aj_vtc=s7t$uk-l1!ry3^fcercz%si01@' # this should be a nukable test key that you're manually replacing at startup time for production
docker-compose build dev
docker-compose up dev
```

If you need to work with the db, serializers, or other django-level elements, you will need to be running the docker container then exec into it:

``` bash
bash -c "clear && docker exec -it open5e_dev_1 sh"
```

From there you can apply any typical python/django commands. Some common and useful commands include:

``` python
pipenv run python manage.py makemigrations #create a new migration for the db
pipenv run python manage.py migrate #apply any pending db migrations
pipenv run python manage.py rebuild_index #rebuild search index to reflect model or indexer changes
```

You will want to leave the server terminal running while you launch the UI in a separate termainal so you can observe requests.

If all you want to test against is the API/backend, you're done! Otherwise you'll want to open another window and...


# Build and run the UI layer

Open5e uses the Nuxt framework for Vue.js, which takes care of a lot of the architectural work for the frontend layer while allowing a large amount of flexibility.

## Build Setup

From /open5e

``` bash
# install dependencies
$ npm install # Or yarn install

# Optional: point it at a real API by setting API_URL=https:someurl.com
# serve with hot reload at localhost:3000. If you 
$ npm run dev
```

Other build options:
```
# build for production and launch server
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
