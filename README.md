# CIS3760-F2022 - UofG Course Search - Sprint 2

UofG Course Search is a CLI program to search for courses available during the semester at the University of Guelph.

## Usage

To run the program, ensure that the 'Section Selection Results WebAdvisor University of Guelph.html' file is located in the same folder as parser.py and CLI.py. Also ensure that the file name is the same as mentioned above.

In the Sprint1 folder, run the following command to generate the required JSON for CLI.py.

```
python parser.py
```

This will generate a file named 'courses.json'. Afterwards, run the following command to execute the course search program.

```
python CLI.py
```

## Features

UofG Course Search supports a multitude of features, including searching for and filtering available courses.

### Search:

- You may search for a course in the format of CIS*1300 or CIS1300
- You can sort results in ascending or descending order (by course section)

### Filter:

- Status - Filters courses by status (e.g. Open or Closed)
- Name - Filter courses by name (e.g. ACCT*1220 or ACCT)
- Faculty - Filter courses by faculty (e.g. Lassou)
- Credits - Filter courses by credits (e.g. 0.50)
- Level Filter courses by level (e.g. Undergraduate or Graduate)
- Reset - Remove the currently applied filters
- Back - Move back to the search / filter selection menu
- Exit - Exit the program

## Developed By

- Eric
- Michael
- Ryan
- Tinson
- Luka
- Rithik
- Saarthi



