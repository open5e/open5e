#! /usr/bin/env node
console.log("generating static content files")

const jsonfile = require('jsonfile');
const slugify = require('slugify');
const fs = require('fs');
const mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

function cleanName(str) {
  const cleaned = slugify(str.toLowerCase(), {remove: /[*+~.()"!:@/]/g})
  return cleaned;
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    jsonfile.writeFile(path, contents, cb);
  });
}

function fileParser(input, name, listName) {
  jsonfile.readFile(input, function (err, obj) {
    if (err) console.error(err);
    writeFile(`${__dirname}/../static/json/${listName}.json`, obj, function(err){
      if (err) {
        console.log( err );
      }
      else {
        console.log( `wrote ${name} list`);
      }
    })
    console.log(`writing individual ${name} files:`);
    for (item in obj) {
      const itemJSON = obj[item];
      const itemName = cleanName(itemJSON.name)
      const filename = `${__dirname}/../static/json/${listName}/${itemName}.json`;
      writeFile(filename, itemJSON, function(err){
        if (err) {
          console.log( err );
        }
      })
    }
  })
}

function indexJson (files, listName) {
  let list = [];
  const path = `${__dirname}/../static/json/${listName}.json`
  for (file in files) {
    json = jsonfile.readFileSync(files[file])
    for (item in json) {
      const thisItem = json[item];
      const slug = slugify(thisItem.name.toLowerCase());
      list.push({name: thisItem.name, slug: slug})
    }
  }
  writeFile(path, list, function(err){
    if (err) {
      console.log( err );
    }
    else {
      console.log( `wrote ${listName}`);
    }
  })
}

function indexWithParentJson (files, listName) {
  let list = [];
  const path = `${__dirname}/../static/json/${listName}.json`
  for (file in files) {
    json = jsonfile.readFileSync(files[file])
    for (item in json) {
      const thisItem = json[item];
      const slug = slugify(thisItem.name.toLowerCase());
      list.push({name: thisItem.name, slug: slug, parent: thisItem.parent})
    }
  }
  writeFile(path, list, function(err){
    if (err) {
      console.log( err );
    }
    else {
      console.log( `wrote ${listName}`);
    }
  })
}

const monsterfile = 'data/WOTC_5e_SRD_v5.1/monsters.json';
const spellfile = 'data/WOTC_5e_SRD_v5.1/spells.json';
const classfile = 'data/WOTC_5e_SRD_v5.1/classes.json';
const itemfile = 'data/WOTC_5e_SRD_v5.1/magicitems.json';
const sectionfile = 'data/WOTC_5e_SRD_v5.1/sections.json';
const racefile = 'data/WOTC_5e_SRD_v5.1/races.json';
const planefile = 'data/WOTC_5e_SRD_v5.1/planes.json';

// make static files from database-populating json
fileParser(monsterfile, 'monster', 'monsters');
fileParser(spellfile, 'spell', 'spells');
fileParser(classfile, 'class', 'classes');
fileParser(itemfile, 'magicitem', 'magicitems');
fileParser(racefile, 'race', 'races');
fileParser(planefile, 'plane', 'planes');
fileParser(sectionfile, 'section', 'sections');


// make indexes for static files
indexJson([monsterfile], 'monster-index');
indexJson([spellfile], 'spell-index');
indexJson([classfile], 'class-index');
indexJson([itemfile], 'item-index');
indexJson([racefile], 'race-index');
indexJson([planefile], 'plane-index');
indexWithParentJson([sectionfile], 'section-index');
