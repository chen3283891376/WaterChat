#! /usr/bin/python3
"""
    水瓜聊天
    ~~~~~~~~~~~~~~~~~~~
    :author: lrs2187 and wry
"""
from flask import *
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
from constants import *
from database import *
from utils import *
import os
import sys

app = Flask(__name__)
app.secret_key = SECRET_KEY
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    app.root_path, "data.db"
)

socketio = SocketIO(app, cors_allowed_origins="*")
cors = CORS(app)
db.init_app(app)

socket_id_dict = dict()


@app.route("/api/check", methods=["GET"])
def check_access_token():
    if not request.values["access_token"]:
        return {"status": "400ERROR", "message": "空的access_token"}, 400
    if (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        return {"status": "400ERROR", "message": "登录已失效。"}, 400
    return {"status": "200OK", "message": "登录有效"}


@app.route("/api/user/account_info", methods=["GET"])
def get_account_info():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        user = User.query.filter_by(access_token=request.values["access_token"]).first()
        res = {"name": user.user_name, "avatar": user.user_avatar, "id": user.user_id}
        return {"status": "200OK", "data": res}
    else:
        return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/user/get", methods=["GET"])
def user_get():
    if User.query.get(request.values["id"]) is None:
        return {"status": "400ERROR", "message": "不存在的用户"}, 400
    user = User.query.get(request.values["id"])
    res = {"name": user.user_name, "avatar": user.user_avatar, "id": user.user_id}
    return {"status": "200OK", "data": res}


@app.route("/api/user/get_by_name", methods=["GET"])
def user_get_by_name():
    if User.query.filter_by(user_name=request.values["name"]).first() is None:
        return {"status": "400ERROR", "message": "不存在的用户"}, 400
    user = User.query.filter_by(user_name=request.values["name"]).first()
    res = {"name": user.user_name, "avatar": user.user_avatar, "id": user.user_id}
    return {"status": "200OK", "data": res}


@app.route("/api/user/search", methods=["GET"])
def user_search():
    if (
        User.query.filter(
            User.user_name.like("%" + request.values["name"] + "%")
        ).first()
        is None
    ):
        return {"status": "400ERROR", "message": "未找到指定用户"}, 400
    db_users = User.query.filter(
        User.user_name.like("%" + request.values["name"] + "%")
    ).all()
    users = []
    for user in db_users:
        users.append(
            {"name": user.user_name, "avatar": user.user_avatar, "id": user.user_id}
        )
    return {"status": "200OK", "data": users}


@app.route("/api/user/register", methods=["POST"])
def user_register():
    if not (User.query.filter_by(user_name=request.values["name"]).first() is None):
        return {"status": "400ERROR", "message": "重复的用户名"}, 400
    if not (User.query.filter_by(user_email=request.values["email"]).first() is None):
        return {"status": "400ERROR", "message": "重复的邮箱地址"}, 400
    name = request.values["name"].strip()
    if not name:
        return {"status": "400ERROR", "message": "空的用户名"}, 400
    if len(name) < 3:
        return {"status": "400ERROR", "message": "用户名过短（至少3位）"}, 400
    if len(request.values["password"]) < 8:
        return {"status": "400ERROR", "message": "密码过短（至少8位）"}, 400
    count_words = 0
    count_nums = 0
    count_other = 0
    for i in request.values["password"]:
        if i in WORDS:
            count_words += 1
        elif i in NUMS:
            count_nums += 1
        else:
            count_other += 1
    if count_words <= 2 and count_other <= 1:
        return {
            "status": "400ERROR",
            "message": "密码至少包含2个字母（大小写均可）和1个特殊字符（包括中文）",
        }, 400
    if "123456" in request.values["password"]:
        return {"status": "400ERROR", "message": "过于简单的密码"}, 400
    if not check_email(request.values["email"]):
        return {"status": "400ERROR", "message": "不正确的邮箱地址"}, 400

    new_user = User(
        user_email=request.values["email"],
        user_name=request.values["name"],
        user_avatar="https://livefile.xesimg.com/programme/python_assets/"
        "e6f6b37815399773a2f7365cf805077f.png",
    )
    access_token = new_user.get_new_access_token()
    new_user.set_password(request.values["password"])
    db.session.add(new_user)
    db.session.commit()

    self_room = ChatRoom(
        user_id=new_user.user_id,
        room_name=new_user.user_name,
        is_private_room=True,
        room_avatar="https://livefile.xesimg.com/programme/python_assets/e6f6b37815399773a2f7365cf805077f.png",
    )
    db.session.add(self_room)
    db.session.commit()

    self_room_people = RoomPeople(room_id=self_room.room_id, user_id=new_user.user_id)
    db.session.add(self_room_people)
    db.session.commit()

    return {"status": "200OK", "access_token": access_token}


@app.route("/api/user/login", methods=["POST"])
def user_login():
    if not (User.query.filter_by(user_name=request.values["name"]).first() is None):
        user = User.query.filter_by(user_name=request.values["name"]).first()
        if user.verify_password(request.values["password"]):
            access_token = user.get_new_access_token()
            db.session.commit()
            return {"status": "200OK", "access_token": access_token}
        return {"status": "400ERROR", "message": "错误的密码"}, 400
    return {"status": "400ERROR", "message": "不存在的用户"}, 400


@app.route("/api/user/set_avatar", methods=["POST"])
def set_avatar():
    if not User.query.filter_by(access_token=request.values["access_token"]).first():
        return {"status": "400ERROR", "message": "未认证的用户"}, 400
    elif request.values["avatar"] is None:
        return {"status": "400ERROR", "message": "头像不能为空"}, 400
    elif not (
        request.values["avatar"].startswith("https://")
        or request.values["avatar"].startswith("http://")
    ):
        return {"status": "400ERROR", "message": "头像必须为https或http链接"}, 400
    user = User.query.filter_by(access_token=request.values["access_token"]).first()
    user.user_avatar = request.values["avatar"]
    db.session.commit()
    return {"status": "200OK"}


@app.route("/api/user/friend/add", methods=["POST"])
def user_add_friend():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        if not (
            Friend.query.filter_by(
                user_id=current_user.user_id,
                friend_user_id=request.values["friend_user_id"],
            ).first()
            is None
        ):
            return {"status": "400ERROR", "message": "已存在的好友"}, 400

        new_room = ChatRoom(
            room_name="私聊",
            user_id=current_user.user_id,
            is_private_room=True,
            room_avatar="https://livefile.xesimg.com/programme/python_assets"
            "/e6f6b37815399773a2f7365cf805077f.png",
        )
        db.session.add(new_room)
        db.session.commit()

        new_room_people1 = RoomPeople(
            room_id=new_room.room_id, user_id=request.values["friend_user_id"]
        )
        new_room_people2 = RoomPeople(
            room_id=new_room.room_id, user_id=current_user.user_id
        )
        db.session.add(new_room_people1)
        db.session.add(new_room_people2)

        new_friend1 = Friend(
            user_id=current_user.user_id,
            friend_user_id=request.values["friend_user_id"],
            room_id=new_room.room_id,
        )
        new_friend2 = Friend(
            user_id=request.values["friend_user_id"],
            friend_user_id=current_user.user_id,
            room_id=new_room.room_id,
        )
        db.session.add(new_friend1)
        db.session.add(new_friend2)

        db.session.commit()
        return {"status": "200OK"}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/user/friend/get", methods=["GET"])
def user_get_friend():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        db_friends = Friend.query.filter_by(user_id=current_user.user_id).all()
        friends = []
        for friend in db_friends:
            db_user = User.query.filter_by(user_id=friend.friend_user_id).first()
            if db_user is None:
                user = {
                    "name": "不存在的用户",
                    "avatar": "https://livefile.xesimg.com/programme/python_assets/"
                    "e6f6b37815399773a2f7365cf805077f.png",
                    "id": 999999999,
                }
            else:
                user = {
                    "name": db_user.user_name,
                    "avatar": db_user.user_avatar,
                    "id": db_user.user_id,
                }
            friends.append(user)
        return {"status": "200OK", "data": friends}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/user/friend/delete", methods=["POST"])
def friend_delete():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        if (
            Friend.query.filter_by(
                user_id=current_user.user_id,
                friend_user_id=request.values["friend_user_id"],
            ).first()
            is None
        ):
            return {"status": "400ERROR", "message": "不存在的好友"}, 400

        friend_1 = Friend.query.filter_by(
            user_id=current_user.user_id,
            friend_user_id=request.values["friend_user_id"],
        )
        friend_2 = Friend.query.filter_by(
            user_id=request.values["friend_user_id"],
            friend_user_id=current_user.user_id,
        )
        friend_room_id = friend_1.room_id
        db.session.delete(friend_1)
        db.session.delete(friend_2)

        db_friend_room = ChatRoom.query.filter_by(room_id=friend_room_id)
        db_room_peoples = RoomPeople.query.filter_by(room_id=friend_room_id).all()
        db_room_messages = RoomMessage.query.filter_by(room_id=friend_room_id).all()

        db.session.delete(db_friend_room)
        for people in db_room_peoples:
            db.session.delete(people)
        for message in db_room_messages:
            db.session.delete(message)

        db.session.commit()
        return {"status": "200OK"}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/get")
def room_get():
    if ChatRoom.query.get(request.values["id"]) is None:
        return {"status": "400ERROR", "message": "不存在的房间"}, 400
    room = ChatRoom.query.get(request.values["id"])
    res = {
        "name": room.room_name,
        "avatar": room.room_avatar,
        "id": room.room_id,
        "private": room.is_private_room,
        "admin_id": room.user_id,
    }
    return {"status": "200OK", "data": res}


@app.route("/api/room/create", methods=["POST"])
def room_create():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        new_room = ChatRoom(
            room_name=request.values["name"],
            is_private_room=False,
            room_avatar="https://livefile.xesimg.com/programme/python_assets"
            "/e6f6b37815399773a2f7365cf805077f.png",
            user_id=current_user.user_id,
        )
        db.session.add(new_room)
        db.session.commit()
        new_room_people = RoomPeople(
            room_id=new_room.room_id, user_id=current_user.user_id
        )
        db.session.add(new_room_people)
        db.session.commit()
        return {"status": "200OK", "room_id": new_room.room_id}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/delete", methods=["POST"])
def room_delete():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        if ChatRoom.query.get(request.values["id"]) is None:
            return {"status": "400ERROR", "message": "不存在的房间"}, 400
        if (
            ChatRoom.query.get(request.values["id"]).user_id
            != User.query.filter_by(access_token=request.values["access_token"])
            .first()
            .user_id
        ):
            return {"status": "400ERROR", "message": "非房间管理员"}, 400
        room = ChatRoom.query.get(request.values["id"])
        if room.is_private_room:
            return {"status": "400ERROR", "message": "不允许的操作"}, 400

        db_room_peoples = RoomPeople.query.filter_by(room_id=request.values["id"]).all()
        db_room_messages = RoomMessage.query.filter_by(
            room_id=request.values["id"]
        ).all()

        for people in db_room_peoples:
            db.session.delete(people)
        for message in db_room_messages:
            db.session.delete(message)
        db.session.delete(room)

        db.session.commit()
        return {"status": "200OK", "message": "删除成功"}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/add_user", methods=["POST"])
def room_add_user():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        if ChatRoom.query.get(request.values["room_id"]) is None:
            return {"status": "400ERROR", "message": "不存在的房间"}, 400
        if (
            ChatRoom.query.get(request.values["room_id"]).user_id
            != User.query.filter_by(access_token=request.values["access_token"])
            .first()
            .user_id
        ):
            return {"status": "400ERROR", "message": "非房间管理员"}, 400
        if User.query.get(request.values["user_id"]) is None:
            return {"status": "400ERROR", "message": "不存在的用户"}, 400
        if not (
            RoomPeople.query.filter_by(room_id=request.values["room_id"])
            .filter_by(user_id=request.values["user_id"])
            .first()
            is None
        ):
            return {"status": "400ERROR", "message": "房间里已经存在这个用户"}, 400
        current_room = ChatRoom.query.get(request.values["room_id"])
        current_room.is_private_room = False
        new_room_peoples = RoomPeople(
            room_id=request.values["room_id"], user_id=request.values["user_id"]
        )
        db.session.add(new_room_peoples)
        db.session.commit()
        return {"status": "200OK", "message": "添加成功"}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/has", methods=["GET"])
def room_has():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        db_room_people = RoomPeople.query.filter_by(user_id=current_user.user_id).all()
        rooms = []
        for room_people in db_room_people:
            current_room = ChatRoom.query.get(room_people.room_id)
            if current_room is None:
                continue
            if not current_room.is_private_room:
                rooms.append(
                    {
                        "name": current_room.room_name,
                        "avatar": current_room.room_avatar,
                        "id": current_room.room_id,
                        "private": current_room.is_private_room,
                        "admin_id": current_room.user_id,
                    }
                )
        return {"status": "200OK", "data": rooms}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/private", methods=["GET"])
def get_private_room():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        db_room_people = RoomPeople.query.filter_by(user_id=current_user.user_id).all()
        rooms = []
        for room_people in db_room_people:
            current_room = ChatRoom.query.get(room_people.room_id)
            if current_room is None:
                continue
            rooms.append(
                {
                    "name": current_room.room_name,
                    "avatar": current_room.room_avatar,
                    "id": current_room.room_id,
                    "private": current_room.is_private_room,
                    "admin_id": current_room.user_id,
                }
            )

        private_rooms = []
        for room in rooms:
            if room["private"]:
                db_room_peoples = RoomPeople.query.filter_by(room_id=room["id"]).all()
                users = []
                for people in db_room_peoples:
                    _current_user = User.query.get(people.user_id)
                    users.append(
                        {
                            "name": _current_user.user_name,
                            "avatar": _current_user.user_avatar,
                            "id": _current_user.user_id,
                            "private": current_room.is_private_room,
                        }
                    )
                i = True
                for people in users:
                    if people["id"] == current_user.user_id and i:
                        i = False
                        continue
                    room["name"] = people["name"]
                    room["friend_id"] = people["id"]
                private_rooms.append(room)
        return {"status": "200OK", "data": private_rooms}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/users", methods=["GET"])
def room_get_users():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        if (
            RoomPeople.query.filter_by(room_id=request.values["room_id"])
            .filter_by(
                user_id=User.query.filter_by(
                    access_token=request.values["access_token"]
                )
                .first()
                .user_id
            )
            .first()
            is None
        ):
            return {"status": "400ERROR", "message": "不在该房间里"}, 400
        db_room_peoples = RoomPeople.query.filter_by(
            room_id=request.values["room_id"]
        ).all()
        users = []
        for people in db_room_peoples:
            current_user = User.query.get(people.user_id)
            users.append(
                {
                    "name": current_user.user_name,
                    "avatar": current_user.user_avatar,
                    "id": current_user.user_id,
                }
            )
        return {"status": "200OK", "data": users}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/get_by_name", methods=["GET"])
def room_get_by_name():
    if (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        if (
            ChatRoom.query.filter_by(room_name=request.values["room_name"]).first()
            is None
        ):
            return {"status": "400ERROR", "message": "房间名无效"}, 400
        else:
            room = ChatRoom.query.filter_by(room_name=request.values["room_name"])[0]
            return {
                "status": "200OK",
                "data": {
                    "room_id": room.room_id,
                    "room_name": room.room_name,
                    "avatar": room.room_avatar,
                },
            }, 200
    else:
        return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/api/room/quit", methods=["POST"])
def room_quit():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        if (
            RoomPeople.query.filter_by(room_id=request.values["room_id"])
            .filter_by(
                user_id=User.query.filter_by(
                    access_token=request.values["access_token"]
                )
                .first()
                .user_id
            )
            .first()
            is None
        ):
            return {"status": "400ERROR", "message": "不在该房间里"}, 400
        current_user = User.query.filter_by(
            access_token=request.values["access_token"]
        ).first()
        room_people = (
            RoomPeople.query.filter_by(room_id=request.values["room_id"])
            .filter_by(user_id=current_user.user_id)
            .first()
        )
        db.session.delete(room_people)
        db.session.commit()
        return {"status": "200OK"}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@app.route("/room/message/get", methods=["GET"])
def get_room_messages():
    if not (
        User.query.filter_by(access_token=request.values["access_token"]).first()
        is None
    ):
        if ChatRoom.query.get(request.values["room_id"]) is None:
            return {"status": "400ERROR", "message": "不存在的房间"}, 400
        if (
            RoomPeople.query.filter_by(room_id=request.values["room_id"])
            .filter_by(
                user_id=User.query.filter_by(
                    access_token=request.values["access_token"]
                )
                .first()
                .user_id
            )
            .first()
            is None
        ):
            return {"status": "400ERROR", "message": "未加入的房间"}, 400
        db_room_messages = RoomMessage.query.filter_by(
            room_id=request.values["room_id"]
        ).all()
        room_messages = []
        for message in db_room_messages:
            db_send_user = User.query.filter_by(user_id=message.user_id).first()
            if db_send_user is None:
                send_user = {
                    "name": "不存在的用户",
                    "avatar": "https://livefile.xesimg.com/programme/python_assets/"
                    "e6f6b37815399773a2f7365cf805077f.png",
                    "id": 999999999,
                }
            else:
                send_user = {
                    "name": db_send_user.user_name,
                    "avatar": db_send_user.user_avatar,
                    "id": db_send_user.user_id,
                }
            room_messages.append(
                {
                    "message": message.message,
                    "type": message.message_type,
                    "send_user": send_user,
                    "send_time": message.send_datetime,
                }
            )
        return {"status": "200OK", "data": room_messages}
    return {"status": "400ERROR", "message": "未认证的用户"}, 400


@socketio.on("new message")
def new_message(dict_: dict):
    if not isinstance(dict_, dict):
        return "error", "无效的请求"
    else:
        access_token = dict_["access_token"]
        user = User.query.filter_by(access_token=access_token).first()
        if not user:
            return "error", "登录失效，请重新登录。"
        to_room = ChatRoom.query.filter_by(room_id=dict_["to_room_id"]).first()
        if not to_room:
            return "error", "房间id无效"
        rm = RoomMessage(
            room_id=dict_["to_room_id"],
            user_id=user.user_id,
            message=dict_["message"],
            message_type=dict_["type"],
        )
        db.session.add(rm)
        db.session.commit()
        print("getting a msg")

        db_room_peoples = RoomPeople.query.filter_by(room_id=dict_["to_room_id"]).all()
        for people in db_room_peoples:
            _current_user = User.query.get(people.user_id)
            if socket_id_dict.get(_current_user.user_id, None) is None:
                continue
            emit(
                "new message",
                {
                    "type": dict_["type"],
                    "room_id": dict_["to_room_id"],
                    "from_user": {
                        "name": user.user_name,
                        "avatar": user.user_avatar,
                        "id": user.user_id,
                    },
                    "message": dict_["message"],
                },
                to=socket_id_dict[_current_user.user_id],
            )
        return "ok", "发送成功"


@app.errorhandler(400)
def bad_request(e):
    return {"status": "400BAD_REQUEST"}, 400


@app.errorhandler(404)
def not_found(e):
    return {"status": "404NOT_FOUND"}, 404


@socketio.on("logon")
def on_logon(data):
    user = User.query.filter_by(access_token=data["access_token"]).first()
    if not user:
        return "error", "登录失效，请重新登录。"
    else:
        print(user.user_id)
        join_room(request.sid)

        global socket_id_dict
        socket_id_dict[request.sid] = user.user_id
        socket_id_dict[user.user_id] = request.sid
        # 特色 谁disconnect了

        return "ok", "连接成功"


@socketio.on("disconnect")
def on_disconnect():
    leave_room(request.sid)
    try:
        socket_id_dict.pop(socket_id_dict.pop(request.sid))
    except KeyError:
        pass


@app.cli.command()
def initdb():
    db.create_all()


@app.cli.command()
def dropdb():
    db.drop_all()


if __name__ == "__main__":
    try:
        if sys.argv[1] == "--localhost":
            socketio.run(
                app, allow_unsafe_werkzeug=True, log_output=True, use_reloader=False
            )
    except IndexError:
        socketio.run(
            app,
            host="0.0.0.0",
            allow_unsafe_werkzeug=True,
            log_output=True,
            use_reloader=False,
        )
