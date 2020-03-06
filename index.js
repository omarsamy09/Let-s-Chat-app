const mongoose=require('mongoose')
const path=require('path');
const socket=require('socket.io');
const http=require('http');
const express=require('express');
const app=express();
const serve=http.createServer(app);
const io=socket(serve);
const {message_generator,location_message}=require('./public/modules/messages')
const {addUser,removeUser,getUser,getUsersInRoom}=require('./public/modules/users')


const port=process.env.PORT||3000;
 const publicDir=path.join(__dirname,'./public');
 app.use(express.static(publicDir));


io.on('connection',(socket)=>{
  socket.on('join',({userName,roomName},callback)=>{
   const {error,user}=addUser({id:socket.id,userName,roomName})
   if(error){
     return callback(error)
   }

    socket.join(user.roomName)
    socket.broadcast.to(user.roomName).emit('message',message_generator("System Message",`${user.userName} has joined the chat!`))
    callback()
  })
  socket.on('send',(sent_mssg,callback)=>{
    const user=getUser(socket.id)
    io.to(user.roomName).emit('message',message_generator(user.userName,sent_mssg))
    callback()
  })
  socket.on('send-location',(coords,callback)=>{
    const user=getUser(socket.id)
    io.to(user.roomName).emit('locationMessage',location_message(user.userName,`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`))
    callback()
  })
  socket.on('disconnect', ()=>{
    const user =removeUser(socket.id)
      if(user)io.to(user.roomName).emit('message',message_generator("System Message",`${user.userName} has left the chat`))
  })
})
serve.listen(port);
