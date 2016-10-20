#!/usr/bin/env python

# Object definition:
#
# id: string # lower case hyphenated (aka kebab-case)
# name: string # human readable name
# level: integer # values 0 - 9, 0 signifies cantrip
# school: string # lowercase, enum with possible values "conjuration", "evocation", "necromancy" etc.
# ritual: boolean
# casting time: string # possibly string[] for different casting times?
# concentration: boolean
# duration: string # possibly string[] for different durations?
# range: string # possibly string[] for different ranges?
# components:
#   verbal: boolean
#   somatic: boolean
#   material: false | string
# description: string[] # description split in paragraphs
# at higher levels: string[] | null # paragraphs or null, possibly use empty array instead of
# meta:
#   damageTypes: string[] | null #with possible values "fire", "psychic", "necrotic", etc.
#   classes: string[] | null #with possible values "druid", "wizard", "bard", etc.
#   rolls: object[]
#     index
#       text: string #the roll text
#       from: int #start position of string
#       to: int #end position of string
#       field: string #from properties in main section
#   ...
# links:
#   self:
#     href: string #link to location on our site

from __future__ import print_function;
from fnmatch import fnmatch;
from glob import iglob;
import json;
import os;
from pickle import Unpickler;
import re;
import sys;
from xml.dom.minidom import Node; 

# Helper functions
#

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

def getTextContent(element):
  return element.firstChild.data;

def find(pattern, string):
  return re.search(pattern, string).group(1);

def elementToString(element):
  nodeType = element.nodeType;
  if nodeType == Node.TEXT_NODE:
    return element.data;
  if nodeType == Node.ELEMENT_NODE:
    children = element.childNodes;

    return ''.join(elementToString(children.item(i)) for i in xrange(children.length));
  
  eprint('Unsupported element in toString: ', element);
  return '';

# Partial parsers
#

def parseIdAndTitles(tree, spell):
  spell['id'] = tree.getElementsByTagName('target').item(0).getAttribute('refid').replace('srd-', '');

  titles = tree.getElementsByTagName('title');
  spell['name'] = getTextContent(titles.item(0));

  subtitle = getTextContent(titles.item(1));
  spell['ritual'] = False;
  if ('cantrip' in subtitle):
    spell['level'] = 0;
    spell['school'] = find(r'^(.*) cantrip', subtitle);
  else:
    spell['level'] = int(find(r'^(\d+)', subtitle));

    if ('(ritual)' in subtitle):
      spell['ritual'] = True;
      spell['school'] = find(r'level (.*) \(ritual\)$', subtitle);
    else:
      spell['school'] = find(r'level (.*)$', subtitle);

def parseSimpleValue(paragraph, spell, key):
  spell[key] = paragraph.lastChild.data.strip();

def parseComponents(paragraph, spell):
  #  V, S, M (powdered rhubarb leaf and an adder's stomach)
  components = paragraph.lastChild.data.strip();

  spell['components'] = {
    'verbal': re.search(r'V($|, )', components) is not None,
    'somatic': re.search(r'S($|, )', components) is not None
  };

  match = re.search(r'M \((.*)\)', components);
  if (match is not None):
    spell['components']['material'] = match.group(1);
  else:
    spell['components']['material'] = re.search(r'M($|, )', components) is not None;

def parseDuration(paragraph, spell):
  duration = paragraph.lastChild.data.strip().lower();

  spell['duration'] = duration; # TODO: do we want to remove "Concentration, " here?

  spell['concentration'] = "Concentration, " in duration;

def parseDescriptionlike(paragraph, spell, key):
  str = elementToString(paragraph).strip();

  if key in spell:
    spell[key].append(str);
  else:
    spell[key] = [ str ];

# Main execution
#

spells = [];

valueParsers = {
  'Casting Time:': lambda paragraph, item: parseSimpleValue(paragraph, item, 'casting time'),
  'Range:': lambda paragraph, item: parseSimpleValue(paragraph, item, 'range'),
  'Components:': parseComponents,
  'Duration:': parseDuration 
};

for filename in iglob('build/doctrees/Spellcasting/spells_a-z/[a-z]/*.doctree'):
  if fnmatch(filename, 'build/doctrees/Spellcasting/spells_a-z/[a-z]/index.doctree'):
    continue;
  
  with open(filename, 'r') as file:
    eprint(filename);
    tmp = Unpickler(file).load();
    tree = tmp.asdom();
    spell = {};

    isDescription = True

    parseIdAndTitles(tree, spell);

    paragraphs = tree.getElementsByTagName('paragraph');
    
    for i in xrange(paragraphs.length):
      paragraph = paragraphs.item(i);

      firstChild = paragraph.firstChild;

      if firstChild.nodeType == Node.ELEMENT_NODE and firstChild.tagName == 'strong':
        key = getTextContent(firstChild).strip();

        if (key in valueParsers):
          valueParsers[key](paragraph, spell);
          continue;
        
        if key == 'At Higher Levels.':
          isDescription = False
          paragraph.removeChild(firstChild);
      
      if isDescription:
        parseDescriptionlike(paragraph, spell, 'description');
      else:
        parseDescriptionlike(paragraph, spell, 'at higher levels');

    spells.append(spell);

print(json.dumps(spells, indent = 2, sort_keys = True));