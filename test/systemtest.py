import unittest
import os
import time
from app import app, db
from app.models import User, Leaderboard
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By

basedir = os.path.abspath(os.path.dirname(__file__))
ser = Service(os.path.join(basedir,'geckodriver'))


class SystemTest(unittest.TestCase):
    driver = None

    def setUp(self):
        self.driver = webdriver.Firefox(service=ser)

        if not self.driver:
            self.skipTest("Web Browser not available for testing")
        else:
            db.init_app(app)
            db.create_all()
            user1 = User(username="Test1", email="Test1@gmail.com")
            user2 = User(username="Test2", email="Test2@gmail.com")
            user1.set_password("Test1")
            user2.set_password("Test2")
            db.session.add(user1)
            db.session.add(user2)
            db.session.commit()
            user1_lead = Leaderboard(user_id=user1.user_id)
            user2_lead = Leaderboard(user_id=user2.user_id)
            db.session.add(user1_lead)
            db.session.add(user2_lead)
            db.session.commit()
            self.driver.maximize_window()
            self.driver.get("http://127.0.0.1:5000/")

    def tearDown(self):
        if self.driver:
            self.driver.close()
            db.session.query(User).delete()
            db.session.query(Leaderboard).delete()
            db.session.commit()
            db.session.remove()


    def test_data_added(self):
        user1 = User.query.get(1)
        self.assertEqual(user1.username, 'Test1', msg="User exists in db" )
        user2 = User.query.get(2)
        self.assertEqual(user2.username, 'Test2', msg="User exists in db" )


    def test_regiter(self):
        self.driver.get('http://localhost:5000/register')
        self.driver.implicitly_wait(5)
        uName = self.driver.find_element(By.ID, "uName")
        uName.send_keys("Test3")
        email = self.driver.find_element(By.ID, "email")
        email.send_keys("test3@gmail.com")
        pass1 = self.driver.find_element(By.ID, "pwd")
        pass1.send_keys("Test3")
        pass2 = self.driver.find_element(By.ID, "pwdtwo")
        pass2.send_keys("Test3")
        time.sleep(1)
        self.driver.implicitly_wait(5)
        submit = self.driver.find_element(By.ID, "submit")
        submit.click()

    def test_login(self):
        user1 = User.query.get(1)
        self.assertEqual(user1.username, 'Test1', msg="User exists in db" )
        self.driver.get("http://127.0.0.1:5000/")
        self.driver.implicitly_wait(5)
        uName = self.driver.find_element(By.ID, "uName")
        uName.send_keys("Test1")
        pass1 = self.driver.find_element(By.ID, "pwd")
        pass1.send_keys("Test1")
        time.sleep(1)
        self.driver.implicitly_wait(5)
        submit = self.driver.find_element(By.ID, "submit")
        submit.click()
        time.sleep(1)
        welcome = self.driver.find_element(By.ID, "welcome")
        self.assertCountEqual(welcome.get_attribute("innerHTML"), "Welcome back Test1 0")

    # TODO:
    def test_submit_score(self):
        self.driver.get("http://127.0.0.1:5000/")
        self.driver.implicitly_wait(5)
        uName = self.driver.find_element(By.ID, "uName")
        uName.send_keys("Test1")
        pass1 = self.driver.find_element(By.ID, "pwd")
        pass1.send_keys("Test1")
        time.sleep(1)
        self.driver.implicitly_wait(5)
        submit = self.driver.find_element(By.ID, "submit")
        submit.click()
        time.sleep(1)


if __name__ == "__main__":
    unittest.main(verbosity=2)