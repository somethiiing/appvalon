import React from 'react';
import Player from './Player';

function KingOrder(props) {
  const {kingOrder, players, proposedTeam, roomState} = props;

  function getPlayerComponent(player, roomState) {
    const {isHammer = false, isKing = false, teamVote = false} = players[player];
    return (
        <Player
            name={player}
            king={isKing}
            hammer={isHammer}
            selected={proposedTeam.includes(player)}
            teamVote={teamVote}
            roomState={roomState}
        />
    )
  }
  return (
    <div className="KingOrder">
      {kingOrder.map((player) => {
        return getPlayerComponent(player, roomState)
      })}
    </div>
  );
}

export default KingOrder;
