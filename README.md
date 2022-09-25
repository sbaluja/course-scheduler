# CIS3760-F2022 - UofG Course Search - Sprint 2

In this sprint, we were tasked with creating an Excel spreadsheet where a user can add upwards of five University of Guelph courses into five different cells. Given the courses, a VBA script is run to generate and display a course schedule for the week.

## Usage

To run the program, ensure that the 'Section Selection Results WebAdvisor University of Guelph.html' file is located in the same folder as htmlToCsv.py.

In the main directory, run the following command to generate the CSV file that contains all University of Guelph courses.

```
python htmlToCsv.py
```

A file named 'courses.csv' should be generated. Afterward, open the 'scheduler.xlsm' file in Excel. In the spreadsheet, if there is no imported 'courses' sheet containing the University of Guelph courses, import the courses.csv file into Excel. There should already be a 'Frontfacing' sheet that contains the UI for the user to interact with, add courses, and display their schedule for the week.

You are now free to add courses in the 'Course Selection' section; you can either manually input the course name, or use the dropdown menu to the right of the 'Course Selection' cells to select your courses. 

After the courses are inputted, the 'Course Info' section will display the lecture, lab, seminar, and exam times if applicable. 

The courses can now be loaded into the schedule by clicking the 'Load Schedule' button.

If there are any conflicts with the selected courses, a list of conflicts will be displayed under the 'Course Conflicts' section.

## Features

The UofG scheduler supports a multitude of features, including an option for a dropdown menu to select courses, a dynamic 'Course Info' UI, and the display of 'Course Conflicts'

## Developed By

- Eric
- Michael
- Ryan
- Tinson
- Luka
- Rithik
- Saarthi
