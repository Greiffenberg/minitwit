#!/bin/sh

git stash

git checkout master
git pull


git push release master