const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT||5000
const server = app.listen(PORT);
const io = require('socket.io').listen(server);

const { getRandomFruit, createInitialRoomState } = require('./roomUtils');

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'build')));

const state = {};

app.get('/api/', (req,res) => {
  res.sendStatus(200);
})

app.post('/api/createRoom', (req, res) => {
  const { settings, host } = req.body.data;
  const room = getRandomFruit();
  state[room] = createInitialRoomState(room, host, settings);
  res.send({room, host, roomState: state[room]});
})

app.get('/api/getRoomList', (req, res) => {
  res.send({roomList: Object.keys(state)});
});

// app.post('/api/joinRoom', (req, res) => {
//   const { name, room } = req.body

//   io.emit('UPDATE_STATE', state);
//   res.sendStatus(200);
// });

app.post('/api/update', (req, res) => {
  const { type, room, player, data = {} } = req.body;
  // const { player } = data;

  console.log(type, room, player, data);
  switch(type) {
    case 'UPDATE_TEAM_MEMBERS':
    case 'SUBMIT_FOR_VOTE':
    case 'SUBMIT_TEAM_VOTE':
    case 'REVEAL_TEAM_VOTE':
    case 'HANDLE_TEAM_VOTE_RESULT':
    case 'SUBMIT_MISSION_VOTE':
    case 'HANDLE_MISSION_VOTE_RESULT':
    case 'SUBMIT_ASSASSINATION':
    case 'RECONFIGURE_GAME':
      break;
    default:
      break;
  }
  io.emit('UPDATE_STATE', state[room]);
  res.sendStatus(200);
});

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', testdata => {
    console.log('user disconnected')
  });
});

console.log(`listening on port: ${PORT}`);
