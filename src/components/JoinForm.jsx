import React from 'react';
// import Button from './Button';
import TextField from "@material-ui/core/TextField";
import Button from './Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { fetchRoomList, joinRoom } from '../ApiUtils';
import { setRelogToken } from '../utils';

export default class JoinForm extends React.Component {
  constructor(props) {
    super(props);

    // props
    // handleSubmit: function, params: {status: SUCCESS/FULL, name: string, room: string}

    this.state = {
      room: '',
      name: '',
      roomList: []
    };

    this.fetchRoomList = this.fetchRoomList.bind(this);
  }

  componentDidMount() {
    this.fetchRoomList();
  }

  fetchRoomList() {
    fetchRoomList()
      .then( res => {
        this.setState({roomList: res.data.roomList, room: res.data.roomList[0]});

        const previousRoom = window.localStorage.getItem('room');
        if(res.data.roomList.includes(previousRoom)) {
          const previousName = window.localStorage.getItem('name');
          this.props.handleSubmit({status: 'SUCCESS', room: previousRoom, name: previousName});
        }
      });
  }

  onChangeHandler = (e) => {
    let field = e.target.name;
    let val = e.target.value;
    this.setState({[field]: val});
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const {name, room} = this.state;
    joinRoom({name, room})
      .then( res => {
        const { status } = res.data;
        this.props.handleSubmit({status, name, room})
        setRelogToken({player: name, room});
      });
  }

  render() {
    return (
      <div>
        <Button onClick={this.fetchRoomList}>Refresh Room List</Button>
        <div>
          <form className='Join-room' onSubmit={this.onSubmitHandler}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              onChange={this.onChangeHandler}
            />
            <Select
              name='room'
              value={this.state.room}
              onChange={this.onChangeHandler}
            >
              {this.state.roomList.map(room => {
                return <MenuItem key={room} value={room}>{room}</MenuItem>
              })}
            </Select>
            {/*Not sure which style to do here but I'm gonna leave it as is*/}
            <Button type='submit' className='Button'>Join Room</Button>
          </form>
        </div>
      </div>
    );
  }
}
