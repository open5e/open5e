import re, urllib, sys, os


def split_spells(lines, target):
    spell_re = re.compile(r'^#{2} (.*)')
    current_dir = os.path.normpath(target) + os.sep
    current_file = None
    for line in lines:
        spell_match = spell_re.match(line)
        # print line
        if spell_match:
            spellname = spell_match.group(1)
            spelltitle = spellname
            spellfilename = re.sub('[^\w\s-]', '', spellname).strip().lower()
            spellfilename = re.sub('[-\s]+', '-', spellfilename)
            spellfilename += '.md'
            current_file = open(current_dir + urllib.quote_plus(spellfilename), 'w+')
            current_file.write(
'''-------------------------
Title: {}
-------------------------

## {}
'''.format(spelltitle, spelltitle))
        elif current_file:
            current_file.write(line)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print "Usage: python srd_utils spelllist.md target-dir"
        sys.exit(2)
    split_spells(open(sys.argv[1]), sys.argv[2])
