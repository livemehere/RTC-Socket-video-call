
let roomList = {

}

function socketHandler(io){

    io.on('connect',(socket) =>{
        // 연결시
        console.log('a user connected');
        socket.on('join room',({roomName, peerId, userId,socketId})=>{
            if(!roomList[roomName]){
                roomList[roomName] = [{peerId,userId,socketId}];
            }else{
                roomList[roomName].push({peerId,userId,socketId});
            }
            io.emit('room list',roomList);
        })
        // 연결 해제시
        socket.on('disconnect', () => {
            handleLeaveUserFromRoomList(socket.id);
            io.emit('room list',roomList);
        });

    });
}

function handleLeaveUserFromRoomList(socketId){
    let newRoomList = {};
    Object.keys(roomList).forEach(room=>{
        let userList = []
        roomList[room].forEach(user=>{
            if(user.socketId !== socketId){
                userList.push(user);
            }
        })
        newRoomList[room] = userList;
    })
    roomList = newRoomList;
}


module.exports = socketHandler;