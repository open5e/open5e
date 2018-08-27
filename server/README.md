# Django API

## Tools

The Django API uses Django REST Framework for its browsability and ease of use when developing CRUD endpoints.

### pipenv

Python tooling is controlled by `pipenv`, which is a wrapper around virtualenv. It confers a lot of the functionality found in more modern package control schemes such as npm and yarn for javascript.

To run a single command, use `pipenv run`. To install a python module, use `pipenv install my_package`. To "activate" the python environment for the project indefinitely, use `pipenv shell`, which is equivalent to `workon <env>` (virtualenvwrapper) or `source /bin/activate` (virtualenv).

## Quickstart

``` python
export OPEN_5E_ROOT=`pwd` # at the root level of the cloned project
export DJANGO_SECRET='@pt#ouh)@!c+2eh(!aj_vtc=s7t$uk-l1!ry3^fcercz%si01@' # this should be a nukable test key that you're manually replacing at startup time for production

cd server
pipenv install
pipenv run python manage.py migrate
pipenv run python manage.py shell

# In IDLE shell
exec(open('scripts/load_srd_content.py').read())
quit()

# Back in /server
pipenv run python manage.py runserver
```

## To Do
 - [ ] Make md documentation better
 - [ ] Add source information for each spell and monster
 - [ ] Improve admin interface
 - [ ] Make moderator interface
 - [ ] Include more docs directly in API using docstrings
 - [ ] Add attacks, abilities, etc to monsters
 
