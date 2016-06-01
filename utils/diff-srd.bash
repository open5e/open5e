#!/bin/bash
set -euo pipefail

USAGE='Usage: <old-srd> <new-srd> [outfile]
If <outfile> is not provided, this program writes to stdout.

Requirements:
- wdiff
- pdftotext <http://www.foolabs.com/xpdf/download.html>

If you downloaded pdftotext, you might need to add it to your path:

    export PATH="$PATH:path/to/directory/containing/pdftotext"'

[ "$#" -lt 2 ] && { echo "$USAGE"; exit 2; }
[ "$#" -eq 3 ] && exec > $3;

wdiff \
  <(pdftotext -eol unix $1 - | sed 's/\r//g') \
  <(pdftotext -eol unix $2 - | sed 's/\r//g')
  
