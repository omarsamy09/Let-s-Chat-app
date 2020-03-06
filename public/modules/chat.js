const socket=io();
const message_sent=document.querySelector('#text-sent')
const input_mssg=message_sent.querySelector('input')
const send_button=message_sent.querySelector('button')
const sendLocation_bttn=document.querySelector('#send-loc')
const mssgs=document.querySelector('#mssgs')

//temps
const mssg_template=document.querySelector('#template').innerHTML
const location_template=document.querySelector('#location_template').innerHTML

//parsing the username and roomName
const {userName,roomName}=Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('message',(message)=>{
  //rendering messages
  const html=Mustache.render(mssg_template,{
    message:message.txt,
    time:moment(message.createdAt).format('h:mm a'),
    userName:message.username
  })
  //inserting the message in the div element
  mssgs.insertAdjacentHTML('beforeend',html)

})

socket.on('locationMessage',(location)=>{
  const url=Mustache.render(location_template,{
    location:location.txt,
    loc_time:moment(location.createdAt).format('h:mm a'),
    userName:location.username
  })
  mssgs.insertAdjacentHTML('beforeend',url)
})

message_sent.addEventListener('submit',(event)=>{
  event.preventDefault();
  const sent_mssg=document.querySelector('input').value

socket.emit('send',sent_mssg,()=>{
  input_mssg.value=''
  input_mssg.focus();
})
})

 sendLocation_bttn.addEventListener('click',()=>{
  if(!navigator.geolocation){
    return alert('GeoLocation is not supported on this browser.')
  }
  sendLocation_bttn.setAttribute('disabled','disabled')
   navigator.geolocation.getCurrentPosition((currentLoc)=>{
     socket.emit('send-location',{
       latitude:currentLoc.coords.latitude,
       longitude:currentLoc.coords.longitude
     },()=>{
            sendLocation_bttn.removeAttribute('disabled')
     })
   })
 })
socket.emit('join',{userName,roomName},(error)=>{

})
