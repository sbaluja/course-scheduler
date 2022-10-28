# CIS*3760 Fall 2022 - Course Scheduler

## Installation

First install git by executing the command:

```
sudo apt install git
```

Then clone the repo by executing the command:
```
git clone https://gitlab.socs.uoguelph.ca/tinson/cis3760-f2022.git
```

Before running the installer script, update PATH variable:
```
export PATH=$PATH:/usr/sbin
```

Run the installer script by navigating to the repo folder and executing the command:
```
bash installer.sh
```

Configure and start the NGINX web server by executing the command:
```
bash deploy.sh
```

You can now access the website at:
```
https://131.104.49.100/
```

## Uninstallation
Run the uninstaller script by executing the command:
```
bash uninstaller.sh
```

## Required software
- NGINX
- HTML/CSS
- JavaScript/TypeScript
- React
- jQuery
- Python
- Pip
- Flask

***

## Usage

### Starting the app
```
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building the app
```
npm run build
```

Builds the app for production to the `build` folder.\
Your app is ready to be deployed!

***

## Authors and acknowledgment
This project was built by Team 306, whose members include:
- Saarthi Baluja
- Rithik Choudhary
- Michael Lam
- Luka Vukadinovic
- Ryan Farrell
- Eric Dearing
- Tinson Wang
