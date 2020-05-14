import React from 'react';
import io from 'socket.io-client';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';
import Header from './Header';

import {fetchRoomData} from '../ApiUtils';
import WaitingArea from "./WaitingArea";

const api = 'http://localhost:5000';
let socket;

//TODO remove after testing
const testRoomState = require('../testRoomStateObjects/teamProposal');
const testMissionResultState = require('../testRoomStateObjects/missionResult');
const testTeamVoteResultState = require('../testRoomStateObjects/teamVoteResult');

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //testing stuff
      name: '',
      room: '',
      roomState: {},
      // roomState: testRoomState,
      // missionState: testMissionResultState,
      // voteState: testTeamVoteResultState
    };
  }

  componentDidMount() {
    const {name, room} = this.props;
    console.log('props', name, room, this.props)
    this.setState({name, room});

    socket = io(`${api}/`);
    socket.on('UPDATE_STATE', res => this.handleUpdateState(res));

    fetchRoomData({room})
        .then(res => {
          console.log('data fetch', res.data)
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
    console.log(status)
    if (!status) {
      return null;
    } else if (status === 'WAITING_FOR_PLAYERS') {
      return <WaitingArea roomState={roomState}/>
    } else {
      return (
          <React.Fragment>
            <KingOrder kingOrder={kingOrder} players={players} proposedTeam={proposedTeam}/>
            <Missions currentMission={currentMission} boardInfo={boardInfo} voteTrack={voteTrack}/>
            <ActionArea name={name} room={room} roomState={roomState}/>
          </React.Fragment>
      );
    }
  }

  render() {
    const {name, room, roomState} = this.props;
    // const boardState = this.state.roomState;
    // const missionState = this.state.missionState;
    // const voteState = this.state.voteState;
    return (
        <div className="Board">
          <Header name={this.state.name} roomState={roomState}/>
          {this.renderBoard()}
        </div>
    );
  }
}

export default Board;
