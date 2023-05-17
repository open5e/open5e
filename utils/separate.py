import re, urllib, sys, os


def split_monsters(lines, target):
    monster_re = re.compile(r'^#{3,4} (.*)')
    current_dir = os.path.normpath(target) + os.sep
    current_file = None
    for line in lines:
        monster_match = monster_re.match(line)
        # print line
        if monster_match:
            monstername = monster_match.group(1)
            monstertitle = monstername
            monsterfilename = re.sub('[^\w\s-]', '', monstername).strip().lower()
            monsterfilename = re.sub('[-\s]+', '-', monsterfilename)
            monsterfilename += '.md'
            current_file = open(current_dir + urllib.quote_plus(monsterfilename), 'w+')
            current_file.write(
'''{}
---

'''.format(monstertitle))
        elif current_file:
            current_file.write(line)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print "Usage: python seperate.py  listofitems.md target-dir"
        sys.exit(2)
    split_monsters(open(sys.argv[1]), sys.argv[2])
