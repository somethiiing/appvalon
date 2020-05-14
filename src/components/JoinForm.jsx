import React from 'react';
import io from 'socket.io-client';

import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from './Button';

import { fetchRoomList, joinRoom } from '../ApiUtils';
import { setRelogToken } from '../utils';

let socket;

let api = '';

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
    socket = io(`${api}/`);
    socket.on('UPDATE_ROOMLIST', res => this.setState({
      roomList: res.roomList.reverse(), room: res.roomList[0]
    }));

    this.fetchRoomList();
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  fetchRoomList() {
    fetchRoomList()
      .then( res => {
        this.setState({roomList: res.data.roomList.reverse(), room: res.data.roomList[0]});

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
