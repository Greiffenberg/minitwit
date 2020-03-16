#!/usr/bin/env bash

# color pallet
readonly cf="\\033[0m"
readonly red="\\033[0;31m"
readonly green="\\033[0;32m"
readonly yellow="\\033[0;33m"
readonly purple="\\033[0;35m"

will_write=false
directory="../backend/minitwit_api/src/**/*.js"
files=0

#catch getting closed and interrupted by ctrl+c
trap exit_EXIT EXIT
trap exit_CTRL QUIT SIGINT

main() {
    echo "main"
    get_modified_files_for_commit
    set_potential_files_count
    echo "Found $files files for prettier to format"
    if $will_write
    then
        echo "Will write prettier formats to files"
    
        echo "$files changed"
        # git commit -a -m "Prettier files: $files"
    else
      echo "No writing"
    fi
}

set_potential_files_count() {
    echo "Looking in $directory"
    files=$(prettier --list-different $directory)
    files=( $files )
    files=${#files[@]}
}

get_modified_files_for_commit(){
    count=$(git diff --cached --numstat | wc -l)
    echo "count: $count"
}


# The err() function redirects output to STDERR
err() { 
  local _date
  _date=$(showdate)
  echo -e "[$_date][${red}ERROR${cf}]: $1" 1>&2
}

# The err_die() function redirects the message to STDERR, 
# starts the cleanup function and then exits.
# You can call err_die() with "1" as argument to show the help before exiting.
err_die() {
  local _date
  _date=$(showdate)
  echo -e "[$_date][${red}ERROR${cf}]: $1 -> use -h parameter for help." 1>&2
  echo -e "[$_date][${red}ERROR${cf}]: Cleaning & Exiting."
  if [[ "$2" == "1" ]]; then
    showhelp
  fi
  exit 1 #or use $2 instead of 1 to work with exit arguments
}

# The following function warn, info, succ and debug are for
# output information, use warn for warnings, succ for success etc.
# You can change the colors at the top.
warn() {
  local _date
  _date=$(showdate)
  echo -e "[$_date][${yellow}WARNING${cf}]: $1"
}

info() {
  local _date
  _date=$(showdate)
  echo -e "[$_date][INFO]: $1 "
} 

succ() {
  local _date
  _date=$(showdate)
  echo -e "[$_date][${green}SUCCESS${cf}]: $1"
}

showdate() {
  local _date
  _date=$(date +%d-%H.%M)
  printf "$_date"
}

# The debug() funktion will only show up if boolean 'is_debug' is true
debug () {
  local _date
  _date=$(showdate)
  if [[ "$is_debug" == "true" ]]; then
    echo -e "[$_date][${purple}DEBUG${cf}]: $1"
  fi
}

exit_EXIT() {
  # info "Script ended! Cleanup & Exit."
  cleanup
  exit 1
}

exit_CTRL() {
  err "User pressed CTRL+C!"
  exit 1
}

cleanup() {
  info "Done!"
  # cleanup tmp files, kill process etc.
}

showhelp() {
  echo " Help for $0"
  echo "    -h: Shows this help text."
  echo "    -w: write prettier format in place."
  echo ""
}


# The err() function redirects output to STDERR
err() { 
  local _date
  _date=$(showdate)
  echo -e "[$_date][${red}ERROR${cf}]: $1" 1>&2
}

# Options
while getopts "hw" o; do
    case "${o}" in
        h)
            showhelp
            exit 1
            ;;
        w)
            will_write=true
            ;;
        *)
            echo "Runing default"
            ;;
    esac
done

main