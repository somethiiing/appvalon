import React from 'react';

import './App.css';
import './components/styles.css';

import Header from './components/Header';
import Mission from './components/Mission';
import CreateForm from './components/CreateForm';
import JoinForm from './components/JoinForm';
import Board from './components/Board';
import Player from './components/Player';
import Card from './components/Card';

import { Test } from './ServerTest';

import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // serverTest, componentTest
      // landing, joinRoomPage, createRoomPage, board
      currentPage: 'landing',
      name: '',
      room: ''
    };

    this.changePage = this.changePage.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  changePage(page) {
    this.setState({currentPage: page});
  }

  handleJoinRoom({status, name, room}) {
    if (status === 'SUCCESS') {
      this.setState({name, room});
      this.changePage('board');
    } else if (status === 'FULL' ) {
      // handle spectator mode stuff
      console.log('room full')
    }
  }

  handleCreateRoom({name, room}) {
    this.setState({name, room});
    this.changePage('board');
  }

  exitGame() {
    window.localStorage.clear();
    this.changePage('landing');
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });

    const { name, room } = this.state;

    window.exitGame = () => this.exitGame();
    window.changePage = (page) => this.changePage(page);
    window.state = () => console.log(this.state);

    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          {/* <div>
            <button onClick={() => this.changePage('testing')}>testingComponents</button>
          </div> */}
          {this.state.currentPage === 'landing' &&
          <div>
            <button onClick={() => this.changePage('serverTest')}>SERVER TESTER ONLY</button>
            <button onClick={() => this.changePage('componentTest')}>testingComponents</button>
            <button onClick={() => this.changePage('joinRoomPage')}>JOIN ROOM</button>
            <button onClick={() => this.changePage('createRoomPage')}>CREATE ROOM</button>
          </div>}
          {this.state.currentPage === 'serverTest' && <Test />}
          {this.state.currentPage === 'componentTest' && testingComponents()}
          {this.state.currentPage === 'joinRoomPage' && <JoinForm handleSubmit={this.handleJoinRoom} />}
          {this.state.currentPage === 'createRoomPage' && <CreateForm handleSubmit={this.handleCreateRoom} />}
          {this.state.currentPage === 'board' && <Board name={name} room={room} />}
        </ThemeProvider>
      </div>
    );
  }
}

const testingComponents = () => (
  <div>
    <Header/>
    {
    // the below is for testing component purposes
    }
    <Mission fail size={2}/>
    <Mission success size={3}/>
    <Mission active voteTrack={4} size={2}/>
    <Mission size={3}/>
    <Mission size={3}/>
    <JoinForm/>
    <Card type='success' />
    <Card type='fail' />
    <Card type='approve' />
    <Card type='reject' />
    <Player name='Bridget' king selected />
    <Player name='Wilson' teamVote='reject' hammer />
    <Player name='Alexandra' selected />
    <Player name='Mehtab' king hammer teamVote='approve' />
  </div>
)

export default App;
