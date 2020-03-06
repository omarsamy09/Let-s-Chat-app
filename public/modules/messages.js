//used for messages functions
const message_generator=(username,txt)=>{
  return{
    username,
    txt,
    createdAt:new Date().getTime()
  }
}
const location_message=(username,txt)=>{
  return{
    username,
    txt,
    createdAt:new Date().getTime()
  }
}
module.exports={
  message_generator,
  location_message
}
