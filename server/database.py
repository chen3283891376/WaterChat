from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import time

db = SQLAlchemy()


class User(db.Model):

    user_id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(254), unique=True, nullable=False)
    user_name = db.Column(db.String(30))
    user_password_hash = db.Column(db.String(128))
    user_avatar = db.Column(db.String(256))
    access_token = db.Column(db.String(128))

    def set_password(self, password):
        self.user_password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.user_password_hash, password)

    def get_new_access_token(self):
        self.access_token = str(uuid.uuid4().hex)
        return self.access_token

    def set_avatar(self, url):
        self.user_avatar = url


class Friend(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, index=True)
    friend_user_id = db.Column(db.Integer)
    room_id = db.Column(db.Integer)


class ChatRoom(db.Model):
    room_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    room_name = db.Column(db.String(64))
    room_avatar = db.Column(db.String(256))
    is_private_room = db.Column(db.Boolean)

    def set_avatar(self, url):
        self.room_avatar = url

    def __repr__(self) -> str:
        return f"<ChatRoom {self.room_name} id={self.room_id}>"


class RoomPeople(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, index=True)
    user_id = db.Column(db.Integer)


class RoomMessage(db.Model):
    _id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, index=True)
    user_id = db.Column(db.Integer)
    message = db.Column(db.Text, nullable=False)
    message_type = db.Column(db.Text, nullable=False)
    send_datetime = db.Column(db.String(32), default=lambda: time.strftime("%Y-%m-%d %H:%M:%S"), index=True)
