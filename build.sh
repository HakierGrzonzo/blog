#!/usr/bin/fish
function build
    for file in (ls *.py)
        echo "Building $file!"
        python $file
            and echo "Success!"
            or echo "Failure!"
    end
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

