import os
import json
import base64
import sqlite3
import requests
from contextlib import closing

BASE_URL = 'http://backend:3005'

USERNAME = 'simulator'
PWD = 'super_safe!'
CREDENTIALS = ':'.join([USERNAME, PWD]).encode('ascii')
ENCODED_CREDENTIALS = base64.b64encode(CREDENTIALS).decode()
HEADERS = {'Connection': 'close',
           'Content-Type': 'application/json',
           f'Authorization': f'Basic {ENCODED_CREDENTIALS}'}

def clear_test_db():
    print("\n-------------------------------------")
    url = f"{BASE_URL}/clear_db"
    response = requests.get(url, headers=HEADERS)
    print("TEST DB CLEARED / INITIALIZED")

def test_latest():
    print("\n-------------------------------------")
    # post something to update LATEST
    print("TESTING: test_latest")
    url = f"{BASE_URL}/register"
    data = {'username': 'test', 'email': 'test@test', 'pwd': 'foo'}
    params = {'latest': 1337}
    response = requests.post(url, data=json.dumps(data),
                             params=params, headers=HEADERS)
    assert response.ok
    # Will crash here, if the email is already in use

    # verify that latest was updated
    url = f'{BASE_URL}/latest'
    response = requests.get(url, headers=HEADERS)
    assert response.ok
    assert response.json()['latest'] == 1337
    print(">PASSED: test_latest")


def test_register():
    print("\n-------------------------------------")
    print("TESTING: test_register")
    username = 'a'
    email = 'a@a.a'
    pwd = 'a'
    data = {'username': username, 'email': email, 'pwd': pwd}
    params = {'latest': 1}
    response = requests.post(f'{BASE_URL}/register',
                             data=json.dumps(data), headers=HEADERS, params=params)
    assert response.ok
    # TODO: add another assertion that it is really there

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 1
    print(">PASSED: test_register")


def test_create_msg():
    print("\n-------------------------------------")
    print("TESTING: test_create_msg")
    username = 'a'
    data = {'content': 'Blub!'}
    url = f'{BASE_URL}/msgs/{username}'
    params = {'latest': 2}
    response = requests.post(url, data=json.dumps(data),
                             headers=HEADERS, params=params)
    assert response.ok

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 2
    print(">PASSED: test_create_msg")


def test_get_latest_user_msgs():
    print("\n-------------------------------------")
    print("TESTING: test_get_latest_user_msgs")
    username = 'a'

    query = {'no': 20, 'latest': 3}
    url = f'{BASE_URL}/msgs/{username}'
    response = requests.get(url, headers=HEADERS, params=query)
    assert response.status_code == 200

    got_it_earlier = False
    for msg in response.json():
        if msg['content'] == 'Blub!' and msg['user'] == username:
            got_it_earlier = True

    assert got_it_earlier

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 3
    print(">PASSED: test_get_latest_user_msgs")


def test_get_latest_msgs():
    print("\n-------------------------------------")
    print("TESTING: test_get_latest_msgs")
    username = 'a'
    query = {'no': 20, 'latest': 4}
    url = f'{BASE_URL}/msgs'
    response = requests.get(url, headers=HEADERS, params=query)
    assert response.status_code == 200

    got_it_earlier = False
    for msg in response.json():
        if msg['content'] == 'Blub!' and msg['user'] == username:
            got_it_earlier = True

    assert got_it_earlier

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 4
    print(">PASSED: test_get_latest_msgs")


def test_register_b():
    print("\n-------------------------------------")
    print("TESTING: test_register_b")
    username = 'b'
    email = 'b@b.b'
    pwd = 'b'
    data = {'username': username, 'email': email, 'pwd': pwd}
    params = {'latest': 5}
    response = requests.post(f'{BASE_URL}/register', data=json.dumps(data),
                             headers=HEADERS, params=params)
    assert response.ok
    # TODO: add another assertion that it is really there

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 5
    print(">PASSED: test_register_b")


def test_register_c():
    print("\n-------------------------------------")
    print("TESTING: test_register_c")
    username = 'c'
    email = 'c@c.c'
    pwd = 'c'
    data = {'username': username, 'email': email, 'pwd': pwd}
    params = {'latest': 6}
    response = requests.post(f'{BASE_URL}/register', data=json.dumps(data),
                             headers=HEADERS, params=params)
    assert response.ok

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 6
    print(">PASSED: test_register_c")


def test_follow_user():
    print("\n-------------------------------------")
    print("TESTING: test_follow_user")
    username = 'a'
    url = f'{BASE_URL}/fllws/{username}'
    data = {'follow': 'b'}
    params = {'latest': 7}
    response = requests.post(url, data=json.dumps(data),
                             headers=HEADERS, params=params)
    assert response.ok

    data = {'follow': 'c'}
    params = {'latest': 8}
    response = requests.post(url, data=json.dumps(data),
                             headers=HEADERS, params=params)
    assert response.ok

    query = {'no': 20, 'latest': 9}
    response = requests.get(url, headers=HEADERS, params=query)
    assert response.ok

    json_data = response.json()
    assert "b" in json_data["follows"]
    assert "c" in json_data["follows"]

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 9
    print(">PASSED: test_follow_user")


def test_a_unfollows_b():
    print("\n-------------------------------------")
    print("TESTING: test_a_unfollows_b")
    username = 'a'
    url = f'{BASE_URL}/fllws/{username}'

    #  first send unfollow command
    data = {'unfollow': 'b'}
    params = {'latest': 10}
    response = requests.post(url, data=json.dumps(data),
                             headers=HEADERS, params=params)
    assert response.ok

    # then verify that b is no longer in follows list
    query = {'no': 20, 'latest': 11}
    response = requests.get(url, params=query, headers=HEADERS)
    assert response.ok
    assert 'b' not in response.json()['follows']

    # verify that latest was updated
    response = requests.get(f'{BASE_URL}/latest', headers=HEADERS)
    assert response.json()['latest'] == 11
    print(">PASSED: test_a_unfollows_b")

# Init DB and run the tests
no_of_test = "9"
clear_test_db()

test_latest()
print("Passed tests: 1 / " + no_of_test)

test_register()
print("Passed tests: 2 / " + no_of_test)

test_create_msg()
print("Passed tests: 3 / " + no_of_test)

test_get_latest_user_msgs()
print("Passed tests: 4 / " + no_of_test)

test_get_latest_msgs()
print("Passed tests: 5 / " + no_of_test)

test_register_b()
print("Passed tests: 6 / " + no_of_test)

test_register_c()
print("Passed tests: 7 / " + no_of_test)

test_follow_user()
print("Passed tests: 8 / " + no_of_test)

test_a_unfollows_b()
print("Passed tests: 9 / " + no_of_test)
