import React from 'react';
import Button from '../../../Base/Button';

const renderGoodWin = () => {
  return <div>Good wins! Arthur and Goodness prevail!</div>;
};

const renderEvilWin = () => {
  return <div>Bad wins! Mordred's dark forces of Evil triumph!</div>;
};

function EndGame(props) {
  const { roomState } = props;
  return (
    <div className="EndGame">
      {roomState.status === 'GOOD_WIN' && renderGoodWin()}
      {roomState.status === 'EVIL_WIN' && renderEvilWin()}
      <Button onClick={window.exitGame}>Exit Game</Button>
    </div>
  );
}
export default EndGame;
