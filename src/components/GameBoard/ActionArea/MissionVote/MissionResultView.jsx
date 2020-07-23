import React from 'react';
import { P } from '../../../Base/Text';
import Button from '../../../Base/Button';
import Card from '../../../Base/Card';
import { dispatchHandleMissionVoteResult } from '../../../../ApiUtils';

function MissionResultView(props) {
  const { room, name, roomState } = props;
  const { currentMission, missionVote, kingOrder, players } = roomState;
  const { success, fail } = missionVote;

  const onClick = () => {
    dispatchHandleMissionVoteResult({
      room: room,
      player: name,
      currentMission
    });
  };

  const renderCards = () => {
    const cards = [];

    for (let i = 0; i < success; i++) {
      cards.push(<Card disabled type='success' />);
    }

    for (let i = 0; i < fail; i++) {
      cards.push(<Card disabled type='fail' />);
    }

    return cards;
  };

  if (success + fail === 0) {
    return null;
  }

  const currentKing = Object.values(players).find((player) => player.isKing);
  const nextKingIndex =
    (kingOrder.indexOf(currentKing.name) + 1) % kingOrder.length;
  const nextKing = kingOrder[nextKingIndex];

  return (
    <div className='Mission-Result'>
      <P>Results for Mission #{currentMission}</P>
      <div className='Card-list'>{renderCards()}</div>
      {name === nextKing && <Button onClick={onClick}>Continue</Button>}
    </div>
  );
}

export default MissionResultView;
