import React from 'react';

import { Sub, Bold as Highlight, P } from '../Text';
// TODO use HighlightSameLine

function RoleInfoTab(props) {
  const { name, room } = props;
  const currentPlayer = room && room.players && room.players[name];

  if (room.status === 'WAITING_FOR_PLAYERS') {
    return <P>Your role info will be shown here when everyone has joined.</P>;
  }

  let roleInfo = `${room.players.name}, you are ${
    currentPlayer.role === 'genericGood' ? 'Generic Good' : currentPlayer.role
  }. You are ${currentPlayer.alignment || 'neutral'}.`;

  if (currentPlayer.role === 'genericGood') {
    roleInfo = `${name}, you are Generic Good.`;
  } else {
    roleInfo = (
      <Sub>
        {name}, you are {currentPlayer.role}. You are{' '}
        <span
          className={`${currentPlayer.alignment === 'evil' ? 'red' : 'blue'}`}
        >
          {currentPlayer.alignment}
        </span>
        .
      </Sub>
    );
  }

  const sees = currentPlayer.sees;
  let seeInfo = [];
  let seeData = [];

  seeInfo.push(roleInfo);

  Object.values(sees).forEach((value) => {
    const person = value.players.assigned[0];
    const alignment = value.alignment;
    seeData.push({
      name: person,
      alignment
    });
  });

  seeData.map(({ name, alignment }) => {
    let info;
    switch (currentPlayer.role) {
      case 'merlin':
        info = (
          <Sub>
            <Highlight>{name}</Highlight> is{' '}
            <span className='red'>{alignment}</span>.
          </Sub>
        );
        break;
      case 'percival':
        info = (
          <Sub>
            <Highlight>{name}</Highlight> is{' '}
            <span className='blue'>Merlin</span> or{' '}
            <span className='red'>Morgana</span>.
          </Sub>
        );
        break;
      case 'mordred':
        info = (
          <Sub>
            <Highlight>{name}</Highlight> is also{' '}
            <span className='red'>{alignment}</span>.
          </Sub>
        );
        break;
      case 'morgana':
        info = (
          <Sub>
            <Highlight>{name}</Highlight> is also{' '}
            <span className='red'>{alignment}</span>.
          </Sub>
        );
        break;
      case 'assassin':
        info = (
          <Sub>
            <Highlight>{name}</Highlight> is also{' '}
            <span className='red'>{alignment}</span>.
          </Sub>
        );
        break;
      default:
        break;
    }
    seeInfo.push(info);
    //TODO return instead of push?
  });

  let noteInfo;
  switch (currentPlayer.role) {
    case 'merlin':
      noteInfo = <Sub>Note: You do not see Mordred.</Sub>;
      break;
    case 'percival':
      noteInfo = (
        <Sub>
          Note: These two names are Merlin and Morgana, but you do not know who
          is which role.
        </Sub>
      );
      break;
    case 'mordred':
      noteInfo = <Sub>Note: You are hidden from Merlin.</Sub>;
      break;
    case 'morgana':
      noteInfo = (
        <Sub>
          You appear as a potential Merlin to Percival You are visible to
          Merlin.
        </Sub>
      );
      break;
    case 'assassin':
      noteInfo = (
        <Sub>
          You have the final say in assasinating Merlin if Good wins. You are
          visible to Merlin.
        </Sub>
      );
      break;
    case 'oberon':
      noteInfo = (
        <Sub>
          You are not visible to your evil team mates. You are visible to
          Merlin.
        </Sub>
      );
      break;
    default:
      break;
  }
  seeInfo.push(noteInfo);

  const countNote = (
    <Sub>
      There are {room.boardInfo.numGood} good players and{' '}
      {room.boardInfo.numEvil} evil players.
    </Sub>
  );
  seeInfo.push(countNote);

  return (
    <div>
      {seeInfo.map((info) => {
        if (!info) {
          return null;
        }
        return <div className='Rules-role'>{info}</div>;
      })}
    </div>
  );
}

export default RoleInfoTab;
