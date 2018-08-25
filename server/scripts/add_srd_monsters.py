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

file_location = root_path + ('' if root_path.endswith('/') else '/') + 'data/monsters/5e-SRD-Monsters.json'

with open(file_location) as json_data:
    monsters = json.load(json_data)
    for mob in monsters:
        m = Monster.objects.create()
        if 'name' in mob:
            m.name = mob['name']
            m.slug = slugify(m.name)
        if 'size' in mob:
            m.size = mob['size']
        if 'type' in mob:
            m.type = mob['type']
        if 'subtype' in mob:
            m.subtype = mob['subtype']
        if 'alignment' in mob:
            m.alignment = mob['alignment']
        if 'armor_class' in mob:
            m.armor_class = mob['armor_class']
        if 'hit_points' in mob:
            m.hit_points = mob['hit_points']
        if 'hit_dice' in mob:
            m.hit_dice = mob['hit_dice']
        if 'speed' in mob:
            m.speed = mob['speed']
        if 'strength' in mob:
            m.strength = mob['strength']
        if 'dexterity' in mob:
            m.dexterity = mob['dexterity']
        if 'constitution' in mob:
            m.constitution = mob['constitution']
        if 'intelligence' in mob:
            m.intelligence = mob['intelligence']
        if 'wisdom' in mob:
            m.wisdom = mob['wisdom']
        if 'charisma' in mob:
            m.charisma = mob['charisma']
        if 'constitution_save' in mob:
            m.constitution_save = mob['constitution_save']
        if 'intelligence_save' in mob:
            m.intelligence_save = mob['intelligence_save']
        if 'wisdom_save' in mob:
            m.wisdom_save = mob['wisdom_save']
        if 'perception' in mob:
            m.perception = mob['perception']
        if 'damage_vulnerabilities' in mob:
            m.damage_vulnerabilities = mob['damage_vulnerabilities']
        if 'damage_resistances' in mob:
            m.damage_resistances = mob['damage_resistances']
        if 'damage_immunities' in mob:
            m.damage_immunities = mob['damage_immunities']
        if 'condition_immunities' in mob:
            m.condition_immunities = mob['condition_immunities']
        if 'senses' in mob:
            m.senses = mob['senses']
        if 'languages' in mob:
            m.languages = mob['languages']
        if 'challenge_rating' in mob:
            m.challenge_rating = mob['challenge_rating']
        m.save()
