import React from 'react';

function Mission(props) {
  const { success, fail, active, size, voteTrack, doubleFail } = props;
  return (
    <div className={`Mission-wrapper ${active ? 'active' : ''}`}>
      {doubleFail && 
        <span className="Mission-double-fail">2 Fails Required</span>
      }
      <div className={`Mission ${success ? 'success' : ''} ${fail ? 'fail' : ''}`}>
        {size}
      </div>
      {active && 
        <div className={`Mission-tracker ${voteTrack === 5 ? 'hammer-vote' : ''}`}>
          {voteTrack}/5
        </div>
      }
    </div>
  );
}

export default Mission;
