import React from 'react';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';

function Board() {
  return (
    <div className="Board">
      <KingOrder />
      <Missions />
      <ActionArea />
    </div>
  );
}

export default Board;
