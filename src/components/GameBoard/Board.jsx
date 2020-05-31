import React from 'react';
import io from 'socket.io-client';
import WaitingArea from "../PreGame/WaitingArea";
import KingOrder from './KingOrder';
import Missions from './Missions/Missions';
import ActionArea from './ActionArea/ActionArea';
import Header from '../Base/Header';
import EndGame from './ActionArea/EndGame/EndGame';
import './Board.css';

import {fetchRoomData} from '../../ApiUtils';

const api = '';
let socket;

// To test:
// Change testRoomState import to use your desired data from testRoomStateObjects
// Set roomState in constructor to testRoomState
// Comment out socket and fetchRoomData code in componentDidMount
// Set name and room state in App.jsx to match your test data
// Uncomment board test button in App.jsx
const testRoomState = require('../../testRoomStateObjects/endGame');

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      room: '',
      roomState: {},
      // roomState: testRoomState,
    };
  }

  componentDidMount() {
    const {name, room} = this.props;
    this.setState({name, room});

    socket = io(`${api}/`);
    socket.on('UPDATE_STATE', res => this.handleUpdateState(res));

    fetchRoomData({room})
        .then(res => {
          this.setState({roomState: res.data.roomState});
        });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleUpdateState(res) {
    const {room, roomState} = res;
    if (room === this.state.room) {
      this.setState({roomState});
    }
  }

  renderBoard() {
    const {name, room} = this.props;
    const {roomState} = this.state;
    const {
      roomName, roomOwner, status, createdAt,
      playerCount, lakeSetting, selectedRoles, players,
      boardInfo, kingOrder, currentMission, voteTrack,
      proposedTeam, teamVoteResult, missionVote
    } = this.state.roomState;
    if (!status) {
      return null;
    } else if (status === 'WAITING_FOR_PLAYERS') {
      return <WaitingArea roomState={roomState}/>
    } else {
      return (
          <React.Fragment>
            <KingOrder kingOrder={kingOrder} players={players} proposedTeam={proposedTeam} roomState={roomState}/>
            <Missions currentMission={currentMission} boardInfo={boardInfo} voteTrack={voteTrack}/>
            <ActionArea name={name} room={room} roomState={roomState}/>
          </React.Fragment>
      );
    }
  }

  render() {
    const roomState = this.state.roomState;
    return (
        <div className="Board">
          <Header name={this.state.name} roomState={roomState}/>
          {this.renderBoard()}
          {(roomState.status === 'EVIL_WIN' || roomState.status === 'GOOD_WIN')
            && <EndGame status={roomState.status} exitGame={this.props.exitGame} />
          }
        </div>
    );
  }
}

export default Board;
