#!/bin/sh

# git remote add release https://github.com/DevOpsITU/minitwit.git

git stash

git checkout master
git pull


git push release master