import re, urllib, sys

def split_monsters(lines, target):
  letter_re = re.compile(r'^Monsters \(([A-Z])\)')
  monster_re = re.compile(r'^### (.*)')

  current_dir = current_file = None
  for line in lines:
    letter_match = letter_re.match(line)
    monster_match = monster_re.match(line)
    # print line
    if letter_match:
      current_dir = target + '/' + letter_match.group(1) + '/'
    elif monster_match:
      monstername = monster_match.group(1)
      current_file = open(current_dir + urllib.quote_plus(monstername), 'w+')
      current_file.write(
'''-------------------------
Title: {}
-------------------------

'''.format(monstername))
    elif current_dir and current_file:
      current_file.write(line)

if __name__ == '__main__':
  if len(sys.argv) < 3:
    print "Usage: python srd_utils monsterlist.md target-dir"
    sys.exit(2)
  split_monsters(open(sys.argv[1]), sys.argv[2])
