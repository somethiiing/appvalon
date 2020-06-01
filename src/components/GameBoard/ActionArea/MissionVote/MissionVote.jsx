import React from 'react';
import Card from '../../../Base/Card';
import './MissionVote.css';
import { dispatchSubmitMissionVote } from '../../../../ApiUtils';

class MissionVote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableButtons: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(vote) {
    const { name, room } = this.props;
    this.setState({
      disableButtons: true
    });
    dispatchSubmitMissionVote({ room, player: name, missionVote: vote });
  }

  render() {
    const { name, roomState } = this.props;
    const players = roomState.players;
    const isGood = players[name].alignment === 'good';
    return (
      <div className='MissionVote'>
        <Card
          type='success'
          disabled={this.state.disableButtons}
          inputType={'checkbox'}
          inputName={'success'}
          onClick={() => this.handleClick('SUCCESS')}
        />
        <Card
          type='fail'
          disabled={isGood || this.state.disableButtons}
          inputType={'checkbox'}
          inputName={'fail'}
          onClick={() => this.handleClick('FAIL')}
        />
      </div>
    );
  }
}

export default MissionVote;
