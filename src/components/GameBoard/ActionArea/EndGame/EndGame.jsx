import React from 'react';
import Button from '../../../Base/Button';

const renderGoodWin = () => {
  return <div>Good wins! Arthur and Goodness prevail!</div>
}

const renderEvilWin = () => {
  return <div>Bad wins! Mordred's dark forces of Evil triumph!</div>
}

function EndGame (props) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {props.status === 'GOOD_WIN' && renderGoodWin()}
      {props.status === 'EVIL_WIN' && renderEvilWin()}
      <div style={{width: '100%'}}><Button onClick={window.exitGame}>Exit Game</Button></div>
    </div>
  )
}
export default EndGame;
