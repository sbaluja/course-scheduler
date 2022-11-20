""" This module is responsible for defining the server endpoints."""

import urllib.request
import json
from flask import Flask, Response, make_response, request


app = Flask(__name__, static_url_path='', static_folder='src')

@app.route('/')
def root():
    """A sample endpoint used for testing. Displays 'Hello World!' and nothing else."""
    return Response("<p>Hello World!</p>", status=201)


@app.route('/testButton')
def test_btn():
    """A sample endpoint used for testing. Clicking the button prompts a response."""

    with urllib.request.urlopen("https://jsonplaceholder.typicode.com/todos/1").read() as response:
        resp = make_response(response)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.status_code = 200
        return resp


@app.route('/fallCourseData')
def fall_course_data():
    """This endpoint displays all the courses for the Fall term. \
        Each course is displayed in its own card, separately. Pagination supported."""

    with open("courses.json", "r", encoding='UTF-8') as file:
        resp = make_response(json.load(file))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.status_code = 200
        return resp

@app.route('/winterCourseData')
def winter_course_data():
    """This endpoint displays all the courses for the Winter term. \
        Each course is displayed in its own card, separately. Pagination supported."""

    with open("winterCourses.json", "r", encoding='UTF-8') as file:
        resp = make_response(json.load(file))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.status_code = 200
        return resp


# given keyword, returns factoid
@app.route('/get-schedule', methods=['POST'])
def course_search():

    # pylint: disable=consider-using-enumerate

    """This endpoint fetches the user-selected courses from all the possible course options \
        into an array and returns it to the client."""

    with open("courses.json", "r", encoding='UTF-8') as file:
        file_obj = json.load(file)
        data = request.form
        selected_courses = []
        selected_courses.append(data.get('course1'))
        selected_courses.append(data.get('course2'))
        selected_courses.append(data.get('course3'))
        selected_courses.append(data.get('course4'))
        selected_courses.append(data.get('course5'))

        returned_courses = {}
        for i in range(0, len(selected_courses)):
            for one_course in file_obj:
                if selected_courses[i] == one_course["name"]:
                    returned_courses['course'+str(i+1)] = one_course
                    break

        # print(selected_courses)
        resp = make_response(returned_courses)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.status_code = 200
        print(returned_courses)
        return resp

if __name__ == '__main__':
    app.run(debug = True)
