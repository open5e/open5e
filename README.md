# open5e

[![Build Status](https://travis-ci.org/eepMoody/open5e.svg?branch=master)](https://travis-ci.org/eepMoody/open5e)

An SRD and open-source material reference site for 5th edition D&amp;D

## Contributing

Open5e is a community project driven by a small number of volunteers in their spare time. We welcome any and all contributions! If you're working on content, please take a look at our [style guide](https://github.com/eepMoody/open5e/wiki/Style-Guide).

## Editing Content
Open5e is statically generated using [Sphinx](http://www.sphinx-doc.org/en/stable/), a Python-based documentation generator. The content is written in [reStructuredText](http://docutils.sourceforge.net/rst.html). If this is your first time working with reST, take a look at the [syntax guide](http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html). Also, take a look at our [reST editor tool recommendations](https://github.com/eepMoody/open5e/wiki/reST-Tool-Recommendations).

### Installation

After cloning the repo, you'll need to install Sphinx. You'll need [Python 2.7](https://www.python.org/downloads/) or higher. We recommend you install Sphinx in a [virtual environment](https://virtualenv.readthedocs.org/en/latest/):

```shell
pip install virtualenv
virtualenv open5e_venv
source open5e_venv/bin/activate
cd open5e
pip install -r requirements.txt
```

Then you'll be able to then do an initial build to generate the local files using the Makefile in the top of the repo.

```shell
make html
```

### Making changes
Sphinx documentation pages are written using a markup language called [reStructuredText](http://docutils.sourceforge.net/docs/user/rst/quickref.html). Once you make your changes, you simply need to rebulid using `make html`, then you can preview the site in your browser at `file:///path/to/open5e/build/html/index.html`

## Editing the theme

If you are going to change the theme, you'll need [sass](http://sass-lang.com/). If you don't already have [npm](https://www.npmjs.com/package/npm) and [ruby](https://www.ruby-lang.org/en/documentation/installation/) you'll also need to install them.

Find out if you already have npm and ruby:

```shell
npm --version
ruby --version
```

If you don't get a `command not found` error, you're ready to install sass:

```shell
gem install sass
```

Then cd to the template directory, install the node dependencies, and run a build.

```shell
cd _themes/open5e_red_theme/
npm install
npm run build
```

This should build the style and launch a demo page with LiveReload for you to work against. If you want to preview your results on the 5e page, you'll need to do a clean Sphinx rebuild because the Makefile doesn't recognize changes to the theme as requiring an update:

```shell
cd open5e
make clean
make html
```
