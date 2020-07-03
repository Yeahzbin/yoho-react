const { ChatModel } = require("../db/models")
module.exports = (server) => {
    const io = require('socket.io')(server)
    //监听客户端与服务器的连接
    io.on("connection", function (socket) {
        console.log("有一个客户连接了服务器，可以进行对话");
        socket.on("sendMsg", function ({ from, to, content }) {
            //接收数据
            console.log('服务器接收到客户端发送过来的消息', { from, to, content });
            //处理数据
            //准备好chatMsg对象
            const chat_id = [from, to].sort().join('_');
            const create_time = Date.now();
            new ChatModel({ from, to, content, chat_id, create_time }).save(function (error, chatMsg) {
                //向所有连接的客户端发消息
                io.emit("receiveMsg", chatMsg)
            })
        })

    })
}