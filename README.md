# Anagram City!

## Prerequisites
- python3
- flask
- venv
- sqlite3

## Getting Started
Create virtual environment: 

1. Create the virtual envionment. (Should be pre-installed with python distros).
```python
# python3
$ python3 -m venv venv

```

2. Activate the envrionment.

```python

# activate envrionment for unix machines
$ source venv/bin/activate

# activate envionment for windows
$ venv\Scripts\activate
```

3. Install requirements.
```python
pip install -r requirements.txt

# if pip doesnt work try
pip3 install -r requirements.txt
```
**DONT DO STEP 4 UNTIL WE IMPLEMENT THE DB FUNCTIONS**

4. Install and Build the database 
```python
# install sqlite3 if you dont have it already
$ sudo apt-get install sqlite
```
For [windows instructions](https://www.sqlitetutorial.net/download-install-sqlite/)

```python
# build the database
$ flask db init
```

5. Deactivate envionment
```python
$ deactivate
```
#

## Running the app

- Activate environment from step 1
- To run the app: ```$ flask run```
- To stop the app: ```$ ^C```
- Deactivate envronment from step 5


## Running Tests
TODO

## Deployment
TODO

## Built With
TODO

## Contributing
Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
TODO

## Authors

- **Tom Nguyen** -Role-
- **Cameron Ke** -Role-
- **Amy Burnett** -Role-
- **Rahul Sridhar** -Role-


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Built following the [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) by **Miguel Grinberg**.

- **Dr. Tim French** Unit Coordinator for CITS 3403, University of Western Australia (UWA).
