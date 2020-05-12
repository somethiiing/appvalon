import React from 'react';

function Mission(props) {
  const { pass, fail, active, count, missionCount, doubleFail } = props;
  return (
    <div className={`Mission-wrapper ${active ? 'active' : ''}`}>
      {doubleFail && 
        <span className="Mission-double-fail">Double Fail</span>
      }
      <div className={`Mission ${pass ? 'pass' : ''} ${fail ? 'fail' : ''}`}>
        {count}
      </div>
      {active && 
        <div className={`Mission-tracker ${missionCount === 5 ? 'hammer-vote' : ''}`}>
          {missionCount}/5
        </div>
      }
    </div>
  );
}

export default Mission;
