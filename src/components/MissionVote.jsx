import React from 'react';
import Card from './Card';
import {dispatchSubmitMissionVote} from '../ApiUtils';
import {throttle} from '../utils';

class MissionVote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableButtons: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(vote) {
    const {name, room, roomState} = this.props;
    const players = roomState.players
    this.setState({
      disableButtons: true
    });
    dispatchSubmitMissionVote({room, player: name, missionVote: vote});
  }

  render() {
    const {name, roomState} = this.props;
    const players = roomState.players;
    const isGood = players[name].alignment;
    return (
        <div className='MissionVote'>
          <Card type='success' disabled={this.state.disableButtons} onClick={() => this.handleClick('SUCCESS')}/>
          <Card type='fail' disabled={isGood || this.state.disableButtons} onClick={() => this.handleClick('FAIL')}/>
        </div>
    );
  }
}

export default MissionVote;
