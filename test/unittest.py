'''
@author Tom Nguyen   <22914578>
@author Amy Burnett  <22689376>
@author Cameron Ke   <23074754>
@author Rahul Sridhar<23347377>
'''

import unittest
import os
from app import app, db
from app.models import User, Leaderboard, ContactUs
from config import TestingConfig

class UserModelCase(unittest.TestCase):

    def setUp(self):
        self.app = app.config.from_object(TestingConfig)
        
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

    def test_score_commited(self):
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

    def test_get_id(self):
        user1 = User.query.filter_by(username="Test1").first()
        user2 = User.query.filter_by(username="Test2").first()

        id1 = user1.get_id()
        id2 = user2.get_id()

        self.assertEqual(int(id1), 1, f"Got {id1}")
        self.assertEqual(int(id2), 2, f"Got {id2}")


    def test_get_user(self):
        user1 = User.query.filter_by(username="Test1").first()
        user2 = User.query.filter_by(username="Test2").first()
        lead1 = Leaderboard.query.filter_by(user_id=user1.user_id).first()
        lead2 = Leaderboard.query.filter_by(user_id=user2.user_id).first()

        get1 = str(lead1.get_user())
        get2 = str(lead2.get_user())

        self.assertEqual(get1, "Test1", f"Got {get1}")
        self.assertEqual(get2, "Test2", f"Got {get2}")


class ContactUsModelCase(unittest.TestCase):

    def setUp(self):
        self.mess_test1 = "Two households, both alike in dignity,\
            In fair Verona, where we lay our scene,\
            From ancient grudge break to new mutiny,\
            Where civil blood makes civil hands unclean.\
            From forth the fatal loins of these two foes"

        self.mess_test2 ="A pair of star-cross'd lovers take their life;\
            Whose misadventured piteous overthrows\
            Do with their death bury their parents' strife.\
            The fearful passage of their death-mark'd love,\
            And the continuance of their parents' rage,"

        self.mess_test3 = " Which, but their childrens end, nought could remove,\
            Is now the two hours traffic of our stage;\
            The which if you with patient ears attend,\
            What here shall miss, our toil shall strive to mend."

        self.app = app.config.from_object(TestingConfig)
        
        db.create_all()

        msg1 = ContactUs(username="Test1", email="Test1@gmail.com", phone="1234567890", msg=self.mess_test1)
        msg2 = ContactUs(username="Test2", email="Test2@gmail.com", phone="0123456789", msg=self.mess_test2)
        msg3 = ContactUs(username="Test3", email="Test3@gmail.com", phone="1122334455", msg=self.mess_test3)
        db.session.add(msg1)
        db.session.add(msg2)
        db.session.add(msg3)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_commit(self):
        msg1 = ContactUs.query.filter_by(username="Test1").first()
        msg2 = ContactUs.query.filter_by(username="Test2").first()
        msg3 = ContactUs.query.filter_by(username="Test3").first()

        self.assertEqual(msg1.username, 'Test1', msg="User does not exists in db")
        self.assertEqual(msg2.username, 'Test2', msg="User does not exists in db")
        self.assertEqual(msg3.username, 'Test3', msg="User does not exists in db")

    def test_msg(self):
        msg1 = ContactUs.query.filter_by(username="Test1").first()
        msg2 = ContactUs.query.filter_by(username="Test2").first()
        msg3 = ContactUs.query.filter_by(username="Test3").first()

        self.assertEqual(msg1.msg, self.mess_test1, msg="msg does not match")
        self.assertEqual(msg2.msg, self.mess_test2, msg="msg does not match")
        self.assertEqual(msg3.msg, self.mess_test3, msg="msg does not match")

    def test_phone(self):
        msg1 = ContactUs.query.filter_by(username="Test1").first()
        msg2 = ContactUs.query.filter_by(username="Test2").first()
        msg3 = ContactUs.query.filter_by(username="Test3").first()

        self.assertEqual(msg1.phone, "1234567890", msg="phone does not match")
        self.assertEqual(msg2.phone, "0123456789", msg="phone does not match")
        self.assertEqual(msg3.phone, "1122334455", msg="phone does not match")
        
if __name__ == "__main__":
    unittest.main(verbosity=2)

    