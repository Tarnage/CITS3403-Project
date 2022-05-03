from app import db
from app import login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
	__tablename__ = 'users'
	user_id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	email = db.Column(db.String(128), index=True, unique=True)
	password_hash = db.Column(db.String(128))
	
	def get_id(self):
		return (self.user_id)

	def set_password(self, password):
		self.password_hash = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.password_hash, password)

	def get_score(self):
		return Leaderboard.query.get(self.user_id)
	
	def __repr__(self):
		return f'{self.username}'


class Leaderboard(db.Model):
	__tablename__ = 'leaderboard'
	leaderboard_id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
	score = db.Column(db.Integer, index=True)

	# gets the user attached to the unique id
	def get_user(self):
		return User.query.get(user_id=self.user_id)

	def __repr__(self):
		return f'{self.score}'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))
