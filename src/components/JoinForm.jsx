import React from 'react';
import Button from './Button';
export default class JoinForm extends React.Component {
    /**
     * 
     * @param {Join Room Page // page: join_room
  - Join as spectator
  - text box for room code
  - Action: ADD_SPECTATOR
- Form:
  - text box for room code
  - text box for your name
  - submit/join room button
    - onsubmit
      - check room code validity
        - check name for duplicate
          - player joins room
          - Action: ADD_PLAYER} props 
     */
    constructor(props) {
      super(props);
      this.state = {
        roomCode: '',
        name: null,
        validity:false,
        dupe: true
      };
    }
    onChangeHandler = (e) => {
      let field = e.target.name;
      let val = e.target.value;
      this.setState({[field]: val});
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        //TODO: add logic here 

    }
    render() {
      return (
        <form>
        <p>Enter your name:</p>
        <input
          type='text'
          name='name'
          label='Enter your name'
          onChange={this.onChangeHandler}
        />
        <p>Enter the room code:</p>
        <input
          type='text'
          name='roomCode'
          onChange={this.onChangeHandler}
        />
        <Button>Join</Button>
        </form>
      );
    }
  }