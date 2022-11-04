import urllib.request
import json

from flask import Flask, Response, make_response, request
from re import search, match

app = Flask(__name__, static_url_path='', static_folder='src')

@app.route('/')
def root():
    return Response("<p>Hello World!</p>", status=201)


@app.route('/testButton')
def testBtn():
	resp = make_response(urllib.request.urlopen("https://jsonplaceholder.typicode.com/todos/1").read())
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.status_code = 200
	return resp


@app.route('/courseData')
def courseData():
	file = open("courses.json", "r")
	resp = make_response(json.load(file))
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.status_code = 200
	return resp

# given keyword, returns factoid
@app.route('/get-schedule', methods=['GET'])
def courseSearch():
    file = open("courses.json", "r")
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
            if (selected_courses[i] == one_course["name"]):
                returned_courses['course'+str(i+1)] = one_course
                break

    resp = make_response(returned_courses)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.status_code = 200
    return resp

if __name__ == '__main__':
    app.run(debug = True)
