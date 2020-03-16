#!/bin/bash

git remote add release https://github.com/DevOpsITU/minitwit.git

git stash

git checkout master
git pull

cd tests
./lint-project.sh
lintexitcode=$?
cd ..

if [ $lintexitcode != 0 ]
then
  echo -e "\e[31mLinting errors on master. Fix and try again\e[0m"
  echo -e "\e[31mGit stays on master branch\e[0m"
  exit 1
fi


git push release master

Switch back to previous branch and "un-stash"
git checkout @{-1}
git stash apply