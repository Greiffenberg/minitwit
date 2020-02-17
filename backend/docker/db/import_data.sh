#!/bin/sh

echo ''
echo '--------------START BESKED FRA IMPORT DATA--------------'
echo ''
mongorestore --gzip /tmp/dump/
echo ''
echo '--------------SLUT BESKED FRA IMPORT DATA--------------'
echo ''