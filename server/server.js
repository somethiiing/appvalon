const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);
const io = require('socket.io').listen(server);

const state = {};

app.get('/api/', () => {
  res.sendStatus(200);
})

// app.get('/api/getState', (req, res) => {
//   res.send({state});
// })

// app.post('/api/joinRoom', (req, res) => {
//   const { name, room } = req.body

//   io.emit('UPDATE_STATE', state);
//   res.sendStatus(200);
// });

// app.post('/api/update', (req, res) => {
//   const { type, data = {} } = req.body;
//   const { player } = data;
//   switch(type) {
//     default:
//       break;
//   }
//   io.emit('UPDATE_STATE', state);
//   res.sendStatus(200);
// });

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', testdata => {
    console.log('user disconnected')
  });
});

console.log(`listening on port: ${PORT}`);