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

    # read from variable
    if [ $? -ne 0 ]
        then
            # install flow
            echo "The package '$requirements' is not installed. Attempting to install..."
            sudo apt-get update
            sudo apt-get install $requirements -y
        else
            # do nothing
            echo "The package "$requirements" is already installed."
    fi

done < "$input"
