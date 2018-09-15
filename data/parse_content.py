import json, os, sys
import pypandoc
import re

data_directory = ''

json_file={
    'spells':data_directory + 'spells/5e-SRD-Spells.json',
    'monsters' : data_directory + 'monsters/5e-SRD-Monsters.json',
    'backgrounds' : data_directory + 'backgrounds/5e-SRD-Backgrounds.json',
    'classes' : data_directory + 'classes/5e-SRD-Classes.json',
    'conditions' : data_directory + 'conditions/5e-SRD-Conditions.json',
    'feats' : data_directory + 'feats/5e-SRD-Feats.json',
    'planes' : data_directory + 'planes/5e-SRD-Planes.json',
    'races' : data_directory + 'races/5e-SRD-Races.json',
    'sections' : data_directory + 'sections/5e-SRD-Sections.json',
    'items_md' : data_directory + 'items/magicItems.md',
    'items_json' : data_directory + 'items/magicItems.json'
}

def parseMagicItems():
    h2re = re.compile('^#{2}([^#].*)$')
    h3re = re.compile('^#{3}([^#].*)$')
    h4re = re.compile('^#{4}([^#].*)$')
    items = []
    with open(json_file['items_md']) as content_file:
        magicItemsDoc = content_file.read()
        test = re.split(h4re,magicItemsDoc)
        magicItems = magicItemsDoc.split('#### ')
        for item in magicItems:
            i_json = {} 
            itemLines = item.splitlines()
            for idx, line in enumerate(itemLines):
                if idx==0: 
                    i_json["name"] = str(line) #first line of h3 is always the title.
                    itemLines.remove(line)

                if line.startswith("_"):
                    itemLines.remove(line) 
                    attributes = line.split(",")
                    i_json["type"] = attributes[0].split("_")[1]
                    rarity = attributes[-1].split("_")[0].strip()
                    i_json["rarity"] = rarity
                    try:
                        r_attunement = rarity[rarity.index("(") + 1:rarity.rindex(")")]
                        i_json["requires-attunement"] = r_attunement
                        i_json["rarity"] = rarity.split("("+r_attunement+")")[0]
                    except ValueError as v:
                        pass                        
                if line.startswith("### "):
                    itemLines.remove(line) 
                
                i_json["desc"] = "\n".join(itemLines).strip()

            disallowed_names = ["Conflict","Special Purpose","Senses","Alignment","Abilities",
                "Creating Sentient Magic Items","---","Communication",
                "Weapon, +1, +2 or +3","Ammunition, +1, +2, or +3","Shield, +1, +2, or +3","Armor, +1, +2, or +3","Avatar of Death"]
            if i_json['name'] not in disallowed_names:
                items.append(i_json)

    with open(json_file['items_json'], 'w') as outfile:
        json.dump(items, outfile)

def GetMonsterSpeed2Json():
    with open(json_file['monsters']) as json_data:
            monsters = json.load(json_data)

            for monster in monsters:
                speed_txt = monster['speed']

                speed_json = {}
                speed_notes = ''
                try:
                    speed_notes = speed_txt[speed_txt.index("(") + 1:speed_txt.rindex(")")]
                except ValueError as v:
                    pass
                if speed_notes == 'hover':
                        speed_json['hover'] = True
                else:
                    if speed_notes != '':
                        speed_json['notes'] = speed_notes

                s = speed_txt.split("("+speed_notes+")")
                s = s[0].split(',')
                for speed in s:
                    speed = speed.strip().replace(' ft.','')
                    j = speed.split(' ')
                    if j[0] == 'burrow':
                        speed_json['burrow'] = int(j[1])
                        pass
                    if j[0] == 'climb':
                        speed_json['climb'] = int(j[1])
                        pass
                    if j[0] == 'fly':
                        speed_json['fly'] = int(j[1])
                        pass
                    if j[0] == 'swim':
                        speed_json['swim'] = int(j[1])
                        pass
                    if j[0].isdigit():
                        speed_json['walk'] = int(j[0])
                #print(monster['name'])
                #print ("{0}".format(speed_json))

                monster['speed_json'] = speed_json
            
            with open(json_file['monsters'], 'w') as outfile:
                json.dump(monsters, outfile)


def ChangeSpellDesc2MD():
    with open(json_file['spells']) as json_data:
        spells = json.load(json_data)

        for spell in spells:
            #print(spell)
            spell['desc'] = pypandoc.convert_text(spell['desc'],'md',format='html',extra_args=['--wrap=none'])
            if 'higher_level' in spell:
                spell['higher_level'] = pypandoc.convert_text(spell['higher_level'],'md',format='html',extra_args=['--wrap=none'])
            if 'material' in spell:
                spell['material'] = pypandoc.convert_text(spell['material'],'md',format='html',extra_args=['--wrap=none'])
        
        with open(json_file['spells'], 'w') as outfile:
            json.dump(spells, outfile)

#GetMonsterSpeed2Json()
#ChangeSpellDesc2MD()
parseMagicItems()