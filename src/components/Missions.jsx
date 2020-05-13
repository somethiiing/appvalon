import React from 'react';
import Mission from './Mission';

function Missions(props) {
  const { currentMission, boardInfo, voteTrack } = props;

  function getMissionComponent(mission) {
    console.log('things', mission)
    const { doubleFailRequired } = boardInfo;
    const { count, size, status, maxVoteTrack } = mission;
    const isSuccess = status === 'SUCCESS';
    const isFail = status === 'FAIL';
    const isCurrentMission = currentMission === count;
    const isDoubleFail = doubleFailRequired && (count === 4);

    return (
      <Mission
        success={isSuccess}
        fail={isFail}
        active={isCurrentMission}
        size={size}
        voteTrack={voteTrack}
        maxVoteTrack={maxVoteTrack}
        doubleFail={isDoubleFail}
      />
    );
  }
  //const { success, fail, active, size, voteTrack, doubleFail } = props;
  return (
    <div className="Missions">
      {boardInfo.missions.map((mission) => {return getMissionComponent(mission)})}
    </div>
  );
}

export default Missions;
