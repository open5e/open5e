from api.models import *
from django.template.defaultfilters import slugify
import json

class Importer:
    
    def __init__(self):
        self.d  = []

    def returner(self, object_type, added, updated, skipped):
        message = 'Completed loading ' + object_type + '.  '
        message = message.ljust(36)
        message += 'Added:{0}'.format(added)
        message = message.ljust(48)
        message += 'Updated:{0}'.format(updated)
        message = message.ljust(60)
        message += 'Skipped:{0}'.format(skipped)
        return message


    def DocumentImporter(self, options, json_object):
        skipped,added,updated,tested = (0,0,0,0) #Count for all of the different results.
        if bool(options['flush']): Document.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            #Setting up the object.
            if Document.objects.filter(slug=slugify(o['title'])).exists():
                i = Document.objects.get(slug=slugify(o['title']))
                exists = True
            else:
                i = Document()
                new = True
            #Adding the data to the created object.
            i.title = o['title']
            i.slug = slugify(o['title'])
            i.desc = o['desc']
            i.author = o['author']
            i.license = o['license']
            i.version = o['version']
            i.url = o['url']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1
        self.d = i
        return self.returner('Document',added,updated,skipped)

    def BackgroundImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Background.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Background.objects.filter(slug=slugify(o['name'])).exists():
                i = Background.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Background(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if 'skill-proficiencies' in o:
                i.skill_proficiencies = o['skill-proficiencies']
            if 'languages' in o:
                i.languages = o['languages']
            if 'equipment' in o:
                i.equipment = o['equipment']
            if 'feature-name' in o:
                i.feature = o['feature-name']
            if 'feature-desc' in o:
                i.feature_desc = o['feature-desc']
            if 'suggested-characteristics' in o:
                i.suggested_characteristics = o['suggested-characteristics']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Backgrounds',added,updated,skipped)

    def ClassImporter(self, options, json_object):
        skipped,added,updated,tested = (0,0,0,0) #Count for all of the different results.
        if bool(options['flush']): Archetype.objects.all().delete()
        if bool(options['flush']): CharClass.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if CharClass.objects.filter(slug=slugify(o['name'])).exists():
                i = CharClass.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = CharClass(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'subtypes-name' in o:
                i.subtypes_name = o['subtypes-name']
            if 'hit-dice' in o['features']:
                i.hit_dice = o['features']['hit-dice']
            if 'hp-at-1st-level' in o['features']:
                i.hp_at_1st_level = o['features']['hp-at-1st-level']
            if 'hp-at-higher-levels' in o['features']:
                i.hp_at_higher_levels = o['features']['hp-at-higher-levels']
            if 'prof-armor' in o['features']:
                i.prof_armor = o['features']['prof-armor']
            if 'prof-weapons' in o['features']:
                i.prof_weapons = o['features']['prof-weapons']
            if 'prof-tools' in o['features']:
                i.prof_tools = o['features']['prof-tools']
            if 'prof-saving-throws' in o['features']:
                i.prof_saving_throws = o['features']['prof-saving-throws']
            if 'prof-skills' in o['features']:
                i.prof_skills = o['features']['prof-skills']
            if 'equipment' in o['features']:
                i.equipment = o['features']['equipment']
            if 'table' in o['features']:
                i.table = o['features']['table']
            if 'spellcasting-ability' in o['features']:
                i.spellcasting_ability = o['features']['spellcasting-ability']
            if 'desc' in o['features']:
                i.desc = o['features']['desc']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if 'subtypes' in o:
                    self.ArchetypeImporter(options, o['subtypes'], i)
                if new: added += 1
                else: updated += 1

        return self.returner('Classes',added,updated,skipped)

    def ArchetypeImporter(self, options, json_object, char_class):
        skipped,added,updated,tested = (0,0,0,0) #Count for all of the different results.

        for o in json_object:
            new = False
            exists = False
            if Archetype.objects.filter(slug=slugify(o['name'])).exists():
                i = Archetype.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Archetype(document = self.d, char_class=char_class)
                if 'name' in o:
                    i.name = o['name']
                    i.slug = slugify(o['name'])
                if 'desc' in o:
                    i.desc = o['desc']          
                if bool(options['testrun']) or (exists and options['append']):
                    skipped += 1
                else:
                    i.save()
                if new: added += 1
                else: updated += 1
        return self.returner('Archetypes',added,updated,skipped)

    def ConditionImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Condition.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Condition.objects.filter(slug=slugify(o['name'])).exists():
                i = Condition.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Condition(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Conditions',added,updated,skipped)

    def FeatImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Feat.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Feat.objects.filter(slug=slugify(o['name'])).exists():
                i = Feat.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Feat(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if 'prerequisite' in o:
                i.prerequisite = o['prerequisite']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Feats',added,updated,skipped)

    def MagicItemImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): MagicItem.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if MagicItem.objects.filter(slug=slugify(o['name'])).exists():
                i = MagicItem.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = MagicItem(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if 'type' in o:
                i.type = o['type']
            if 'rarity' in o:
                i.rarity = o['rarity']
            if 'requires-attunement' in o:
                i.requires_attunement = o['requires-attunement']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Magic Items',added,updated,skipped)

    def MonsterImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Monster.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Monster.objects.filter(slug=slugify(o['name'])).exists():
                i = Monster.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Monster(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'size' in o:
                i.size = o['size']
            if 'type' in o:
                i.type = o['type']
            if 'subtype' in o:
                i.subtype = o['subtype']
            if 'group' in o:
                i.group = o['group']
            if 'alignment' in o:
                i.alignment = o['alignment']
            if 'armor_class' in o:
                i.armor_class = o['armor_class']
            if 'armor_desc' in o:
                i.armor_desc = o['armor_desc']
            if 'hit_points' in o:
                i.hit_points = o['hit_points']
            if 'hit_dice' in o:
                i.hit_dice = o['hit_dice']
            if 'speed' in o:
                i.speed_json = json.dumps(o['speed_json'])
            if 'strength' in o:
                i.strength = o['strength']
            if 'dexterity' in o:
                i.dexterity = o['dexterity']
            if 'constitution' in o:
                i.constitution = o['constitution']
            if 'intelligence' in o:
                i.intelligence = o['intelligence']
            if 'wisdom' in o:
                i.wisdom = o['wisdom']
            if 'charisma' in o:
                i.charisma = o['charisma']
            if 'strength_save' in o:
                i.strength_save = o['strength_save']
            if 'dexterity_save' in o:
                i.dexterity_save = o['dexterity_save']
            if 'constitution_save' in o:
                i.constitution_save = o['constitution_save']
            if 'intelligence_save' in o:
                i.intelligence_save = o['intelligence_save']
            if 'wisdom_save' in o:
                i.wisdom_save = o['wisdom_save']
            if 'charisma_save' in o:
                i.charisma_save = o['charisma_save']
            if 'perception' in o:
                i.perception = o['perception']
            if 'damage_vulnerabilities' in o:
                i.damage_vulnerabilities = o['damage_vulnerabilities']
            if 'damage_resistances' in o:
                i.damage_resistances = o['damage_resistances']
            if 'damage_immunities' in o:
                i.damage_immunities = o['damage_immunities']
            if 'condition_immunities' in o:
                i.condition_immunities = o['condition_immunities']
            if 'senses' in o:
                i.senses = o['senses']
            if 'languages' in o:
                i.languages = o['languages']
            if 'challenge_rating' in o:
                i.challenge_rating = o['challenge_rating']
            if 'actions' in o:
                for idx, z in enumerate(o['actions']):
                    if z['attack_bonus'] == 0 and 'damage_dice' not in z:
                        del z['attack_bonus']
                    o['actions'][idx] = z
                i.actions_json = json.dumps(o['actions'])
            else:
                i.actions_json = json.dumps("")
            if 'special_abilities' in o:
                for idx, z in enumerate(o['special_abilities']):
                    if z['attack_bonus'] == 0 and 'damage_dice' not in z:
                        del z['attack_bonus']
                    o['special_abilities'][idx] = z
                i.special_abilities_json = json.dumps(o['special_abilities'])
            else:
                i.special_abilities_json = json.dumps("")
            if 'reactions' in o:
                for idx, z in enumerate(o['reactions']):
                    if z['attack_bonus'] == 0 and 'damage_dice' not in z:
                        del z['attack_bonus']
                    o['reactions'][idx] = z
                i.reactions_json = json.dumps(o['reactions'])
            else:
                i.reactions_json = json.dumps("")
            if 'legendary_actions' in o:
                for idx, z in enumerate(o['legendary_actions']):
                    if z['attack_bonus'] == 0 and 'damage_dice' not in z:
                        del z['attack_bonus']
                    o['legendary_actions'][idx] = z
                i.legendary_actions_json = json.dumps(o['legendary_actions'])
            else:
                i.legendary_actions_json = json.dumps("")
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Monsters',added,updated,skipped)

    def PlaneImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Plane.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Plane.objects.filter(slug=slugify(o['name'])).exists():
                i = Plane.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Plane(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Planes',added,updated,skipped)

    def RaceImporter(self, options, json_object):
        skipped,added,updated,tested = (0,0,0,0) #Count for all of the different results.
        if bool(options['flush']): Subrace.objects.all().delete()
        if bool(options['flush']): Race.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Race.objects.filter(slug=slugify(o['name'])).exists():
                i = Race.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Race(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if 'asi-desc' in o:
                i.asi_desc = o['asi-desc']
            if 'asi' in o:
                i.asi_json = json.dumps(o['asi']) # convert the asi json object into a string for storage.
            if 'age' in o:
                i.age = o['age']
            if 'alignment' in o:
                i.alignment = o['alignment']
            if 'size' in o:
                i.size = o['size']
            if 'speed'in o:
                i.speed_json = json.dumps(o['speed']) # conver the speed object into a string for db storage.
            if 'speed-desc' in o:
                i.speed_desc = o['speed-desc']
            if 'languages' in o:
                i.languages = o['languages']
            if 'vision' in o:
                i.vision = o['vision']
            if 'traits' in o:
                i.traits = o['traits']
                                
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if 'subtypes' in o:
                    self.SubraceImporter(options, o['subtypes'], i)
                if new: added += 1
                else: updated += 1

        return self.returner('Races',added,updated,skipped)
        
    def SubraceImporter(self, options, json_object, parent_race):
        skipped,added,updated,tested = (0,0,0,0) #Count for all of the different results.
        #if bool(options['flush']): Subrace.objects.all().delete()
        for o in json_object:
            new = False
            exists = False
            if Subrace.objects.filter(slug=slugify(o['name'])).exists():
                i = Subrace.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Subrace(document = self.d, parent_race=parent_race)
                new = True
                if 'name' in o:
                    i.name = o['name']
                    i.slug = slugify(o['name'])
                if 'desc' in o:
                    i.desc = o['desc']
                if 'asi-desc' in o:
                    i.asi_desc = o['asi-desc']
                if 'asi' in o:
                    i.asi_json = json.dumps(o['asi'])
                if 'traits' in o:
                    i.traits = o['traits']    
                if bool(options['testrun']) or (exists and options['append']):
                    skipped += 1
                else:
                    i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Subraces',added,updated,skipped)

    def SectionImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Section.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Section.objects.filter(slug=slugify(o['name'])).exists():
                i = Section.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Section(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if 'parent' in o:
                i.parent = o['parent']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Sections',added,updated,skipped)
        
    def SpellImporter(self, options, json_object):
        skipped,added,updated = (0,0,0) #Count for all of the different results.
        if bool(options['flush']): Spell.objects.all().delete()

        for o in json_object:
            new = False
            exists = False
            if Spell.objects.filter(slug=slugify(o['name'])).exists():
                i = Spell.objects.get(slug=slugify(o['name']))
                exists = True
            else:
                i = Spell(document = self.d)
                new = True
            if 'name' in o:
                i.name = o['name']
                i.slug = slugify(o['name'])
            if 'desc' in o:
                i.desc = o['desc']
            if 'higher_level' in o:
                i.higher_level = o['higher_level']
            if 'page' in o:
                i.page = o['page']
            if 'range' in o:
                i.range = o['range']
            if 'components' in o:
                i.components = o['components']
            if 'material' in o:
                i.material = o['material']
            if 'ritual' in o:
                i.ritual = o['ritual']
            if 'duration' in o:
                i.duration = o['duration']
            if 'concentration' in o:
                i.concentration = o['concentration']
            if 'casting_time' in o:
                i.casting_time = o['casting_time']
            if 'level' in o:
                i.level = o['level']
            if 'school' in o:
                i.school = o['school']
            if 'class' in o:
                i.dnd_class = o['class']
            if 'archetype' in o:
                i.archetype = o['archetype']
            if 'circles' in o:
                i.circles = o['circles']
            if bool(options['testrun']) or (exists and options['append']):
               skipped += 1
            else:
                i.save()
                if new: added += 1
                else: updated += 1

        return self.returner('Spells',added,updated,skipped)