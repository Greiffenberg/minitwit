#!/bin/bash

will_write=false

main() {
git remote add release https://github.com/DevOpsITU/minitwit.git

git stash

git checkout master
git pull

echo ""

cd tests

if $will_write
then
  ./prettier-project.sh -w
  prettier_exit_code=$?
else
  ./prettier-project.sh
  prettier_exit_code=$?
fi
./lint-project.sh
lint_exit_code=$?
cd ..

if (( $prettier_exit_code == 1 ))
then
  echo -e "\e[93mPrettier found formatting to update\e[0m"
  echo -e "\e[93mYou can run deploy.sh again with -w option to do it automagicly\e[0m"
fi

if (( $lint_exit_code != 0 ))
then
  echo -e "\e[91mLinting errors on master. Fix and try again\e[0m"
  echo -e "\e[91mGit stays on master branch\e[0m"
  exit 1
fi


# git push release master

# Switch back to previous branch and "un-stash"
git checkout @{-1}
git stash apply
}

showhelp() {
  echo "No help yet... You're on your own..."
}

# Options
while getopts "hw" o; do
    case "${o}" in
        h)
            showhelp
            exit 0
            ;;
        w)
            will_write=true
            ;;
        *)
            echo ""
            ;;
    esac
done

main