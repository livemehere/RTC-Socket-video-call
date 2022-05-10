module.exports = function connectHandler (socket) {
    // 연결시
    console.log('a user connected');

    // 연결 해제시
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}