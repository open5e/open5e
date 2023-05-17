#!/bin/bash
set -euo pipefail

USAGE='Usage: <old-srd> <new-srd>
       <old-srd> <new-srd> <old-srd-first-page> <old-srd-last-page> <new-srd-first-page> <new-srd-last-page>

Writes a wdiff-style diff of the text of "old-srd" and "new-srd" to STDOUT.
If you want to write the diff to a file instead, add "> my-outfile.diff" to
the end of this command.

If first and last pages are provieded for both SRDs, only the specified
page ranges will be diffed.

Requirements:
- wdiff
- pdftotext <http://www.foolabs.com/xpdf/download.html>

If you downloaded pdftotext, you might need to add it to your path:

    export PATH="$PATH:path/to/directory/containing/pdftotext"'

{ [ "$#" -lt 2 ] || [ "$#" -gt 6 ] || { [ "$#" -ge 3 ] && [ "$#" -lt 6 ]; }; } && { echo "$USAGE"; exit 2; }
[ "$#" -eq 6 ] && { oldfirstpage="-f $3"; oldlastpage="-l $4"; newfirstpage="-f $5"; newlastpage="-l $6"; }

wdiff \
  <(pdftotext -eol unix $oldfirstpage $oldlastpage $1 - | sed 's/\r//g') \
  <(pdftotext -eol unix $newfirstpage $newlastpage $2 - | sed 's/\r//g')
  
