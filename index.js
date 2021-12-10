const express = require('express');
const bodyParser = require('body-parser');


const socketio = require('socket.io')
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


var server = app.listen(3000,()=>{
    console.log('Server is running on port number 3000')
})


//Chat Server

var io = socketio(server)

io.on('connection',function(socket) {

    //The moment one of your client connected to socket.io server it will obtain socket id
    //Let's print this out.
    console.log(`Connection : SocketId = ${socket.id}`)
    //Since we are going to use userName through whole socket connection, Let's make it global.   
    var userName = '';
   
    socket.on("test",function(data){
    
      const room_data = JSON.parse(data)
      userName = room_data.userName;
      const roomName = room_data.roomName;
      console.log(`Connection : SocketId = ${roomName}`)
      socket.join(`${roomName}`)
    
      io.to(`${roomName}`).emit('test',data)
       io.to(`${roomName}`).emit('test',socket.adapter.rooms)
      console.log("state : ",socket.adapter.rooms); 
     //io.to('${roomName}').emit('snedMsg', data)
     
      //socket.emit('test',userName)
      
      
      



    })
    
    socket.on("UpdataCoordinate",function(data){
       const room_data = JSON.parse(data)
       const roomName = room_data.roomName;
    
       socket.join(`${roomName}`)
       const latitude=room_data.latitude;
       const longitude=room_data.longitude;
       const userName = room_data.userName;
       const UserCoordinate = {
            userName : userName,
            latitude: latitude,
            longitude : longitude
        }
        
       
       io.to(`${roomName}`).emit('UpdataCoordinate',JSON.stringify(UserCoordinate))
       function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
       var ran=rand(1,20)
        console.log(ran)
       if(ran==30){
       io.to(`${roomName}`).emit('makeBox',JSON.stringify
       (UserCoordinate))   
       }

       

    })

    socket.on("getItem",function(){
        var ran=rand(1,4)
        console.log(ran)
        switch(ran){
          case 1:
            var item =rand(1,5)


        }


    })
    

    socket.on('disconnect', function () {
        console.log("One of sockets disconnected from our server.")
    });

})



