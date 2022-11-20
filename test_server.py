""" This module is responsible for testing."""

import pytest
from client.server import app

@pytest.fixture(name='client')
def my_client():
    """Function to set up testing client."""
    with app.test_client() as client:
        yield client

def test_root(client):
    """Function to test root endpoint."""
    resp = client.get('/')
    assert b'Hello World!' in resp.data

def test_fall_course_data(client):
    """Function to test /fallCourseData endpoint."""
    resp = client.get('/fallCourseData')
    assert len(resp.get_json()) == 3036

def test_winter_course_data(client):
    """Function to test /winterCourseData endpoint."""
    resp = client.get('/winterCourseData')
    assert len(resp.get_json()) == 2792

def test_course_search(client):
    """Function to test /get-schedule endpoint."""
    headers = {
        "Access-Control-Allow-Origin" :  "*"
    }
    data = {
        "course1" : "ACCT*1220*0102 (6574) Intro Financial Accounting",
        "course2" : "MCS*2020*02 (8623) Information Management",
        "course3" : "POLS*3490*01 (9007) Conflict & Conflict Resolution",
        "course4" : "STAT*2060*02 (9284) Stats for Business Decisions",
        "course5" : "ZOO*4920*01 (9393) Lab Studies in Ornithology",
    }

    response = client.post('/get-schedule', data=data, headers=headers)
    assert len(response.get_json()) == 5
