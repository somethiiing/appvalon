const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;
const server = app.listen(PORT);
const io = require('socket.io').listen(server);

const { getRandomFruit, createInitialRoomState, joinRoom } = require('./roomUtils');

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'build')));

const state = {  };

app.get('/api/', () => {
  res.sendStatus(200);
})

app.post('/api/createRoom', (req, res) => {
  const { settings, host } = req.body.data;
  const room = getRandomFruit();
  state[room] = createInitialRoomState(room, host, settings);
  res.send({room, host, roomState: state[room]});
  io.emit('UPDATE_ROOMLIST', {roomList: Object.keys(state)});
});

app.get('/api/getRoomList', (req, res) => {
  res.send({roomList: Object.keys(state)});
});

app.get('/api/getRoomData', (req, res) => {
  const { room } = req.query;
  res.send({roomState: state[room]});
})

app.post('/api/joinRoom', (req, res) => {
  const { name, room } = req.body
  const { players, playerCount } = state[room];

  if (players.length < playerCount) {
    state[room] = joinRoom(state[room], name)
    res.send({status: 'SUCCESS', name, room});
  } else {
    res.send({status: 'FULL'});
  }

  io.emit('UPDATE_STATE', {room, roomState: state[room]});
});

app.post('/api/update', (req, res) => {
  const { type, room, player, data = {} } = req.body;
  const { teamProposalArray, teamVote, missionVote, assassinationTarget } = data;
  console.log(type, room, player, data);
  switch(type) {
    case 'UPDATE_TEAM_MEMBERS':
      break;
    case 'SUBMIT_FOR_VOTE':
      break;
    case 'SUBMIT_TEAM_VOTE':
      break;
    case 'REVEAL_TEAM_VOTE':
      break;
    case 'HANDLE_TEAM_VOTE_RESULT':
      break;
    case 'SUBMIT_MISSION_VOTE':
      break;
    case 'HANDLE_MISSION_VOTE_RESULT':
      break;
    case 'SUBMIT_ASSASSINATION':
      break;
    case 'RECONFIGURE_GAME':
      break;
    default:
      break;
  }
  io.emit('UPDATE_STATE', {room, roomState: state[room]});
  res.sendStatus(200);
});

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', testdata => {
    console.log('user disconnected')
  });
});

console.log(`listening on port: ${PORT}`);