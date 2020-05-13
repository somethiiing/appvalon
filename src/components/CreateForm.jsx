import React from 'react';
import { createRoom } from '../ApiUtils';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    // props: handleSubmit
    this.state = {
      name: '',
      settings: {},
      lakeSetting: 'NONE'
    }
  }

  constructSettingsObj() {
    // take in the relevant this.state properties to return a settings object that looks like this:
    // const FESettingsObj = {
    //   playerCount: 5,
    //   selectedRoles: {
    //     merlin: true, //bool
    //     percival: true, //bool
    //     tristan: false, //bool
    //     iseult: false, //bool
    //     genericGood: true, //bool
    //     numGenGood: 2, //num
    
    //     assassin: true, //bool
    //     mordred: true, //bool
    //     morgana: true, //bool
    //     oberon: false, //bool
    //     noberon: false, //bool
    //     genericEvil: false, //bool
    //     numGenEvil: 0 //num
    //   },
    //   lakeSetting: 'ROLE', // ROLE, ALIGNMENT, NONE
    // }
    // return settings object
  }

  handleOnSubmit() {
    createRoom({settings: constructSettingsObj(), host: this.state.name})
      .then( res => {
        const { room, host } = res.data;
        this.props.handleSubmit({name: host, room})
      })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        {/* NAME FORM */}
        {/* SETTINGS FORM */}
        {/* LAKE SETTINGS*/}
        <button>submit</button>
      </form>
    );
  }
};
