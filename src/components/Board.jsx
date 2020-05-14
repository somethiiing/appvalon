import React from 'react';
import io from 'socket.io-client';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';
import Header from './Header';

import {fetchRoomData} from '../ApiUtils';
import {KingProposalView} from "./KingProposalView";
import NonKingProposalView from "./NonKingProposalView";
import MissionResultView from './MissionResultView';
import VoteResultView from './VoteResultView';
import TeamVote from "./TeamVote";

const api = 'http://localhost:5000';
let socket;

//TODO remove after testing
const testRoomState = require('../testRoomStateObjects/teamProposal');
const testMissionResultState = require('../testRoomStateObjects/missionResult');
const testTeamVoteResultState = require('../testRoomStateObjects/teamVoteResult');
console.log(testRoomState);

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //testing stuff
      name: '',
      room: '',
      roomState: testRoomState,
      missionState: testMissionResultState,
      voteState: testTeamVoteResultState
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
    const { name, roomState } = this.props;
    const { roomName, roomOwner, status, createdAt,
      playerCount, lakeSetting, selectedRoles, players,
      boardInfo, kingOrder, currentMission, voteTrack,
      proposedTeam, teamVoteResult, missionVote
    } = this.state.roomState;
    const boardState = this.state.roomState;
    const missionState = this.state.missionState;
    const voteState = this.state.voteState;
    return (
        <div className="Board">
          <Header name={this.state.name} roomState={voteState} />
          <KingOrder kingOrder={kingOrder} players={players} proposedTeam={proposedTeam}/>
          <Missions currentMission={currentMission} boardInfo={boardInfo} voteTrack={voteTrack}/>
          <ActionArea name={name} roomState={roomState} />
          <MissionResultView boardState={missionState} name={this.state.name}/>
          <VoteResultView boardState={voteState} name={this.state.name}/>
          {/*this KingProposalView here is just for testing*/}
          {<KingProposalView roomState={boardState} name={this.state.name}/>}
          {<NonKingProposalView roomState={boardState} name={this.state.name}/>}
            <TeamVote roomState={boardState} name={this.state.name}/>
        </div>
    );
  }
}

export default Board;
