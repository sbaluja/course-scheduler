import urllib.request
import json

from flask import Flask, Response, make_response

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


if __name__ == '__main__':
    app.run(debug = True)
