import React from 'react';
import Mission from './Mission';
import './MissionList.css';

function Missions(props) {
  const { currentMission, boardInfo, voteTrack } = props.roomState;

  function getMissionComponent(mission) {
    const { doubleFailRequired } = boardInfo;
    const { count, size, status, maxVoteTrack } = mission;
    const isSuccess = status === 'SUCCESS';
    const isFail = status === 'FAIL';
    const isCurrentMission = currentMission === count;
    const isDoubleFail = doubleFailRequired && count === 4;

    return (
      <Mission
        success={isSuccess}
        fail={isFail}
        active={isCurrentMission}
        size={size}
        voteTrack={voteTrack}
        maxVoteTrack={maxVoteTrack}
        doubleFail={isDoubleFail}
        key={`mission-${count}`}
      />
    );
  }

  return (
    <div className="MissionList">
      {boardInfo.missions.map((mission) => {
        return getMissionComponent(mission);
      })}
    </div>
  );
}

export default Missions;
