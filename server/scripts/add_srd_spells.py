import os, sys
root_path = os.environ['OPEN_5E_ROOT']
sys.path.append(root_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'server.settings'
import django
django.setup()
from django.contrib.auth.models import User
from api.models import Spell, Monster
from slugify import slugify
import json

file_location = root_path + ('' if root_path.endswith('/') else '/') + 'data/spells/5e-SRD-Spells.json'

with open(file_location) as json_data:
    spells = json.load(json_data)
    for spell in spells:
        s = Spell.objects.create()
        if 'name' in spell:
            s.name = spell['name']
            s.slug = slugify(s.name)
        if 'desc' in spell:
            s.desc = spell['desc']
        if 'higher_level' in spell:
            s.higher_level = spell['higher_level']
        if 'page' in spell:
            s.page = spell['page']
        if 'range' in spell:
            s.range = spell['range']
        if 'components' in spell:
            s.components = spell['components']
        if 'material' in spell:
            s.material = spell['material']
        if 'ritual' in spell:
            s.ritual = spell['ritual']
        if 'duration' in spell:
            s.duration = spell['duration']
        if 'concentration' in spell:
            s.concentration = spell['concentration']
        if 'casting_time' in spell:
            s.casting_time = spell['casting_time']
        if 'level' in spell:
            s.level = spell['level']
        if 'school' in spell:
            s.school = spell['school']
        if 'class' in spell:
            s.dnd_class = spell['class']
        if 'archetype' in spell:
            s.archetype = spell['archetype']
        if 'circles' in spell:
            s.circles = spell['circles']
        s.save()
