import React from 'react';
import Mission from './Mission';

function Missions(props) {
  const { currentMission, voteTrack, boardInfo } = props.boardState;
  return (
    <div className="Missions">
      <div className='Mission-list'>
        {
          boardInfo.missions.map((mission) => {
            const { size, status, count } = mission;
            return (<Mission 
              success={status === 'SUCCESS'}
              fail={status === 'FAIL'}
              active={currentMission === count}
              voteTrack={voteTrack}
              size={size} 
             />);
          })
        }
      </div>
    </div>
  );
}

export default Missions;
