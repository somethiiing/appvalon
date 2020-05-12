import React from 'react';
import './App.css';
import './components/styles.css';
import Header from './components/Header';
import Mission from './components/Mission';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <Header />
      {
        // the below is for testing component purposes
      }
      <Mission fail count={2} />
      <Mission pass count={3} />
      <Mission active missionCount={4} count={3} />
      <Mission doubleFail count={4} />
      <Mission count={3} />

      <Card type='approve' />
      <Card type='reject' />
      <Card type='pass' />
      <Card type='fail' />
    </div>
  );
}

export default App;
