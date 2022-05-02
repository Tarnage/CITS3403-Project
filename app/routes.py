import os
from flask import render_template, flash, redirect
from app import app
from app import word_gen
from datetime import date
from app.forms import LoginForm
import json


@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect('/game')
    return render_template('index.html', title='Login - Anagram-City', form=form)


@app.route('/contacts')
def contacts():
    return render_template('contacts.html', title='Contacts Page')


@app.route('/game')
def game():
    return render_template('game.html', title="Anagram-City", game=True)


@app.route('/stats')
def stats():
    return render_template('stats.html', title="Leaderboards")


PUZZLE_DIR = os.getcwd()+'/app/static/dailyPuzzles/'
@app.route('/anagram', methods=['GET'])
def dailyWord():
    current_date = date.today().strftime("%d-%m-%Y")

    try:
        f = open(PUZZLE_DIR + current_date + '.json')
    except FileNotFoundError as err:
        # if file doesnt exist its a new day so we create a new puzzle
        #print ("New day new puzzle")
        word_gen.main(current_date)
    finally:
        f = open(PUZZLE_DIR + current_date + '.json')
        data = json.load(f)
        return data
