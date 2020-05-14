import React from 'react';
import io from 'socket.io-client';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';
import Header from './Header';

import {fetchRoomData} from '../ApiUtils';
import {KingProposalView} from "./KingProposalView";
import NonKingProposalView from "./NonKingProposalView";

const api = 'http://localhost:5000';
let socket;

//TODO remove after testing
const testRoomState = require('../testRoomStateObjects/teamProposal');
console.log(testRoomState);

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //testing stuff
      name: '',
      room: '',
      roomState: testRoomState
    };
  }

  componentDidMount() {
    const {name, room} = this.props;
    this.setState({name, room});
    //
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
    const { name, room } = this.props;
    const boardState = this.state.roomState;

    return (
        <div className="Board">
          <Header name={this.props.name} roomState={this.state.roomState} />
          <KingOrder />
          <Missions boardState={boardState} />
          <ActionArea name={name} room={room} roomState={boardState} />
        </div>
    );
  }
}

export default Board;
