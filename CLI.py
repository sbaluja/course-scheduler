import json
import sys
from operator import contains

#to display a singular course
def displayCourse(course):
    # print(course)
    if course['Status'] == "Open":
        print(f"\033[0;33;49mTerm: {course['Term']}")
    else:
        print(f"\033[0;31;49mTerm: {course['Term']}")
    print(f"Status: {course['Status']}")
    print(f"Name: {course['Name']}")
    print(f"Location: {course['Location']}")
    print(f"Meeting: {parseMeeting(course['Meeting'])}")
    print(f"Faculty: {course['Faculty']}")
    print(f"Capacity: {course['Capacity']}")
    print(f"Credits: {course['Credits']}")
    print(f"Level: {course['Level']}")
    print("\033[0;37;49m*" * 70)


#to display a list of courses (filtering)
def displayCourseList(filterData):
    numCourses = 0
    pageView = True
    for course in filterData:
        displayCourse(course)
        numCourses += 1
        if numCourses == 5 and pageView:
            pageInput = input("Press Enter to continue or type 'Finish' to complete list... ").lower()
            if pageInput == "finish": pageView = False
            numCourses = 0

def parseMeeting(meeting):

    keywords = ["LEC", "LAB", "EXAM"]
    for key in keywords:
        if key in meeting:
            if meeting.startswith(key):
                meeting = meeting.replace(key, f"{key}: ")
            else:
                meeting = meeting.replace(key, f" | {key}: ")

    if "TBA" in meeting:
        meeting = meeting.replace("TBA", f"TBA | ")
        meeting = meeting[:-2]
        meeting = meeting.replace("|  |", "|")

    if ")R" in meeting:
        meeting = meeting.replace(")R", ") R")

    # times = ["AM", "PM"]
    # for time in times:
    #     if time in meeting and meeting[meeting.index(time)-1] != 'X':
    #         meeting = meeting.replace(time, f" {time} ", 1)

    for i in range(len(meeting)-1):
        if meeting[i].isalpha() and meeting[i+1].isdigit():
            meeting = meeting[:i+1] + ' ' + meeting[i+1:]

    return meeting

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
        if (value not in dict[key]): dict[key].append(value)
    else:
        if (value not in dict[key]): dict[key] = [dict[key], value]

def filterStatus(filterData, status):
    newData = []
    for course in filterData:
        if status == course['Status'].lower():
            newData.append(course)
    return newData

def filterFaculty(filterData, faculty):
    newData = []
    for course in filterData:
        if faculty in course['Faculty'].lower():
            newData.append(course)
    return newData

def filterName(filterData, name):
    newData = []
    for course in filterData:
        if name in course['Name'].lower().replace("*", ""):
            newData.append(course)
    return newData

def filterLevel(filterData, level):
    newData = []
    for course in filterData:
        if level == course['Level'].lower():
            newData.append(course)
    return newData

def filterCredits(filterData, numCredits):
    newData = []
    for course in filterData:
        if float(numCredits) == float(course['Credits']):
            newData.append(course)
    return newData

def closeCLI():
    print("*" * 70)
    print("EXITING...")
    sys.exit()

def sortCourses(sortData, sortOption, value):
    # Parameters -> List of courses, ascending or descending
    sorted_search = []

    if (sortOption == "descending"):
        sorted_search = sorted(sortData, key=lambda x: x[value], reverse=True)
    else:
        sorted_search = sorted(sortData, key=lambda x: x[value], reverse=False)

    return sorted_search

def sort(courseData, value):
    sortFlag = ""
    sortOption = ""

    while (sortFlag != "yes" and sortFlag != "no"):
            sortFlag = input("Do you want the data sorted? (yes/no): ").lower()
            if (sortFlag != "yes" and sortFlag != "no"):
                print("Invalid response\n")

    while (sortOption != "ascending" and sortOption != "descending" and sortFlag == "yes"):
        sortOption = input("Do you want to sort by ascending or descending order?: ").lower()
        if (sortOption == "ascending" or sortOption == "descending"):
            courseData = sortCourses(courseData, sortOption, value)
        else:
            print("Invalid sort option\n")
    
    return courseData

courseData = readFile("courses.json")
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
    # Resetting flags for sorting
    sortFlag = ""
    sortOption = ""
    courseData = readFile("courses.json")
    filterData = courseData

    print()
    userInput = input("Select one of the options (search/filter/exit): ").lower()
    
    if (userInput == "search"):
        userInput = input("Enter search query: ").lower()
        courseData = sort(courseData, "Name")
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
                    if (statusOption == "open" or statusOption == "closed"):
                        filterData = sort(filterData, "Name")
                        filterData = filterStatus(filterData, statusOption)
                        displayCourseList(filterData)
                        addValue(filterList, filterOption, statusOption)
                        break
                    elif (statusOption == "exit"):
                        closeCLI()
                    else:
                        print("Invalid status option\n")
                        statusOption = ""

            elif (filterOption == "name"):
                while (nameOption != "exit"):
                    nameOption = input("Enter a name to filter by (e.g. ACCT*1220 or ACCT): ").lower().replace("*", "")
                    if (nameOption == "exit"):
                        closeCLI()
                    else:
                        filterData = sort(filterData, "Name")
                        filterData = filterName(filterData, nameOption)
                        displayCourseList(filterData)
                        addValue(filterList, filterOption, nameOption)
                        break

            elif (filterOption == "faculty"):
                while (facultyOption != "exit"):
                    facultyOption = input("Enter a faculty to filter by (e.g. Lassou): ").lower()
                    if (facultyOption == "exit"):
                        closeCLI()
                    else:
                        filterData = sort(filterData, "Faculty")
                        filterData = filterFaculty(filterData, facultyOption)
                        displayCourseList(filterData)
                        addValue(filterList, filterOption, facultyOption)
                        break

            elif (filterOption == "credits"):
                while (creditsOption != "exit"):
                    creditsOption = input("Enter number of credits to filter by (e.g. 0.50): ")
                    if (creditsOption == "exit"):
                        closeCLI()
                    else:
                        try:
                            numCredits = float(creditsOption)
                            filterData = sort(filterData, "Name")
                            filterData = filterCredits(filterData, creditsOption)
                            displayCourseList(filterData)
                            addValue(filterList, filterOption, creditsOption)
                        except:
                            print("Invalid credits option\n")
                            creditsOption = ""
                        break

            elif (filterOption == "level"):
                while (levelOption != "exit"):
                    levelOption = input("Enter a level option (undergraduate/graduate): ").lower()
                    if (levelOption == "undergraduate" or levelOption == "graduate"):
                        filterData = sort(filterData, "Name")
                        filterData = filterLevel(filterData, levelOption)
                        displayCourseList(filterData)
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
                filterData = courseData
                filterList = {}
                break

            elif (filterOption == "exit"):
                closeCLI()

            else:
                print("Invalid filter option\n")
                filterOption = ""
        
    elif (userInput == "exit"):
        closeCLI()
        
    else:
        print("Invalid Command")