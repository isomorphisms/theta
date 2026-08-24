#!/bin/sh
set -eu

# Internet Archive / Digital Library of India item whose metadata says
# dc.rights: In Public Domain.
item='in.ernet.dli.2015.212842'
base="https://archive.org/download/$item"

mkdir -p sources/archive

curl -fL \
  "$base/2015.212842.Tables-Of.pdf" \
  -o sources/archive/jahnke-emde-tables-of-functions-1945.pdf

printf '%s\n' 'Downloaded sources/archive/jahnke-emde-tables-of-functions-1945.pdf'
printf '%s\n' 'Source metadata: https://archive.org/details/in.ernet.dli.2015.212842'
