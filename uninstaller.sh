#####
### REFERENCE: https://askubuntu.com/questions/1103860/script-to-check-if-some-program-is-already-installed
#####

#!/bin/bash

# set up file name
input="requirements.txt"

# for each requirement in the file
while IFS= read -r file; do

    # trim trailing whitespace
    requirements="${file%?}"

    # check if package exists and store in variable
    dpkg -s $requirement &> /dev/null

    # read from variable
    if [ $? -ne 0 ]
        then
            # do nothing
            echo "The package '$requirement' is not installed."
        else
            # uninstall flow
            echo "The package '$requirement' is installed. Attempting to install..."
            sudo apt-get remove $requirement -y
    fi

done < "$input"