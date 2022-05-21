The readme must describe the design and development of the application, and give instructions on how to launch from local host.

* The purpose of the web application, explaining the design of the game
the architecture of the web application.
* Describe how to launch the web application.
* Describe some unit tests for the web application, and how to run them.
* Include commit logs, showing contributions and review from both contributing students

^^ DELETE THIS BEFORE SUBMITTING 

# Anagram City
A daily game where users aim to create as many words of 4 letters or more as possible, using the letters once only and always including the letter in the middle of the wheel.  
Play it here: *INSERT LINK*

## Requirements
- python3
- flask
- venv
- sqlite3

## Getting Started
Create virtual environment: 

1. Create the virtual environment. (Should be pre-installed with python distros).
```python
# python3
$ python3 -m venv venv

```

2. Activate the environment.

```python
# activate environment for unix machines
$ source venv/bin/activate

# activate environment for windows
$ venv\Scripts\activate
```

3. Install requirements.
```python
pip install -r requirements.txt

# if pip doesnt work try
pip3 install -r requirements.txt
```

4. Install and Build the database 
```python
# install sqlite3 if you dont have it already
$ sudo apt-get install sqlite
```
For [windows instructions](https://www.sqlitetutorial.net/download-install-sqlite/)

```python
# build the database
$ flask db init
$ flask db migrate
$ flask db upgrade
```

5. Deactivate environment
```python
$ deactivate
```
#

## Running the app

- Activate environment from step 1
- To run the app: ```$ flask run```
- To stop the app: ```$ ^C```
- Deactivate environment from step 5

## Deployment
via localhost


## Running Tests
To conduct unit tests run the command:  `python -m test.unittest`

To conduct selenium tests, you need to have the necessary web driver installed in the test directory. Then start the webserver in TestingConfig, and run `python -m test.systemtest`

## Built With
Windows, Linux, MacOS
VScode
Python3 3.6+
Flask
Github

## Contributing
Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
1.0 - Submitted for grading..

## Authors
* Tom Nguyen
* Cameron Ke
* Amy Burnett
* Rahul Sridhar

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Built following the [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) by **Miguel Grinberg**.
- **Dr. Tim French** Unit Coordinator for CITS 3403, University of Western Australia (UWA).

