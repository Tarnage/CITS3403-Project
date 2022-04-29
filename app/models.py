from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
	__tablename__ = 'users'
	user_id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	email = db.Column(db.String(128), index=True, unique=True)
	password_hash = db.Column(db.String(128))

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