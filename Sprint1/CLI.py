import json
from operator import contains

#to display a singular course
def displayCourse(course):
    print(course)

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

#do user input for what kind of filtering, and then probabaly call the specific filtering functions and display the entire list w disaplYCourseList
def filterQuery(courseData):
    pass


courseData = readFile("courses.json")

print("*" * 70)
print("Welcome to the command line interface for course searching")
userInput = ""
while (userInput != "exit"):
    print()
    userInput = input("Select one of the options: search/filter/exit\n").lower()
    if (userInput == "search"):
        userInput = input("Enter search query:\n").lower()
        print("\n **RESULTS**\n")
        search(courseData, userInput.replace("*", ""))
    elif (userInput == "filter"):
        filterQuery(courseData)
    elif (userInput == "exit"):
        break
    else:
        print("Invalid Command")


print("*" * 70)
print("EXITING...")

        