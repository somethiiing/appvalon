import React from 'react';
import Player from '../Base/Player';

function KingOrder(props) {
  const {kingOrder, players, proposedTeam, roomState} = props;

  function getPlayerComponent(player, roomState) {
    if (!players[player]) {
      return <span></span>;
    }
    const {isHammer = false, isKing = false, teamVote = false, hue = 1} = players[player];
    return (
        <Player
            name={player}
            king={isKing}
            hammer={isHammer}
            selected={proposedTeam.includes(player)}
            teamVote={teamVote}
            roomState={roomState}
            hue={hue}
            key={player}
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
