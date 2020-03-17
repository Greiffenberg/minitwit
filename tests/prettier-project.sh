#!/usr/bin/env bash

#
# Script runs prettier:
#   h - Displays help, and exits
#   w - Write-mode: Will write files directly, but ask user for confimation if git sees modified files
#   f - Force-mode: Will write files directly and commit no matter what
# Script return codes:
#   0 - Prettier sees no files to be cleaned up
#   1 - Prettier would like to correct files
#   2 - Some other error
#

will_write=false
force=false
directory="../backend/minitwit_api/src/**/*.js"
files=0
mod_files=0

main() {
    set_modified_files_for_commit
    set_potential_files_count
    if $will_write
    then
        if ! $force
        then
            echo "no force"
            if [ $mod_files > 0 ]
            then
                echo "Git has $mod_files modified files, that will be included in this commit"
                echo "Do you wish to continue?"
                select yn in "Yes" "No"; do
                    case $yn in
                        Yes ) echo "Continuing..."; break;;
                        No ) exit 1;;
                    esac
                done
            fi
        fi
        echo "Will write prettier formats to files"
        prettier --write $directory
        echo "$files changed"
        git commit -a -m "Prettier files: $files"
    else
        
      echo "Pretier found $files files to be updated"
        if [$files > 0]
        then
            exit 1
        fi
    fi
    exit 0
}

set_potential_files_count() {
    files=$(prettier --list-different $directory)
    files=( $files )
    files=${#files[@]}
}

set_modified_files_for_commit(){
    mod_files=$(git diff --numstat | wc -l)
}

showhelp() {
  echo " Help for $0"
  echo "    -h: Shows this help text."
  echo "    -w: Write prettier format in place. but ask to continue if git has modfied files"
  echo "    -f: Force write in-place without asking, if git has modified files"
  echo ""
}

# Options
while getopts "hwf" o; do
    case "${o}" in
        h)
            showhelp
            exit 1
            ;;
        w)
            will_write=true
            ;;
        f)
            will_write=true
            force=true
            ;;
        *)
            echo "Runing default"
            ;;
    esac
done

main