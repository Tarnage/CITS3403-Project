import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'Anagram-City-B***'
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
  SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
  ENV='production'
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'Anagram-City-B***'
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')

class DevelopmentConfig(Config):
  FLASK_ENV='development'
  DEBUG=True

class TestingConfig(Config):
  ENV='testing'
  SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(basedir,'test/test.db')