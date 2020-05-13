import React from 'react';
import './App.css';
import './components/styles.css';
import Header from './components/Header';
import Mission from './components/Mission';
import JoinForm from './components/JoinForm';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";

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
                <Mission fail count={2}/>
                <Mission pass count={3}/>
                <Mission active count={3}/>
                <Mission count={3}/>
                <Mission count={3}/>
                <JoinForm/>
            </ThemeProvider>
        </div>
    );
}

export default App;
