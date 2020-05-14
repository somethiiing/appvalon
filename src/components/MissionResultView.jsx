import React from 'react';
import { P } from './Text';
import Button from './Button';
import Card from './Card';
import { dispatchHandleMissionVoteResult } from "../ApiUtils";

function MissionResultView(props) {
  const { currentMission, missionVote, kingOrder, roomName } = props.boardState;
  const { success, fail } = missionVote;

  const onClick = () => {
    // enable this when backend doesn't crash
    // dispatchHandleMissionVoteResult(roomName, kingOrder[1]);
  }

  const renderCards = () => {
    const cards = [];

    for (let i = 0; i < success; i++) {
      cards.push(<Card disabled type='success' />)
    }

    for (let i = 0; i < fail; i++) {
      cards.push(<Card disabled type='fail' />)
    }

    return cards;
  }

  if ((success + fail) === 0) {
    return null;
  }

  return (
    <div className="Mission-Result">
      <P>Results for Mission #{currentMission}</P>
      <div className='Card-list'>
        {renderCards()}
      </div>
      {(props.name === kingOrder[1]) && 
        <Button onClick={onClick}>Continue</Button>
      }
    </div>
  );
}

export default MissionResultView;
