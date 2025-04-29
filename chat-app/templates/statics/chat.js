let socket = io();
let username = '';
let room = '';

function joinChat() {
    username = document.getElementById("username").value;
    room = document.getElementById("room").value;

    if (username && room) {
        socket.emit('join', { username, room });

        document.getElementById("login").style.display = "none";
        document.getElementById("chat").style.display = "block";
        document.getElementById("room-name").textContent = `Room: ${room}`;
    }
}

function sendMessage() {
    let input = document.getElementById("message");
    if (input.value.trim() !== '') {
        socket.emit('message', {
            username: username,
            room: room,
            msg: input.value
        });
        input.value = '';
    }
}

function leaveRoom() {
    socket.emit('leave', { username, room });
    location.reload(); // Simple reset
}

socket.on('message', function(msg) {
    let li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messages").appendChild(li);
});
