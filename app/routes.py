import os
from flask import render_template, flash, redirect, url_for
from flask_login import current_user, login_user, logout_user
from app import app, word_gen, db
from app.models import User
from datetime import date
from app.forms import LoginForm, RegistrationForm
import json


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('game'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('index'))
        login_user(user, remember=form.remember_me.data)
        return redirect(url_for('game'))     
    return render_template('index.html', title='Login - Anagram-City', form=form)


@app.route('/contacts', methods=['GET', 'POST'])
def contacts():
    return render_template('contacts.html', title='Contacts Page')


@app.route('/game', methods=['GET', 'POST'])
def game():
    return render_template('game.html', title="Anagram-City", game=True)


@app.route('/stats', methods=['GET', 'POST'])
def stats():
    return render_template('stats.html', title="Leaderboards")


PUZZLE_DIR = os.getcwd()+'/app/static/dailyPuzzles/'
@app.route('/anagram', methods=['GET', 'POST'])
def dailyWord():
    current_date = date.today().strftime("%d-%m-%Y")

    test = date(2022, 4, 29).strftime("%d-%m-%Y")
    current_date = test

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

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('game'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('You are now registered')
        return redirect(url_for('index'))
    return render_template('register.html', title='Register - Anagram City', form=form)