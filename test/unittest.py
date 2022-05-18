import unittest
import os
from app import app, db
from app.models import User, Leaderboard

class UserModelCase(unittest.TestCase):

    def setUp(self):
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI']=\
            'sqlite:///'+os.path.join(basedir,'test.db')
        self.app = app.test_client()#creates a virtual test environment
        db.create_all()

        user1 = User(username="Test1", email="Test1@gmail.com")
        user2 = User(username="Test2", email="Test2@gmail.com")
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()
        user1_lead = Leaderboard(user_id=user1.user_id)
        user2_lead = Leaderboard(user_id=user2.user_id)
        db.session.add(user1_lead)
        db.session.add(user2_lead)
        db.session.commit()


    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_pass_hash(self):
        user1 = User.query.filter_by(username="Test1").first()
        user1.set_password("Test1")
        self.assertFalse(user1.check_password("False"))
        self.assertTrue(user1.check_password("Test1"))

        user2 = User.query.filter_by(username="Test2").first()
        user2.set_password("SECOND_test")
        self.assertFalse(user2.check_password("False"))
        self.assertTrue(user2.check_password("SECOND_test"))

    def test_is_commited(self):
        user1 = User.query.filter_by(username="Test1").first()
        user2 = User.query.filter_by(username="Test2").first()

        lead1 = Leaderboard.query.filter_by(user_id=user1.user_id).first()
        lead2 = Leaderboard.query.filter_by(user_id=user2.user_id).first()
        lead1.score = int(lead1.score) + 420
        lead2.score = int(lead2.score) + 12345

        db.session.add(lead1)
        db.session.add(lead2)
        db.session.commit()
        self.assertTrue( lead1.score > 0)
        self.assertTrue( lead2.score > 0)


    def test_score(self):
        user1 = User.query.filter_by(username="Test1").first()
        user2 = User.query.filter_by(username="Test2").first()
        score1 = int(user1.get_score())
        score2 = int(user2.get_score())

        self.assertTrue( (score1 - int(user1.get_score())) == 0)
        self.assertTrue( (score2 - int(user2.get_score())) == 0)

        lead1 = Leaderboard.query.filter_by(user_id=user1.user_id).first()
        lead2 = Leaderboard.query.filter_by(user_id=user2.user_id).first()

        lead1.score = int(lead1.score) + 199
        lead2.score = int(lead2.score) + 0
        
        db.session.add(lead1)
        db.session.add(lead2)
        db.session.commit()

        self.assertTrue( int(lead1.score) == score1 + 199 )
        self.assertTrue( int(lead2.score) == score1 + 0 )

if __name__ == "__main__":
    unittest.main(verbosity=2)

    