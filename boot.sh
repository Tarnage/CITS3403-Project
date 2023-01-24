#!/bin/bash
source venv/bin/activate
flask db upgrade
flask translate compile
exec gunicorn --access-logfile - --error-logfile - anagramCity:app