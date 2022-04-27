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

4. Build the database 
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

## Running the app

- Activate environment from step 1
- Deactivate envronment from step 5
- To run the app: ```$ flask run```
- To stop the app: ```$ ^C```
