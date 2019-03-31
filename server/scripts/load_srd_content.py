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
    'sections' : data_directory + 'sections/5e-SRD-Sections.json',
    'magicItems': data_directory + 'items/magicItems.json'
}

def importSRDDocument():
    #### Load SRD as a Document ####
    print('Building the SRD as a document.')
    srd = Document(
        title="Systems Reference Document",
        slug=slugify("Systems Reference Document"),
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
                #print ("Spell {0} already loaded, skipping.".format(spell['name']))
                fail_count+=1
            else:
                s = Spell(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in spell:
                    s.name = spell['name']
                    s.slug = slugify(spell['name'])
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
                #print ("Monster {0} already loaded, skipping.".format(mob['name']))
                fail_count+=1
            else:
                m = Monster(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in mob:
                    m.name = mob['name']
                    m.slug = slugify(mob['name'])
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
                    m.speed = json.dumps(mob['speed_json'])
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
                if 'actions' in mob:
                    m.actions_json = json.dumps(mob['actions'])
                else:
                    m.actions_json = json.dumps("")
                if 'special_abilities' in mob:
                    m.special_abilities_json = json.dumps(mob['special_abilities'])
                else:
                    m.special_abilities_json = json.dumps("")
                if 'reactions' in mob:
                    m.reactions_json = json.dumps(mob['reactions'])
                else:
                    m.reactions_json = json.dumps("")
                if 'legendary_actions' in mob:
                    m.legendary_actions_json = json.dumps(mob['legendary_actions'])
                else:
                    m.legendary_actions_json = json.dumps("")
                m.save()
                success_count+=1

        
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
                    b = Background(document = Document.objects.get(title="Systems Reference Document"))
                    if 'name' in background:
                        b.name = background['name']
                        b.slug = slugify(background['name'])
                    if 'desc' in background:
                        b.desc = background['desc']
                    if 'skill-proficiencies' in background:
                        b.skill_proficiencies = background['skill-proficiencies']
                    if 'languages' in background:
                        b.languages = background['languages']
                    if 'equipment' in background:
                        b.equipment = background['equipment']
                    if 'feature-name' in background:
                        b.feature = background['feature-name']
                    if 'feature-desc' in background:
                        b.feature_desc = background['feature-desc']
                    if 'suggested-characteristics' in background:
                        b.suggested_characteristics = background['suggested-characteristics']
                    b.save()
                    success_count+=1
        
            print("Done loading Backgrounds.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadClasses():
    #### Load Classes ####
    print('Loading Classes from {0}'.format(json_file['classes']))
    with open(json_file['classes']) as json_data:
        charclasses = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for charclass in charclasses:
            if CharClass.objects.filter(name=charclass['name']).exists():
                #print ("Race {0} already loaded, skipping.".format(race['name']))
                fail_count+=1
            else:
                c = CharClass(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in charclass:
                    c.name = charclass['name']
                    c.slug = slugify(charclass['name'])
                if 'subtypes-name' in charclass:
                    c.subtypes_name = charclass['subtypes-name']
                if 'hit-dice' in charclass['features']:
                    c.hit_dice = charclass['features']['hit-dice']
                if 'hp-at-1st-level' in charclass['features']:
                    c.hp_at_1st_level = charclass['features']['hp-at-1st-level']
                if 'hp-at-higher-levels' in charclass['features']:
                    c.hp_at_higher_levels = charclass['features']['hp-at-higher-levels']
                if 'prof-armor' in charclass['features']:
                    c.prof_armor = charclass['features']['prof-armor']
                if 'prof-weapons' in charclass['features']:
                    c.prof_weapons = charclass['features']['prof-weapons']
                if 'prof-tools' in charclass['features']:
                    c.prof_tools = charclass['features']['prof-tools']
                if 'prof-saving-throws' in charclass['features']:
                    c.prof_saving_throws = charclass['features']['prof-saving-throws']
                if 'prof-skills' in charclass['features']:
                    c.prof_skills = charclass['features']['prof-skills']
                if 'equipment' in charclass['features']:
                    c.equipment = charclass['features']['equipment']
                if 'table' in charclass['features']:
                    c.table = charclass['features']['table']
                if 'spellcasting-ability' in charclass['features']:
                    c.spellcasting_ability = charclass['features']['spellcasting-ability']
                if 'desc' in charclass['features']:
                    c.desc = charclass['features']['desc']
                c.save()
                if 'subtypes' in charclass:
                    for archetype in charclass['subtypes']:
                        a = Archetype(document = Document.objects.get(title="Systems Reference Document"),char_class=c)
                        if 'name' in archetype:
                            a.name = archetype['name']
                            a.slug = slugify(archetype['name'])
                        if 'desc' in archetype:
                            a.desc = archetype['desc']
                        a.save()
                success_count+=1
        print("Done loading Races and Subraces.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 
         
def loadSubclasses():
    #### Load Subclasses ####
    print('Loading Subclasses from {0}'.format(json_file['classes']))

def loadConditions():
    #### Load Conditions ####
    print('Loading Conditions from {0}'.format(json_file['spells']))
    with open(json_file['conditions']) as json_data:
        conditions = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for condition in conditions:
            if Condition.objects.filter(name=condition['name']).exists():
                #print ("Condition {0} already loaded, skipping.".format(condition['name']))
                fail_count+=1
            else:
                c = Condition(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in condition:
                    c.name = condition['name']
                    c.slug = slugify(condition['name'])
                if 'desc' in condition:
                    c.desc = condition['desc']
                c.save()
                success_count+=1
        print("Done loading Conditions.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadFeats():
    #### Load Feats ####
    print('Loading Feats from {0}'.format(json_file['feats']))
    with open(json_file['feats']) as json_data:
        feats = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for feat in feats:
            if Feat.objects.filter(name=feat['name']).exists():
                #print ("Feat {0} already loaded, skipping.".format(feat['name']))
                fail_count+=1
            else:
                f = Feat(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in feat:
                    f.name = feat['name']
                    f.slug = slugify(feat['name'])
                if 'desc' in feat:
                    f.desc = feat['desc']
                if 'prerequisite' in feat:
                    f.prerequisite = feat['prerequisite']
                f.save()
                success_count+=1
        print("Done loading Feats.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadPlanes():
    #### Load Planes ####
    print('Loading Planes from {0}'.format(json_file['planes']))
    with open(json_file['planes']) as json_data:
        planes = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for plane in planes:
            if Plane.objects.filter(name=plane['name']).exists():
                #print ("Plane {0} already loaded, skipping.".format(plane['name']))
                fail_count+=1
            else:
                p = Plane(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in plane:
                    p.name = plane['name']
                    p.slug = slugify(plane['name'])
                if 'desc' in plane:
                    p.desc = plane['desc']
                p.save()
                success_count+=1
        print("Done loading Planes.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadRaces():
    #### Load Races ####
    print('Loading Races from {0}'.format(json_file['races']))
    with open(json_file['races']) as json_data:
        races = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for race in races:
            if Race.objects.filter(name=race['name']).exists():
                #print ("Race {0} already loaded, skipping.".format(race['name']))
                fail_count+=1
            else:
                r = Race(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in race:
                    r.name = race['name']
                    r.slug = slugify(race['name'])
                if 'desc' in race:
                    r.desc = race['desc']
                if 'asi-desc' in race:
                    r.asi_desc = race['asi-desc']
                if 'asi' in race:
                    r.asi = json.dumps(race['asi']) # convert the asi json object into a string for storage.
                if 'age' in race:
                    r.age = race['age']
                if 'alignment' in race:
                    r.alignment = race['alignment']
                if 'size' in race:
                    r.size = race['size']
                if 'speed'in race:
                    r.speed = json.dumps(race['speed']) # conver the speed object into a string for db storage.
                if 'speed-desc' in race:
                    r.speed_desc = race['speed-desc']
                if 'languages' in race:
                    r.languages = race['languages']
                if 'vision' in race:
                    r.vision = race['vision']
                if 'traits' in race:
                    r.traits = race['traits']
                r.save()
                if 'subtypes' in race:
                    for subrace in race['subtypes']:
                        s = Subrace(document = Document.objects.get(title="Systems Reference Document"), parent_race=r)
                        if 'name' in subrace:
                            s.name = subrace['name']
                            s.slug = slugify(subrace['name'])
                        if 'desc' in subrace:
                            s.desc = subrace['desc']
                        if 'asi-desc' in subrace:
                            s.asi_desc = subrace['asi-desc']
                        if 'asi' in subrace:
                            s.asi = json.dumps(subrace['asi'])
                        if 'traits' in subrace:
                            s.traits = subrace['traits']
                        s.save()
                success_count +=1
        
        print("Done loading Races and Subraces.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadSubraces():
    #### Load Subraces ####
    print('Loading Subraces from {0}'.format(json_file['races']))

def loadSections():
    #### Load Sections ####
    print('Loading Sections from {0}'.format(json_file['sections']))
    with open(json_file['sections']) as json_data:
        sections = json.load(json_data)
        success_count = 0
        fail_count = 0
        
        for section in sections:
            if Section.objects.filter(name=section['name']).exists():
                #print ("Section {0} already loaded, skipping.".format(section['name']))
                fail_count+=1
            else:
                s = Section(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in section:
                    s.name = section['name']
                    s.slug = slugify(section['name'])
                if 'desc' in section:
                    s.desc = section['desc']
                if 'parent' in section:
                    s.parent = section['parent']
                s.save()
                success_count+=1
        print("Done loading Sections.  Successful:{0} Failed:{1}".format(success_count,fail_count)) 

def loadMagicItems():
    print('Begin loading Magic Items from {0}'.format(json_file['magicItems']))
    with open(json_file['magicItems']) as json_data:
        magicItems = json.load(json_data)
        success_count = 0
        fail_count = 0

        for item in magicItems:
            if MagicItem.objects.filter(name=item['name']).exists():
                fail_count+=1
            else:
                i = MagicItem(document = Document.objects.get(title="Systems Reference Document"))
                if 'name' in item:
                    i.name = item['name']
                    i.slug = slugify(item['name'])
                if 'desc' in item:
                    i.desc = item['desc']
                if 'type' in item:
                    i.type = item['type']
                if 'rarity' in item:
                    i.rarity = item['rarity']
                if 'requires-attunement' in item:
                    i.requires_attunement = item['requires-attunement']
                i.save()
                success_count +=1
        print("Done loading Magic Items.  Successful:{0} Failed:{1}".format(success_count,fail_count))
    

importSRDDocument()
loadSpells()
loadMonsters()
loadBackgrounds()
loadPlanes()
loadSections()
loadFeats()
loadConditions()
loadRaces()
loadClasses()
loadMagicItems()