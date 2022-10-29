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
            sudo apt update
            sudo apt install $requirements -y
        else
            # do nothing

	    if [ $requirements != "npm" ]
	        then
	            echo "The package "$requirements" is already installed."
	    fi
    fi

    if [ $requirements == "npm" ]
        then 
             sudo apt-get install -y npm
    fi

    if [ $requirements == "fullcalendar" ]
        then
            npm install --save @fullcalendar/core @fullcalendar/daygrid
    fi

    if [ $requirements == "fullcalendar" ]
        then
            npm install --save-dev @types/jquery
    fi

done < "$input"

export PATH=$PATH:/usr/sbin
