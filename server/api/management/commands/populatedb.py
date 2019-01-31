from django.core.management.base import BaseCommand, CommandError
from pathlib import Path
import json
from . import importer as i


class Command(BaseCommand):

    help = 'Loads all properly formatted data into the database from the given directory.'
    document = ''

    def add_arguments(self, parser):
        #Positional Arguments.
        parser.add_argument('directory', nargs='+', type=str, help='Directory that contains %model_name%.json files to be loaded.')

        # Named (optional) arguments
        parser.add_argument('--flush', action='store_true', help='Flushes all existing database data before adding new objects.',)

        parser.add_argument('--update', action='store_true', help='Updates existing database data based on slugs.')

        parser.add_argument('--append', action='store_true', help="[Default] Adds new objects if they dont already exist.")

        parser.add_argument('--testrun', action='store_true', help="Do not commit changes.")

    def handle(self, *args, **options):
        dir = options['directory']
        if options['flush']:
            self.stdout.write(self.style.WARNING('Flushing existing database.'))
        elif options['update'] and not options['append']:
            self.stdout.write(self.style.WARNING('Existing matching (by slug) objects are being updated.'))
        elif options['testrun']:
            self.stdout.write(self.style.WARNING('NO CHANGES WILL BE COMMITTED.'))
        elif options['append'] and not options['update']:
            self.stdout.write(self.style.WARNING('Inserting new items into the database. Skipping conflicts (if any).'))
        else:
            raise ValueError('Invalid options combination.')
        self.stdout.write(self.style.SUCCESS('Reading in files from {0}'.format(dir)))

        self.options = options

        for dir in options['directory']:
            importer = i.Importer()
            document_path = Path(dir+'document.json')
            if (document_path).exists():
                with open(document_path) as doc_data:
                    docs = json.load(doc_data)
                    self.stdout.write(self.style.SUCCESS(importer.DocumentImporter(options, docs)))
            
            backgrounds_path = Path(dir+'backgrounds.json')
            if (backgrounds_path).exists():
                with open(backgrounds_path) as bg_data:
                    bgs = json.load(bg_data)
                    self.stdout.write(self.style.SUCCESS(importer.BackgroundImporter(options, bgs)))

            classes_path = Path(dir+'classes.json')
            if (classes_path).exists():
                with open(classes_path) as cls_data:
                    cls = json.load(cls_data)
                    self.stdout.write(self.style.SUCCESS(importer.ClassImporter(options, cls)))

            conditions_path = Path(dir+'conditions.json')
            if (conditions_path).exists():
                with open(conditions_path) as con_data:
                    con = json.load(con_data)
                    self.stdout.write(self.style.SUCCESS(importer.ConditionImporter(options, con)))

            feats_path = Path(dir+'feats.json')
            if (feats_path).exists():
                with open(feats_path) as fea_data:
                    fea = json.load(fea_data)
                    self.stdout.write(self.style.SUCCESS(importer.FeatImporter(options, fea)))

            magicitems_path = Path(dir+'magicitems.json')
            if (magicitems_path).exists():
                with open(magicitems_path) as mag_data:
                    mag = json.load(mag_data)
                    self.stdout.write(self.style.SUCCESS(importer.MagicItemImporter(options, mag)))

            monsters_path = Path(dir+'monsters.json')
            if (monsters_path).exists():
                with open(monsters_path) as mon_data:
                    mon = json.load(mon_data)
                    self.stdout.write(self.style.SUCCESS(importer.MonsterImporter(options, mon)))

            planes_path = Path(dir+'planes.json')
            if (planes_path).exists():
                with open(planes_path) as pln_data:
                    pln = json.load(pln_data)
                    self.stdout.write(self.style.SUCCESS(importer.PlaneImporter(options, pln)))

            sections_path = Path(dir+'sections.json')
            if (sections_path).exists():
                with open(sections_path) as sec_data:
                    sec = json.load(sec_data)
                    self.stdout.write(self.style.SUCCESS(importer.SectionImporter(options, sec)))

            races_path = Path(dir+'races.json')
            if (races_path).exists():
                with open(races_path) as rac_data:
                    rac = json.load(rac_data)
                    self.stdout.write(self.style.SUCCESS(importer.RaceImporter(options, rac)))

            spells_path = Path(dir+'spells.json')
            if (spells_path).exists():
                with open(spells_path) as spl_data:
                    spl = json.load(spl_data)
                    self.stdout.write(self.style.SUCCESS(importer.SpellImporter(options, spl)))

