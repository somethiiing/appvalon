import React from 'react';
import './App.css';
import './components/styles.css';
import Header from './components/Header';
import Mission from './components/Mission';
import Card from './components/Card';
import Player from './components/Player';

function App() {
  return (
    <div className="App">
      <Header />
      {
        // the below is for testing component purposes
      }
      <Mission fail size={2} />
      <Mission pass size={3} />
      <Mission active voteTrack={4} size={3} />
      <Mission doubleFail size={4} />
      <Mission size={3} />

      <Card type='approve' />
      <Card type='reject' />
      <Card type='pass' />
      <Card type='fail' />

      <Player selected name='Bridget' />
      <Player king name='Alexandra' />
      <Player selected hammer name='Wilson' />
      <Player king hammer name='Mehtab' />
    </div>
  );
}

export default App;
