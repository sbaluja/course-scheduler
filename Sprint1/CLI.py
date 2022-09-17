import json
import sys
from operator import contains

#to display a singular course
def displayCourse(course):
    # print(course)
    if course['Status'] == "Open":
        print(f"\033[0;33;40m Term: {course['Term']}")
    else:
        print(f"\033[0;31;40m Term: {course['Term']}")
    print(f"Status: {course['Status']}")
    print(f"Name: {course['Name']}")
    print(f"Location: {course['Location']}")
    print(f"Meeting: {course['Meeting']}")
    print(f"Faculty: {course['Faculty']}")
    print(f"Capacity: {course['Capacity']}")
    print(f"Credits: {course['Credits']}")
    print(f"Level: {course['Level']}")
    print("\033[0;37;40m*" * 70)


#to display a list of courses (filtering)
def displayCourseList(filterData):
    for course in filterData:
        displayCourse(course)

def search(courseData, query):
    for course in courseData:
        if query in course['Name'].lower().replace("*", "") or query in course['Faculty'].lower():
            displayCourse(course)

def readFile(filename):
    file = open (filename, "r")
    courseData = json.load(file)
    return courseData

def displayFilterOpts(filterList):
    print()
    print("      Filter Options      ")
    print("-" * 26)
    print("| \tStatus\t\t |")
    print("| \tName\t\t |")
    print("| \tFaculty\t\t |")
    print("| \tCredits\t\t |")
    print("| \tLevel\t\t |")
    print("| \tReset\t\t |")
    print("| \tBack\t\t |")
    print("| \tExit\t\t |")
    print("-" * 26)
    print("Chosen Filters: ")
    if len(filterList) == 0:
        print("None")
        print()
    else:
        for key, value in filterList.items():
            print("{:<10} {:<10}".format(key, ', '.join(value) if (isinstance(value, list)) else value))
        print()

def addValue(dict, key, value):
    if key not in dict:
        dict[key] = value
    elif isinstance(dict[key], list):
        dict[key].append(value)
    else:
        dict[key] = [dict[key], value]

def filterStatus(filterData, status):
    newData = []
    for course in filterData:
        if status == course['Status'].lower():
            newData.append(course)
            displayCourse(course)
    return newData

def filterFaculty(filterData, faculty):
    newData = []
    for course in filterData:
        if faculty in course['Faculty'].lower():
            newData.append(course)
            displayCourse(course)
    return newData

def filterName(filterData, name):
    newData = []
    for course in filterData:
        if course['Name'].lower().replace("*", "").startswith(name):
            newData.append(course)
            displayCourse(course)
    return newData

def filterLevel(filterData, level):
    for course in filterData:
        if level == course['Level'].lower():
            displayCourse(course)

def filterCredits(filterData, numCredits):
    for course in filterData:
        if float(numCredits) == float(course['Credits']):
            displayCourse(course)

def closeCLI():
    print("*" * 70)
    print("EXITING...")
    sys.exit()

courseData = readFile("courses.json")
filterData = courseData
userInput = ""
filterOption = ""
filterList = {}
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

        filterData = courseData
        while (filterOption != "exit"):
            displayFilterOpts(filterList)
            filterOption = input("Enter a filter option: ").lower()

            if (filterOption == "status"):
                while (statusOption != "exit"):
                    statusOption = input("Enter a status option to filter by (open/closed): ").lower()
                    print()
                    if (statusOption == "open" or statusOption == "closed"):
                        filterData = filterStatus(filterData, statusOption)
                        addValue(filterList, filterOption, statusOption)
                        break
                    elif (statusOption == "exit"):
                        closeCLI()
                    else:
                        print("Invalid status option\n")
                        statusOption = ""

            elif (filterOption == "name"):
                while (nameOption != "exit"):
                    nameOption = input("Enter a name to filter by (e.g. ACCT*1220): ").lower().replace("*", "")
                    print()
                    if (nameOption == "exit"):
                        closeCLI()
                    else:
                        filterData = filterName(filterData, nameOption)
                        addValue(filterList, filterOption, nameOption)
                        break

            elif (filterOption == "faculty"):
                while (facultyOption != "exit"):
                    facultyOption = input("Enter a faculty to filter by (e.g. Lassou): ").lower()
                    print()
                    if (facultyOption == "exit"):
                        closeCLI()
                    else:
                        filterData = filterFaculty(filterData, facultyOption)
                        addValue(filterList, filterOption, facultyOption)
                        break

            elif (filterOption == "credits"):
                while (creditsOption != "exit"):
                    creditsOption = input("Enter number of credits to filter by (e.g. 0.50): ")
                    print()
                    if (creditsOption == "exit"):
                        closeCLI()
                    else:
                        try:
                            numCredits = float(creditsOption)
                            filterCredits(filterData, creditsOption)
                            addValue(filterList, filterOption, creditsOption)
                        except:
                            print("Invalid credits option\n")
                            creditsOption = ""
                        break

            elif (filterOption == "level"):
                while (levelOption != "exit"):
                    levelOption = input("Enter a level option (undergraduate/graduate): ").lower()
                    print()
                    if (levelOption == "undergraduate" or levelOption == "graduate"):
                        filterLevel(filterData, levelOption)
                        addValue(filterList, filterOption, levelOption)
                        break
                    elif (levelOption == "exit"):
                        closeCLI()
                    else:
                        print("Invalid level option\n")
                        levelOption = ""

            elif  (filterOption == "reset"):
                filterData = courseData
                filterList = {}

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

