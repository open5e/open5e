#! /usr/bin/env node
console.log("generating static content files")

const jsonfile = require('jsonfile');
const slugify = require('slugify');
const fs = require('fs');
const mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

const monsterfile = '../data/monsters/5e-SRD-Monsters.json';

function cleanName(str) {
  const cleaned = slugify(str.toLowerCase(), {remove: /[*+~.()'"!:@/]/g})
  return cleaned;
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    jsonfile.writeFile(path, contents, cb);
  });
}

jsonfile.readFile(monsterfile, function (err, obj) {
  if (err) console.error(err);
  console.log("writing individual monster files:");
  writeFile(`${__dirname}/../static/json/monsters.json`, obj, function(err){
    if (err) {
      console.log( err );
    }
    else {
      console.log( `wrote monster list`);
    }
  })
  for (monster in obj) {
    const monsterJSON = obj[monster];
    const monsterName = cleanName(monsterJSON.name)
    console.log(monsterName);
    const filename = `${__dirname}/../static/json/monsters/${monsterName}.json`;
    writeFile(filename, monsterJSON, function(err){
      if (err) {
        console.log( err );
      }
    })
  }
})