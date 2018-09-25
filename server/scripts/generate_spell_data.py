import re
import json

allSpells = open('../../srd-source/full lists/markdown/spellist.md', 'r', encoding="utf8").read().split('\n## ')
allSpells.pop(0)
namePattern = "(?P<name>.*?)"
levelPattern = "((?P<level>[0-9])[a-z]{2}-level)?"
schoolPattern = "(?P<school>[a-zA-Z]*)"
ritualPattern = "(?P<is_ritual>\(ritual\))?"
cantripPattern = "(?P<is_cantrip>cantrip)?"
miningPattern = re.compile((
    r"^" + namePattern + "\n*"
    r"#### *?" + levelPattern + " *" + schoolPattern + " *" + ritualPattern + " *" + cantripPattern + "\n*"
    r"\*\*Casting Time:\*\* (?P<casting_time>.*?)\n*"
    r"\*\*Range:\*\* (?P<cast_range>.*?)\n*"
    r"\*\*Components:\*\* (?P<components>.*?)\n*"
    r"\*\*Duration:\*\* (?P<duration>[^\n]+) *\n*"
    r"(?P<description>.*)"
), re.DOTALL)

spellData = []
for oneSpell in allSpells:
    match = miningPattern.match(oneSpell)
    dataDictionary = match.groupdict()
    for key in dataDictionary.keys():
        dataDictionary[key] = str(dataDictionary[key]).strip()
        if key == 'is_ritual':
            if dataDictionary[key] == '(ritual)':
                dataDictionary[key] = True
            else:
                dataDictionary[key] = False
        if key == 'is_cantrip':
            if dataDictionary[key] == 'cantrip':
                dataDictionary[key] = True
            else:
                dataDictionary[key] = False
    spellData.append(dataDictionary)

dataFile = open('spells.json', 'w')
dataFile.write(json.dumps(spellData))
dataFile.close()
