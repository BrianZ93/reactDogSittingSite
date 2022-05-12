from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import uuid
from datetime import datetime
from flask_marshmallow import Marshmallow 
import secrets

ma = Marshmallow()
db = SQLAlchemy()

class Event(db.Model):
    event_id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String(50), nullable=False, default='')
    start_date = db.Column(db.String(200), nullable=False, default='')
    end_date = db.Column(db.String(200), nullable = False)
    user_id = db.Column(db.String(30), nullable = False)

    def __init__(self, event_id, title='', start_date='', end_date='', user_id=''):
        self.event_id = event_id
        self.title = title
        self.start_date = start_date
        self.end_date = end_date
        self.user_id = user_id


class Eventschema(ma.Schema):
    class Meta:
        fields = ['event_id', 'title', 'start_date', 'end_date', 'user_id']

Event_schema = Eventschema()
Event_schemas = Eventschema(many=True)