import React from 'react';
import KingOrder from './KingOrder';
import Missions from './Missions';
import ActionArea from './ActionArea';

function Board(props) {
  return (
    <div className="Board">
      {<div>PROPS: {props.name} {props.room}</div>}
      <KingOrder />
      <Missions />
      <ActionArea />
    </div>
  );
}

export default Board;
