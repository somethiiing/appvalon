import React from 'react';
import Button from './Button';

const renderGoodWin = () => {
  return <div>Good wins! Arthur and Goodness prevails!</div>
}

const renderEvilWin = () => {
  return <div>Bad wins! Mordred's dark forces of evil triumphs!</div>
}

export default (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {props.status === 'GOOD_WIN' && this.renderGoodWin()}
      {props.status === 'EVIL_WIN' && this.renderEvilWin()}
      <div style={{width: '2rems'}}><Button onClick={props.exitGame}>Exit Game</Button></div>
    </div>
  )
}