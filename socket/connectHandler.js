let onlineList = [];
let roomCnt = 3;
let roomList = [
  { id: 1, roomName: "전체 채팅방", userList: [] },
  { id: 2, roomName: "전체 채팅방2", userList: [] },
];

function socketHandler(io) {
  io.on("connect", (socket) => {
    // 연결시
    console.log("connected!");
    socket.on("login", (userId) => {
      onlineList.push({ userId, socketId: socket.id });
      io.emit("online list", onlineList);
      io.emit("room list", roomList);
      console.log("roomList", roomList);
      console.log("onlineList", onlineList);
    });

    socket.on("create room", ({ roomId, roomName }) => {
      if (roomList.find((r) => r.id === roomId)) return;
      roomList.push({
        id: roomId,
        roomName: roomName,
        userList: [],
      });
      io.emit("room list", roomList);
      console.log(roomList);
    });

    socket.on("join room", ({ roomId, peerId, userId, socketId }) => {
      console.log("emit join room");
      roomList.find((r) => r.id === roomId).userList.push({ userId, peerId, socketId, startTime: new Date() });
      io.emit("room list", roomList);
      console.log("room list", roomList);
    });

    socket.on("leave room", ({ roomId, socketId }) => {
      handleLeaveUserFromRoomList(roomId, socketId);
      io.emit("room list", roomList);
      console.log(roomList);
    });

    // 연결 해제시
    socket.on("disconnect", () => {
      handleLeaveUserFromAllRooms(socket.id);
      makeOffline(socket.id);
      io.emit("room list", roomList);
      io.emit("online list", onlineList);
      console.log("roomList", roomList);
      console.log("onlineList", onlineList);
    });
  });
}

function handleLeaveUserFromRoomList(roomId, socketId) {
  const updateduserList = roomList.find((room) => room.id === roomId).userList.filter((u) => u.socketId !== socketId);
  roomList.find((room) => room.id === roomId).userList = updateduserList;
}
function handleLeaveUserFromAllRooms(socketId) {
  roomList.forEach((room) => {
    room.userList = room.userList.filter((u) => u.socketId !== socketId);
  });
}

function makeOffline(socketId) {
  onlineList = onlineList.filter((user) => user.socketId !== socketId);
}

module.exports = socketHandler;
