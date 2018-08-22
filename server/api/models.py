from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.

class Monster(models.Model):
    name = models.TextField()
    size = models.TextField()
    type = models.TextField()
    subtype = models.TextField()
    alignment = models.TextField()
    armor_class = models.IntegerField(default=12)
    hit_points = models.IntegerField(null=True)
    hit_dice = models.TextField()
    speed = models.TextField()
    strength = models.IntegerField(null=True)
    dexterity = models.IntegerField(null=True)
    constitution = models.IntegerField(null=True)
    intelligence = models.IntegerField(null=True)
    wisdom = models.IntegerField(null=True)
    charisma = models.IntegerField(null=True)
    constitution_save = models.IntegerField(null=True)
    intelligence_save = models.IntegerField(null=True)
    wisdom_save = models.IntegerField(null=True)
    perception = models.IntegerField(null=True)
    damage_vulnerabilities = models.TextField()
    damage_resistances = models.TextField()
    damage_immunities = models.TextField()
    condition_immunities = models.TextField()
    senses = models.TextField()
    languages = models.TextField()
    challenge_rating = models.TextField()
    # special_abilities
    # actions
    # legendary_actions

class Spell(models.Model):
    name = models.TextField()
    desc = models.TextField()
    higher_level = models.TextField()
    page = models.TextField()
    range = models.TextField()
    components = models.TextField()
    material = models.TextField()
    ritual = models.TextField()
    duration = models.TextField()
    concentration = models.TextField()
    casting_time = models.TextField()
    level = models.TextField()
    school = models.TextField()
    dnd_class = models.TextField()
    archetype = models.TextField()
    circles = models.TextField()

class Archetype(models.Model):
    name = models.TextField()
    desc = models.TextField()

class CharClass(models.Model):
    hit_dice = models.TextField()
    hp_at_1st_level = models.TextField()
    hp_at_higher_levels = models.TextField()
    prof_armor = models.TextField()
    prof_weapons = models.TextField()
    prof_tools = models.TextField()
    prof_saving_throws = models.TextField()
    prof_skills = models.TextField()
    equipment = models.TextField()
    table = models.TextField()
    desc = models.TextField()
    spellcasting_ability = models.TextField()
    subtypes_name = models.TextField()
    archetype = models.ForeignKey(Archetype, on_delete=models.CASCADE)

class SubRace(models.Model):
    name = models.TextField()
    desc = models.TextField()
    asi_desc = models.TextField()
    asi = JSONField()
    traits = models.TextField()

class Race(models.Model):
    name = models.TextField()
    desc = models.TextField()
    asi_desc = models.TextField()
    asi = JSONField()
    age = models.TextField()
    alignment = models.TextField()
    size = models.TextField()
    speed_walk = models.IntegerField()
    speed_desc = models.TextField()
    languages = models.TextField()
    vision = models.TextField()
    traits = models.TextField()
    subtypes  = models.TextField()
    sub_race = models.ForeignKey(SubRace, on_delete=models.CASCADE)

class Planes(models.Model):
    name = models.TextField()
    desc = models.TextField()

class Sections(models.Model):
    name = models.TextField()
    desc = models.TextField()
    parent = models.TextField()

class Feats(models.Model):
    name = models.TextField()
    prerequisite = models.TextField()
    desc = models.TextField()

class Conditions(models.Model):
    name = models.TextField
    desc = models.TextField

class GameContentDocument(models.Model):
    name = models.TextField() # System Reference Document
    desc = models.TextField() 
    license = models.TextField() # Open Gaming License
    author = models.TextField() # Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.
    organization = models.TextField() # Wizards of the Coast
    version = models.TextField() # 5.1
    url = models.URLField() # http://dnd.wizards.com/articles/features/systems-reference-document-srd


    