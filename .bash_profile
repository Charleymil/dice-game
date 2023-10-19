source ~/.terminal-config/git-prompt.sh
source ~/.terminal-config/git-completion.bash

# Define some colors for the terminal to use
blue="\[\033[0;32m\]"
gray="\[\033[38;5;246m\]"
pink="\[\033[38;5;211m\]"
reset="\[\033[0m\]"

export GIT_PS1_SHOWDIRTYSTATE=1

export PS1="$blue\u$pink\$(__git_ps1)$gray \W
$ $reset"
