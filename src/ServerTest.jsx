import React from 'react';
import axios from 'axios';

const api = 'http://localhost:5000'

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
      player: 'wilson'
    }

    this.createRoom = this.createRoom.bind(this);
    this.update = this.update.bind(this);
  }

  createRoom() {
    axios.post(`${api}/api/createRoom`, {data: {
      type: 'CREATE_ROOM',
      settings: FESettingsObj,
      host: 'wilson'
    }})
      .then(res => console.log(res));
  }

  update(action) {
    let data = {};
    data.type = action;

    axios.post(`${api}/api/update`, data)
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <button onClick={() => this.createRoom()}>createRoom</button>
      </div>
    )
  }
}