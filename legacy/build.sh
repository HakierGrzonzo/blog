#!/usr/bin/fish
function build
    for file in (ls *.py)
        echo $file
        python $file &
    end
    wait
end


switch $argv[1]
case 'build'
    build
case 'watch'
    while inotifywait --recursive components/ posts/ *.html *.py > /dev/null 2> /dev/null
        clear
        time build 
    end
end

