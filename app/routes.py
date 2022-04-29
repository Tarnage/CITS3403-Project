from flask import render_template
from app import app
from app import word_gen

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Login - Anagram-City')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html', title='Contacts Page')

@app.route('/game')
def game():
    return render_template('game.html', title="Anagram-City", game=True)

@app.route('/stats')
def stats():
    return render_template('stats.html', title="Leaderboards")

@app.route('/anagram', methods=['GET'])
def dailyWord():
    return word_gen.main()