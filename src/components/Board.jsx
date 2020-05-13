import React from 'react';
import io from 'socket.io-client';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';

import {fetchRoomData} from '../ApiUtils';
import {KingProposalView} from "./KingProposalView";
import {NonKingProposalView} from "./NonKingProposalView";

const api = 'http://localhost:5000';
let socket;

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      room: '',
      roomState: {}
    };
  }

  componentDidMount() {
    const { name, room } = this.props;
    this.setState({name, room});

    socket = io(`${api}/`);
    socket.on('UPDATE_STATE', res => this.handleUpdateState(res));

    fetchRoomData({room})
      .then(res => {
        debugger;
        console.log('data fetch', res.data)
        this.setState({roomState: res.data.roomState});
      });
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
    const boardState = this.state.roomState;
    return (
        <div className="Board">
          <pre style={{textAlign: 'left'}}>{JSON.stringify(this.state, null, 2)}</pre>
          <KingOrder/>
          <Missions/>
          <ActionArea/>
          {/*this KingProposalView here is just for testing*/}
          {<KingProposalView boardState={boardState} name={this.state.name}/>}
          {<NonKingProposalView boardState={boardState} name={this.state.name}/>}
        </div>
    );
  }
}

export default Board;
