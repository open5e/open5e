import os, sys
root_path = os.environ['OPEN_5E_ROOT']
sys.path.append(root_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'server.settings'
import django
django.setup()
from django.contrib.auth.models import User
from api.models import CharClass
from slugify import slugify
import json

file_location = root_path + ('' if root_path.endswith('/') else '/') + 'data/classes/5e-SRD-Classes.json'

with open(file_location) as json_data:
    charClasses = json.load(json_data)
    for cClass in charClasses:
        c = CharClass.objects.create()
        f = (cClass['features'])
        print(f['hit-dice'])
        if 'name' in cClass:
            c.name = cClass['name']
            c.slug = slugify(c.name)
        if 'hit-dice' in f:
            c.hit_dice = f['hit-dice']
        if 'hp-at-1st-level' in f:
            c.hp_at_1st_level = f['hp-at-1st-level']
        if 'hp-at-higher-levels' in f:
            c.hp_at_higher_levels = f['hp-at-higher-levels']
        if 'prof-armor' in f:
            c.prof_armor = f['prof-armor']
        if 'prof-weapons' in f:
            c.prof_weapons = f['prof-weapons']
        if 'prof-tools' in f:
            c.prof_tools = f['prof-tools']
        if 'prof-saving-throws' in f:
            c.prof_saving_throws = f['prof-saving-throws']
        if 'prof-skills' in f:
            c.prof_skills = f['prof-skills']
        if 'equipment' in f:
            c.equipment = f['equipment']
        if 'table' in f:
            c.table = f['table']
        if 'desc' in f:
            c.desc = f['desc']
        if 'spellcasting-ability' in f:
            c.spellcasting_ability = f['spellcasting-ability']
        if 'subtypes-name' in cClass:
            c.subtypes_name = cClass['subtypes-name']
        if 'archetype' in cClass:
            c.archetype = cClass['archetype']
        c.save()
