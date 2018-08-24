import os, sys
root_path = os.environ['OPEN_5E_ROOT']
sys.path.append(root_path)
import django
from django.template.defaultfilters import slugify
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()
from api.models import *
import json

data_directory = root_path + ('' if root_path.endswith('/') else '/') + '../data/'

#Speccing out the location of each of the json files with the root data.
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

def importSRDDocument():
    #### Load SRD as a Document ####
    print('Building the SRD as a document.')
    srd = Document(
        title="Systems Reference Document",
        desc = "Dungeons and Dragons 5th Edition Systems Reference Document by Wizards of the Coast",
        license = "Open Gaming License",
        author ="Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.",
        organization = "Wizards of the Coast",
        version = "5.1",
        url="http://dnd.wizards.com/articles/features/systems-reference-document-srd"
        )
    #Check to see if the SRD exists.
    if Document.objects.filter(title="Systems Reference Document").exists():
        print ("SRD Document already exists. Not applying changes.")
    else: 
        print ("Saving SRD document.")
        srd.save()

def loadSpells():
    #### Load Spells ####
    print('Begin loading Spells from {0}'.format(json_file['spells']))
    with open(json_file['spells']) as json_data:
        spells = json.load(json_data)
        success_count = 0
        fail_count = 0

        for spell in spells:
            if Spell.objects.filter(name=spell['name']).exists():
                print ("Spell {0} already loaded, skipping.".format(spell['name']))
                fail_count+=1
            else:
                s = Spell.objects.create()
                if 'name' in spell:
                    s.name = spell['name']
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
                success_count+=1
        print("Done loading spells.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadMonsters():
    #### Load Monsters ####
    print('Loading Monsters from {0}'.format(json_file['monsters']))
    with open(json_file['monsters']) as json_data:
        monsters = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for mob in monsters:
            if Monster.objects.filter(name=mob['name']).exists():
                print ("Monster {0} already loaded, skipping.".format(mob['name']))
                fail_count+=1
            else:
                m = Monster.objects.create()
                if 'name' in mob:
                    m.name = mob['name']
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
                successcount+=1
        
        print("Done loading Monsters.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadBackgrounds():
    #### Load Backgrounds ####
    print('Loading Backgrounds from {0}'.format(json_file['backgrounds']))
    with open(json_file['backgrounds']) as json_data:
            backgrounds = json.load(json_data)
            success_count = 0
            fail_count = 0
            
            for background in backgrounds:
                if Background.objects.filter(name=background['name']).exists():
                    print ("Background {0} already loaded, skipping.".format(background['name']))
                    fail_count+=1
                else:
                    b = Background.objects.create(document = Document.objects.get(title="Systems Reference Document"))
                    if 'name' in background:
                        b.name = background['name']
                        b.slug = slugify(b.name)
                    if 'desc' in background:
                        b.desc = background['desc']
                    if 'skill-proficiencies' in background:
                        b.skill_proficiencies = background['skill-proficiencies']
                    if 'languages' in background:
                        b.languages = background['languages']
                    if 'equipment' in background:
                        b.equipment = background['equipment']
                    if 'feature' in background:
                        b.feature = background['feature']
                    if 'suggested-characteristics' in background:
                        b.suggested_characteristics = background['suggested-characteristics']
                    b.save()
                    success_count+=1
        
            print("Done loading Backgrounds.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 


def loadClasses():
    #### Load Classes ####
    print('Loading Classes from {0}'.format(json_file['classes']))

def loadSubclasses():
    #### Load Subclasses ####
    print('Loading Subclasses from {0}'.format(json_file['classes']))

def loadConditions():
    #### Load Conditions ####
    print('Loading Conditions from {0}'.format(json_file['spells']))

def loadFeats():
    #### Load Feats ####
    print('Loading Feats from {0}'.format(json_file['feats']))

def loadPlanes():
    #### Load Planes ####
    print('Loading Planes from {0}'.format(json_file['planes']))

def loadRaces():
    #### Load Races ####
    print('Loading Races from {0}'.format(json_file['races']))

def loadSubraces():
    #### Load Subraces ####
    print('Loading Subraces from {0}'.format(json_file['races']))

def loadSections():
    #### Load Sections ####
    print('Loading Sections from {0}'.format(json_file['sections']))


importSRDDocument()
loadSpells()
loadMonsters()
loadBackgrounds()