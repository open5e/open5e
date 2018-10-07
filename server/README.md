# Open5E API
The Open5e API is a project meant to share our organized and sorted data from the Dungeons and Dragon System Reference Document, a document used to create a framework for roleplaying Dungeons and Dragons.

## Getting Started

### Prerequisites
You need to have working installations of Python 3.4+ and pipenv to get working on this.

### Installation
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

## Built with

* [Python](https://www.python.org/) 3.7 - Should work fine in anything above 3.4
* [Django](https://www.djangoproject.com/) 2.0 - The web framework for perfectionists with deadlines.
* [django-rest](https://www.django-rest-framework.org/) - Very helpful API framework, makes the whole thing WAY smoother.

## Contributing
When contributing to this repository, please follow these steps:
 * Discuss the change you wish to make in either of:
    * The github issue (if there is one open for it)
    * The open5e discord server (https://discord.gg/bSsNgyv) in the #dev-corner channel. 
* With general approval, make a pull request and assign two reviewers. 
* The reviewers will merge. 

## Major Contributors

* **Cameron Blandford** [https://github.com/cameronblandford] - Initial work.
* **August Johnson** [https://github.com/augustjohnson] - Significant additions, I'm particlarly proud of the manage.py populatedb
* **Ean Moody** [https://github.com/eepMoody] - Maintainer of the open5e project.

## License
This subproject inherits the modified MIT license.  See [../LICENSE.md] for details.
