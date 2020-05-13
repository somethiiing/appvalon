import React from 'react';
import Player from './Player';

function KingOrder(props) {
  const { kingOrder, players, proposedTeam } = props;
  console.log(kingOrder, players, proposedTeam);

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
      {/* map king order list to player display, using players.isKing and isHammer for icons */}
      {kingOrder.map((player) => {return getPlayerComponent(player)})}
    </div>
  );
}

//    "alex": {
    //   "role": "mordred",
    //   "name": "alex",
    //   "sees": {
    //     "morgana": {
    //       "role": "morgana",
    //       "alignment": "evil",
    //       "knowsRole": false,
    //       "players": {
    //         "assigned": [
    //           "jason"
    //         ]
    //       }
    //     }
    //   },
    //   "isKing": true
    // },
export default KingOrder;
