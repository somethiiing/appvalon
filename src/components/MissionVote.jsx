import React from 'react';
import Card from './Card';
import { dispatchSubmitMissionVote } from '../ApiUtils';
import { throttle } from '../utils';

class MissionVote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // visually disable both buttons
    // put gold border on your vote and dim the other one
    const { name, room } = this.props;
    return (
      <div className='MissionVote'>
        <Card type='success' onClick={() => dispatchSubmitMissionVote({room, player: name, missionVote: 'SUCCESS'})}/>
        <Card type='fail' onClick={() => dispatchSubmitMissionVote({room, player: name, missionVote: 'FAIL'})}/>
      </div>
    );
  }
}

export default MissionVote;
