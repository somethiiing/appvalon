import React from 'react';
import io from 'socket.io-client';
import WaitingArea from '../PreGame/WaitingArea';
import KingOrder from './KingOrder';
import MissionList from './Missions/MissionList';
import ActionArea from './ActionArea/ActionArea';
import Header from '../Base/Header';

import './Board.css';

import { fetchRoomData } from '../../ApiUtils';

const api = '';
let socket;

// To test:
// Change testRoomState import to use your desired data from testRoomStateObjects
// Set roomState in constructor to testRoomState
// Comment out socket and fetchRoomData code in componentDidMount
// Set name and room state in App.jsx to match your test data
// Uncomment board test button in App.jsx
const testRoomState = require('../../testRoomStateObjects/teamProposal');

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      room: '',
      roomState: {}
      // roomState: testRoomState
    };
  }

  componentDidMount() {
    const { name, room } = this.props;
    this.setState({ name, room });

    socket = io(`${api}/`);
    socket.on('UPDATE_STATE', (res) => this.handleUpdateState(res));

    fetchRoomData({ room }).then((res) => {
      this.setState({ roomState: res.data.roomState });
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleUpdateState(res) {
    const { room, roomState } = res;
    if (room === this.state.room) {
      this.setState({ roomState });
    }
  }

  renderBoard() {
    const { name, room, roomState } = this.state;
    const { status } = roomState;
    if (!status) {
      return null;
    } else if (status === 'WAITING_FOR_PLAYERS') {
      return <WaitingArea roomState={roomState} />;
    } else {
      return (
        <React.Fragment>
          <KingOrder roomState={roomState} />
          <MissionList roomState={roomState} />
          <ActionArea name={name} room={room} roomState={roomState} />
        </React.Fragment>
      );
    }
  }

  render() {
    const { name, roomState } = this.state;
    return (
      <div className='Board'>
        <Header name={name} roomState={roomState} />
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
