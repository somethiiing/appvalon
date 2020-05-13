import React from 'react';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

import './App.css';
import './components/styles.css';

import Header from './components/Header';
import Mission from './components/Mission';
import Player from './components/Player';
import Card from './components/Card';
import JoinForm from './components/JoinForm';

function App() {
    const theme =
        createMuiTheme({
                palette: {
                    type: 'dark',
                },
            }
        );
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Header/>
                {
                    // the below is for testing component purposes
                }
                <Mission fail size={2}/>
                <Mission success size={3}/>
                <Mission active voteTrack={2} size={3}/>
                <Mission size={3}/>
                <Mission size={3}/>
                <Card type='approve' />
                <Card type='reject' />
                <Card type='success' />
                <Card type='fail' />

                <Player selected teamVote='reject' name='Bridget' />
                <Player king name='Alexandra' />
                <Player selected hammer name='Wilson' />
                <Player king teamVote='approve' hammer name='Mehtab' />
                <JoinForm/>
            </ThemeProvider>
        </div>
    );
}

export default App;
