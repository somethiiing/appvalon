import React from 'react';

function Mission(props) {
  const { pass, fail, active, count } = props;
  return (
    <div className={`Mission-wrapper ${active ? 'active' : ''}`}>
      <div className={`Mission ${pass ? 'pass' : ''} ${fail ? 'fail' : ''}`}>
        {count}
      </div>
    </div>
  );
}

export default Mission;
