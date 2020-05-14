import React from 'react';
import Player from './Player';

function KingOrder(props) {
  const { kingOrder, players, proposedTeam } = props;

  function getPlayerComponent(player) {
    const { isHammer = false, isKing = false, teamVote = false } = players[player];

    return (
      <Player
        name={player}
        king={isKing}
        hammer={isHammer}
        selected={proposedTeam.includes(player)}
        teamVote={teamVote}
      />
    )
  }
  return (
    <div className="KingOrder">
      {kingOrder.map((player) => {return getPlayerComponent(player)})}
    </div>
  );
}

export default KingOrder;
