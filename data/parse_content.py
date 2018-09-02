import json, os, sys
import pypandoc

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
    'sections' : data_directory + 'sections/5e-SRD-Sections.json'
}


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
ChangeSpellDesc2MD()