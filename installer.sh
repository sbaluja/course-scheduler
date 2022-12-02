#####
### REFERENCE: https://askubuntu.com/questions/1103860/script-to-check-if-some-program-is-already-installed
#####

#!/bin/bash

# set up file name
input="requirements.txt"

# for each requirement in the file
while IFS= read -r line; do

    # trim trailing whitespace
    requirements="${line}"

    # check if package exists and store in variable
    dpkg -s $requirements &> /dev/null

    # read from variable, if package is not found
    if [ $? -ne 0 ]
        then
            # install flow
            echo "The package '$requirements' is not installed. Attempting to install..."

            # npm-specific install flow
            if [ $requirements == "npm" ]
                then
                    sudo apt-get install -y npm
                    npm install -g n
                    n lts
                    n latest
                    n prune
            # npm-specific packages
            elif [ $requirements == "fullcalendar" ] || [ $requirements == "jquery" ] || [ $requirements == "eslint" ]
                then
                    npm i $requirements
            #pip-specific packages
            elif [ $requirements == "pylint" ]
                then
                    pip install $requirements
            # normal install flow
            else
                sudo apt update
                sudo apt install $requirements -y
            fi

        else
            # do nothing
            echo "The package "$requirements" is already installed."
    fi

done < "$input"

export PATH=$PATH:/usr/sbin
