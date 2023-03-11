import sys, os, re

DRYRUN = False

def main(root_dir):
  bars_regex = re.compile(r'\+-+\+')
  title_regex = re.compile(r'\|\s+Title: (.*)\s+\|')

  for dirname, dirs, files in os.walk(root_dir):
    for fname in files:
      fname = os.path.join(dirname, fname)

      with open(fname, 'r+') as f:
        lines = f.readlines()

      if len(lines) < 3: continue

      title_match = title_regex.match(lines[1])
      if bars_regex.match(lines[0]) and title_match and bars_regex.match(lines[2]):
        # lines[1] = title_match.group(1)
        # lines[2] = '\n---------\n\n'
        lines.pop(0); lines.pop(0), lines.pop(0)
        
        if not DRYRUN:
          with open(fname, 'w') as f:
            f.writelines(lines)
        else:
          print "{} would have been overwritten with the following:".format(fname)
          print ''.join(lines)
          print '-'*80


if __name__ == '__main__':
  main(sys.argv[1])