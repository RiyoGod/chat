from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, leave_room, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('join')
def handle_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(f"{username} has joined the room.", room=room)

@socketio.on('message')
def handle_message(data):
    username = data['username']
    room = data['room']
    msg = data['msg']
    send(f"{username}: {msg}", room=room)

@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(f"{username} has left the room.", room=room)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000)
