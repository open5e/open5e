import docutils.nodes
import os, pickle

def alltitles():
  '''Returns all titles in all pages
  Also a decent example of how to traverse the doctree for each page
  '''
  results = []
  for path, _, fs in os.walk('.'):
      for f in fs:
        if f.endswith('.doctree'):
          d = pickle.load(open(os.path.join(path, f)))
          titles = d.traverse(lambda x: isinstance(x, docutils.nodes.title))
          if titles:
            results.extend(f + t.astext() for t in titles)
  return results