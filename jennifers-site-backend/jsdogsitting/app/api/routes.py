from flask import Blueprint, request, jsonify
from models import db, Event, Event_schema, Event_schemas
from flask_cors import cross_origin

api = Blueprint('api',__name__, url_prefix='/api')

@api.route('/events', methods = ['POST'])
@cross_origin(origin="*")
def create_event():
    event_id = request.json['event_id']
    title = request.json['title']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    user_id = request.json['user_id']

    event = Event(event_id, title, start_date, end_date, user_id)

    db.session.add(event)
    db.session.commit()

    response = Event_schema.dump(event)
    return jsonify(response)

@api.route('/events', methods = ['GET'])
@cross_origin(origin="*")
def get_event():
    events = Event.query.all()
    response = Event_schemas.dump(events)
    return jsonify(response)

@api.route('/userevents/<user_id>', methods = ['GET'])
@cross_origin(origin="*")
def get_event_two(user_id):
    events = Event.query.filter_by(user_id = user_id).all()
    response = Event_schemas.dump(events)
    return jsonify(response)

@api.route('/events/<event_id>', methods = ['GET'])
@cross_origin(origin="*")
def get_event_three(event_id):
    event = Event.query.get(event_id)
    response = Event_schema.dump(event)
    return jsonify(response)

@api.route('/events/<event_id>', methods = ['DELETE'])
@cross_origin(origin="*")
def delete_event(event_id):
    event = Event.query.get(event_id)
    db.session.delete(event)
    db.session.commit()
    response = Event_schema.dump(event)
    return jsonify(response)



# SEQUEL EXAMPLE
# INSERT INTO events ("event_id", "title", "start_date", "end_date", "user_id")
# VALUES (305, 'Booked', 'May15', 'May20', 'user_id');