FROM python:slim

RUN useradd anagramCity

WORKDIR /home/anagramCity

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app
COPY migrations migrations
COPY anagramCity.py config.py app.db boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP anagramCity.py

RUN chown -R anagramCity:anagramCity ./
USER anagramCity

ENTRYPOINT ["./boot.sh"]