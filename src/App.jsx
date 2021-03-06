import React from 'react';

import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import CreateRoom from './components/PreGame/CreateRoom';
import JoinRoom from './components/PreGame/JoinRoom';
import Board from './components/GameBoard/Board';

import { Test } from './ServerTest';

import './App.css';
import './components/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // serverTest, componentTest
      // landing, joinRoomPage, createRoomPage, board
      currentPage: 'landing',
      name: '', // set to a valid player from your test data
      room: '' // set to 'mango' for testing
    };

    this.changePage = this.changePage.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  changePage(page) {
    this.setState({ currentPage: page });
  }

  handleJoinRoom({ status, name, room }) {
    if (status === 'SUCCESS') {
      this.setState({ name, room });
      this.changePage('board');
    } else if (status === 'FULL') {
      // handle spectator mode stuff
      alert('room full');
    }
  }

  handleCreateRoom({ name, room }) {
    this.setState({ name, room });
    this.changePage('board');
  }

  exitGame() {
    window.localStorage.clear();
    this.changePage('landing');
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark'
      }
    });

    const { name, room } = this.state;

    window.exitGame = () => this.exitGame();
    window.changePage = (page) => this.changePage(page);
    window.state = () => console.log(this.state);

    return (
      <div className='App'>
        <ThemeProvider theme={theme}>
          {this.state.currentPage === 'landing' && (
            <div>
              {/*<button onClick={() => this.changePage('serverTest')}>SERVER TESTER ONLY</button>*/}
              {/*<button onClick={() => this.changePage('board')}>
                  BOARD TEST
                </button>*/}
              <button onClick={() => this.changePage('joinRoomPage')}>
                JOIN ROOM
              </button>
              <button onClick={() => this.changePage('createRoomPage')}>
                CREATE ROOM
              </button>
            </div>
          )}

          {this.state.currentPage === 'serverTest' && <Test />}
          {this.state.currentPage === 'joinRoomPage' && (
            <JoinRoom handleSubmit={this.handleJoinRoom} />
          )}
          {this.state.currentPage === 'createRoomPage' && (
            <CreateRoom handleSubmit={this.handleCreateRoom} />
          )}
          {this.state.currentPage === 'board' && (
            <Board name={name} room={room} />
          )}
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
