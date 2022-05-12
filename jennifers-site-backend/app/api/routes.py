from flask import Blueprint, request, jsonify
from models import db, Event, Users, Event_schema, Event_schemas, User_schema, User_schemas
from flask_cors import cross_origin

api = Blueprint('api',__name__, url_prefix='/api')


# *** EVENT ROUTES ***

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

@api.route('/events/<_id>', methods = ['PUT'])
@cross_origin(origin="*")
def update_event(event_id):
    event = Event.query.get(event_id) 
    event.event_id = request.json['event_id']
    event.title = request.json['title']
    event.start_date = request.json['start_date']
    event.end_date = request.json['end_date']
    event.user_id = request.json['user_id']

    db.session.commit()
    response = Event_schema.dump(event)
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

# *** END OF EVENT ROUTES ***


# *** USER PROFILE ROUTES ***

@api.route('/users', methods = ['POST'])
@cross_origin(origin="*")
def create_user():
    user_id = request.json['user_id']
    username = request.json['username']
    dogsname = request.json['dogsname']
    dogbreed = request.json['dogbreed']
    dogage = request.json['dogage']

    user = Users(user_id, username, dogsname, dogbreed, dogage)

    db.session.add(user)
    db.session.commit()

    response = User_schema.dump(user)
    return jsonify(response)

@api.route('/users', methods = ['GET'])
@cross_origin(origin="*")
def get_user():
    user = Users.query.all()
    response = User_schemas.dump(user)
    return jsonify(response)

@api.route('/users/<user_id>', methods = ['GET'])
@cross_origin(origin="*")
def get_userinfo(user_id):
    user = Users.query.get(user_id)
    response = User_schema.dump(user)
    return jsonify(response)

@api.route('/users/<user_id>', methods = ['PUT'])
@cross_origin(origin="*")
def update_userinfo(user_id):
    user = Users.query.get(user_id) 
    user.username = request.json['username']
    user.dogsname = request.json['dogsname']
    user.dogbreed = request.json['dogbreed']
    user.dogage = request.json['dogage']

    db.session.commit()
    response = User_schema.dump(user)
    return jsonify(response)

@api.route('/users/<user_id>', methods = ['DELETE'])
@cross_origin(origin="*")
def delete_user(user_id):
    user = Users.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    response = User_schema.dump(user)
    return jsonify(response)

# *** END OF USER PROFILE ROUTES ***



# SEQUEL EXAMPLE
# INSERT INTO events ("event_id", "title", "start_date", "end_date", "user_id")
# VALUES (305, 'Booked', 'May15', 'May20', 'user_id');