import React from 'react';
import './Mission.css';

function Mission(props) {
  const {
    success,
    fail,
    active,
    size,
    voteTrack,
    maxVoteTrack,
    doubleFail
  } = props;
  return (
    <div className={`Mission-wrapper ${active ? 'active' : ''}`}>
      {doubleFail && (
        <span className="Mission-double-fail">2 Fails Required</span>
      )}
      <div
        className={`Mission ${success ? 'success' : ''} ${fail ? 'fail' : ''}`}
      >
        {size}
      </div>
      {active && (
        <div
          className={`Mission-tracker ${
            voteTrack === maxVoteTrack ? 'hammer-vote' : ''
          }`}
        >
          {voteTrack}/{maxVoteTrack}
        </div>
      )}
    </div>
  );
}

export default Mission;
