const users=[]

const addUser=({id,userName,roomName})=>{
  userName=userName.trim().toLowerCase()
  roomName=roomName.trim().toLowerCase()
  if(!roomName || !userName){
    return("username and room are required")
   }

   const existingUser=users.find((user)=>{
     return user.roomName === roomName && user.userName === userName
   })

    const user={id,userName,roomName}
    users.push(user)
    return{user}
}
const removeUser=(id)=>{
  const index=users.findIndex((user)=>  user.id === id)

  if(index!==-1){
    //returning the removed object
    return users.splice(index,1)[0]
  }
}

//finding user by id
const getUser=(id)=>{
return users.find((user)=> user.id === id)
}

//getting users in the same room
const getUsersInRoom=(roomName)=>{
return users.filter((user)=>user.roomName===roomName)
}
module.exports={
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}
