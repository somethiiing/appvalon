import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const api = 'http://localhost:5000'

let socket;

const FESettingsObj = {
  playerCount: 5,
  selectedRoles: {
    merlin: true, //bool
    percival: true, //bool
    tristan: false, //bool
    iseult: false, //bool
    genericGood: true, //bool
    numGenGood: 2, //num

    assassin: true, //bool
    mordred: true, //bool
    morgana: true, //bool
    oberon: false, //bool
    noberon: false, //bool
    genericEvil: false, //bool
    numGenEvil: 0 //num
  },
  lakeSetting: 'ROLE', // ROLE, ALIGNMENT, NONE
}

export class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      host: '',
      room: '',
      player: '',
      teamProposalArray: '',
      teamVote: 'REJECT',
      missionVote: 'SUCCESS',
      roomList: [],
      roomState: {}
    }

    this.createRoom = this.createRoom.bind(this);
    this.update = this.update.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getRoomList = this.getRoomList.bind(this);
  }

  componentDidMount() {
    socket = io(`${api}/`);
    socket.on('UPDATE_STATE', data => this.setState({roomState: data}));

    this.getRoomList();
  }

  handleInputChange(e, type) {
    let temp = {};
    temp[type] = e.target.value;
    this.setState(temp)
  }

  getRoomList() {
    axios.get(`${api}/api/getRoomList`)
    .then(res => {
      this.setState({roomList: res.data.roomList});
    });
  }

  createRoom() {
    axios.post(`${api}/api/createRoom`, {data: {
      type: 'CREATE_ROOM',
      settings: FESettingsObj,
      host: this.state.host
    }})
      .then(res => this.setState({roomState: res.data.roomState}));
  }

  update(e, action) {
    e.preventDefault();
    let data = {
      type: action,
      room: this.state.room,
      player: this.state.player,
      data: {}
    };

    switch(action) {
      case 'UPDATE_TEAM_MEMBERS':
        data.data.teamProposalArray = this.state.teamProposalArray.split(',');
        break;
      case 'SUBMIT_FOR_VOTE':
        break;
      case 'SUBMIT_TEAM_VOTE':
        data.data.teamVote = this.state.teamVote;
        break;
      case 'REVEAL_TEAM_VOTE':
        break;
      case 'HANDLE_TEAM_VOTE_RESULT':
        break;
      case 'SUBMIT_MISSION_VOTE':
        data.data.missionVote = this.state.missionVote;
        break;
      case 'HANDLE_MISSION_VOTE_RESULT':
        break;
      case 'SUBMIT_ASSASSINATION':
        data.data.assassinationTarget = this.state.assassinationTarget;
      default:
        break;
    }

    axios.post(`${api}/api/update`, data)
  }

  render() {
    return (
      <div style={{display: 'flex', height: '100%', backgroundColor: 'lightgray'}}>
        <div style={{padding: '10px', height: '100%', width: '50%', color: 'black'}}>
          <div>
            <div>HOST: <input onChange={e => this.handleInputChange(e, 'host')} value={this.state.host} /></div>
            <div>ROOM: <input onChange={e => this.handleInputChange(e, 'room')} value={this.state.room}/></div>
            <div>PLAYER: <input onChange={e => this.handleInputChange(e, 'player')} value={this.state.player}/></div>
            <hr />
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <h4>GET ROOM LIST</h4>
              <button onClick={this.getRoomList}>getRoomList</button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <h4>CREATE ROOM</h4>
              <button onClick={this.createRoom}>createRoom</button>
            </div>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'UPDATE_TEAM_MEMBERS')}>
              <h4>ACTION: UPDATE_TEAM_MEMBERS</h4>
              TEAM_PROPOSAL array: <input style={{width: '100%'}} onChange={e => this.handleInputChange(e, 'teamProposalArray')} value={this.state.teamProposalArray} placeholder='comma separated. no spaces. exactly as spelled as the player associated. ex: axel,bob,charlie,david,elliot' />
              <button>UPDATE_TEAM_MEMBERS</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'SUBMIT_FOR_VOTE')}>
              <h4>ACTION: SUBMIT_FOR_VOTE</h4>
              <button>SUBMIT_FOR_VOTE</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'SUBMIT_TEAM_VOTE')}>
              <h4>ACTION: SUBMIT_TEAM_VOTE</h4>
              <select value={this.state.teamVote}
                onChange={e => this.handleInputChange(e, 'teamVote')}>
                {['APPROVE', 'REJECT'].map(el => <option>{el}</option>)}
              </select>
              <button>SUBMIT_TEAM_VOTE</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'REVEAL_TEAM_VOTE')}>
              <h4>ACTION: REVEAL_TEAM_VOTE</h4>
              <button>REVEAL_TEAM_VOTE</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'HANDLE_TEAM_VOTE_RESULT')}>
              <h4>ACTION: HANDLE_TEAM_VOTE_RESULT</h4>
              <button>HANDLE_TEAM_VOTE_RESULT</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'SUBMIT_MISSION_VOTE')}>
              <h4>ACTION: SUBMIT_MISSION_VOTE</h4>
              <select value={this.state.missionVote}
                onChange={e => this.handleInputChange(e, 'missionVote')}>
                {['SUCCESS', 'FAIL', 'REVERSE'].map(el => <option>{el}</option>)}
              </select>
              <button>SUBMIT_MISSION_VOTE</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'HANDLE_MISSION_VOTE_RESULT')}>
              <h4>ACTION: HANDLE_MISSION_VOTE_RESULT</h4>
              <button>HANDLE_MISSION_VOTE_RESULT</button>
            </form>
            <form style={{display: 'flex', flexDirection: 'column'}}
              onSubmit={(e) => this.update(e, 'SUBMIT_ASSASSINATION')}>
              <h4>ACTION: SUBMIT_ASSASSINATION</h4>
              ASSASSINATION TARGET:
              <input onChange={e => this.handleInputChange(e, 'assassinationTarget')} value={this.state.assassinationTarget} placeholder='assassination target. exactly as spelled as the player associated. ex: axel'/>
              <button>SUBMIT_ASSASSINATION</button>
            </form>
          </div>
        </div>
        <div style={{padding: '10px', height: '100%', width: '50%', borderLeft: '1px solid black', overflowY: 'scroll'}}>
          <pre style={{color: 'black'}}>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    )
  }
}
