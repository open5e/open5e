from django.db import models
import uuid
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

class Document(models.Model):
    title = models.TextField() # System Reference Document
    desc = models.TextField() 
    license = models.TextField() # Open Gaming License
    author = models.TextField() # Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.
    organization = models.TextField() # Wizards of the Coast
    version = models.TextField() # 5.1
    url = models.URLField() # http://dnd.wizards.com/articles/features/systems-reference-document-srd
    created_at = models.DateTimeField(auto_now_add=True)

class GameContent(models.Model):
    name = models.TextField() # Barbarian or Blinded
    slug = models.SlugField(unique=True, default=uuid.uuid1) # dispel-evil-and-good
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    desc = models.TextField() # A description of the Game Content Item
    document = models.ForeignKey(Document, on_delete=models.CASCADE) # Like the System Reference Document
    class Meta:
        abstract=True