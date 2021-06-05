const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');


//set static directories
app.use(express.static('views')); // html
app.use(express.static('Public')); // js, css, images

app.get('/', (req, res) => {
    res.sendFile('/index.html');
  });


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    fs.writeFile('/test/results.txt',msg,function(err){
      if(err)
      {
        console.log('Error');
      }
      else
      {
        console.log('Result written')
      }
    });
  });
});


app.listen('3000', function(){
    console.log('listening on 3000');
  });
