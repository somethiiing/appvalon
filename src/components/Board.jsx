import React from 'react';
import io from 'socket.io-client';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';

import { fetchRoomData } from '../ApiUtils';

//TODO remove after testing
const testRoomState = require('../testRoomStateObjects/teamProposal');
console.log(testRoomState)

const api = 'http://localhost:5000';
let socket;

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      room: '',
      roomState: testRoomState//TODO set back to {} after testing
    };
  }

  componentDidMount() {
    const { name, room } = this.props;
    this.setState({name, room});

    // TODO uncomment - Disabled for testing
    // socket = io(`${api}/`);
    // socket.on('UPDATE_STATE', res => this.handleUpdateState(res));
    //
    // fetchRoomData({room})
    //   .then(res => {
    //     console.log('data fetch', res.data)
    //     this.setState({roomState: res.data.roomState});
    //   });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleUpdateState(res) {
    const { room, roomState } = res;
    if(room === this.state.room) {
      this.setState({roomState});
    }
  }

  render() {
    const { roomName, roomOwner, status, createdAt,
      playerCount, lakeSetting, selectedRoles, players,
      boardInfo, kingOrder, currentMission, voteTrack,
      proposedTeam, teamVoteResult, missionVote
    } = this.state.roomState;

    return (
      <div className="Board">
        <KingOrder
          kingOrder={kingOrder}
          players={players}
          proposedTeam={proposedTeam}
        />
        <Missions
          currentMission={currentMission}
          boardInfo={boardInfo}
          voteTrack={voteTrack}
        />
        <ActionArea
          roomState={this.state.roomState}
        />
      </div>
    );
  }
}

export default Board;
