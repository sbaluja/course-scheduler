import json
import sys
from operator import contains

#to display a singular course
def displayCourse(course):
    # print(course)
    print(f"Term: {course['Term']}")
    print(f"Status: {course['Status']}")
    print(f"Name: {course['Name']}")
    print(f"Location: {course['Location']}")
    print(f"Meeting: {course['Meeting']}")
    print(f"Faculty: {course['Faculty']}")
    print(f"Capacity: {course['Capacity']}")
    print(f"Credits: {course['Credits']}")
    print(f"Level: {course['Level']}")
    print("*" * 70)


#to display a list of courses (filtering)
def displayCourseList(courseList):
    for course in courseList:
        displayCourse(course)

def search(courseData, query):
    for course in courseData:
        if query in course['Name'].lower().replace("*", "") or query in course['Faculty'].lower():
            displayCourse(course)

def readFile(filename):
    file = open (filename, "r")
    courseData = json.load(file)
    return courseData

def displayFilterOpts():
    print()
    print("      Filter Options      ")
    print("-" * 26)
    print("| \tStatus\t\t |")
    print("| \tName\t\t |")
    print("| \tFaculty\t\t |")
    print("| \tCredits\t\t |")
    print("| \tLevel\t\t |")
    print("| \tBack\t\t |")
    print("| \tExit\t\t |")
    print("-" * 26)
    print()

def filterStatus(courseData, status):
    for course in courseData:
        if status == course['Status'].lower():
            displayCourse(course)

def filterFaculty(courseData, faculty):
    for course in courseData:
        if faculty in course['Faculty'].lower():
            displayCourse(course)

def filterName(courseData, name):
    for course in courseData:
        if course['Name'].lower().replace("*", "").startswith(name):
            displayCourse(course)

def filterLevel(courseData, level):
    for course in courseData:
        if level == course['Level'].lower():
            displayCourse(course)

def filterCredits(courseData, numCredits):
    for course in courseData:
        if float(numCredits) == float(course['Credits']):
            displayCourse(course)

def closeCLI():
    print("*" * 70)
    print("EXITING...")
    sys.exit()

courseData = readFile("courses.json")
userInput = ""
filterOption = ""
statusOption = ""
nameOption = ""
levelOption = ""
creditsOption = ""
facultyOption = ""

print("*" * 70)
print("Welcome to the command line interface for course searching")

while (userInput != "exit"):
    print()
    userInput = input("Select one of the options: search/filter/exit\n").lower()
    if (userInput == "search"):
        userInput = input("Enter search query:\n").lower()
        print("\n **RESULTS**\n")
        search(courseData, userInput.replace("*", ""))
    
    elif (userInput == "filter"):

        while (filterOption != "exit"):
            displayFilterOpts()
            filterOption = input("Enter a filter option: ").lower()

            if (filterOption == "status"):
                while (statusOption != "exit"):
                    statusOption = input("Enter a status option to filter by (open/closed): ").lower()
                    if (statusOption == "open" or statusOption == "closed"):
                        filterStatus(courseData, statusOption)
                        break
                    elif (statusOption == "exit"):
                        closeCLI()
                    else:
                        print("Invalid status option\n")
                        statusOption = ""

            elif (filterOption == "name"):
                while (nameOption != "exit"):
                    nameOption = input("Enter a name to filter by (e.g. ACCT*1220): ").lower().replace("*", "")
                    if (nameOption == "exit"):
                        closeCLI()
                    else:
                        filterName(courseData, nameOption)
                        break

            elif (filterOption == "faculty"):
                while (facultyOption != "exit"):
                    facultyOption = input("Enter a faculty to filter by (e.g. Lassou): ").lower()
                    if (facultyOption == "exit"):
                        closeCLI()
                    else:
                        filterFaculty(courseData, facultyOption)
                        break

            elif (filterOption == "credits"):
                while (creditsOption != "exit"):
                    creditsOption = input("Enter number of credits to filter by (e.g. 0.50): ")
                    if (creditsOption == "exit"):
                        closeCLI()
                    else:
                        try:
                            numCredits = float(creditsOption)
                            filterCredits(courseData, creditsOption)
                        except:
                            print("Invalid credits option\n")
                            creditsOption = ""
                        break

            elif (filterOption == "level"):
                while (levelOption != "exit"):
                    levelOption = input("Enter a level option (undergraduate/graduate): ").lower()
                    if (levelOption == "undergraduate" or levelOption == "graduate"):
                        filterLevel(courseData, levelOption)
                        break
                    elif (levelOption == "exit"):
                        closeCLI()
                    else:
                        print("Invalid level option\n")
                        levelOption = ""

            elif (filterOption == "back"):
                filterOption = ""
                break

            elif (filterOption == "exit"):
                closeCLI()

            else:
                print("Invalid filter option\n")
                filterOption = ""
        
    elif (userInput == "sort"):
        break

    elif (userInput == "exit"):
        closeCLI()
        
    else:
        print("Invalid Command")

