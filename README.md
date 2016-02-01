# open5e

[![Build Status](https://travis-ci.org/eepMoody/open5e.svg?branch=master)](https://travis-ci.org/eepMoody/open5e)

An SRD and open-source material reference site for 5th edition D&amp;D

## Getting Started

After cloning the repo, first you'll need to install Sphinx. (using `python 2.7` or higher)

```shell
cd open5e/
pip install sphinx 
```
then do an initial build to generate the local files.

```shell
make html
```

## Editing the theme

If you are going to change the theme, you'll need to install npm, sass, and grunt.

```shell
gem install sass
brew install node
npm install -g grunt
```

Then cd to the template directory, install the node dependencies, and run grunt.

```shell
cd _templates/open5e_red_theme/
npm install
grunt
```

This should build the style and launch a demo page with LiveReload for you to work against. If you want to preview your results on the 5e page, you'll need to clean out /build file and rebuild Sphinx. (It doesn't recognize changes to the theme as something requiring an update in the makefile.)

```shell
cd open5e
make clean
make html
```
