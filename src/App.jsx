import React from 'react';
import './App.css';
import './components/styles.css';
import Header from './components/Header';
import Mission from './components/Mission';

function App() {
  return (
    <div className="App">
      <Header />
      {
        // the below is for testing component purposes
      }
      <Mission fail count={2} />
      <Mission pass count={3} />
      <Mission active count={3} />
      <Mission count={3} />
      <Mission count={3} />
    </div>
  );
}

export default App;
