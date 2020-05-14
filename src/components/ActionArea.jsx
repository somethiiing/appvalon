import React from 'react';
import MissionVote from './MissionVote';

class ActionArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    // this.props.roomObj = roomObj
    // this.props.name = name
  }

  renderActions() {
    const { name, room, roomState } = this.props;
    const { status, players } = roomState;
    switch(status) {
      case 'TEAM_PROPOSAL':
        if (players[name].isKing) {

        }
        break;
      case 'TEAM_VOTE':
        if (players[name].isKing) {

        }
        break;
      case 'DISPLAY_TEAM_VOTE':
        if (players[name].isKing) {

        }
        break;
      case 'MISSION_VOTE':
        if (players[name].isKing) {

        }
        break;
      case 'DISPLAY_MISSION_VOTE':
        if (players[name].isKing) {

        }
        break;
      case 'SUBMIT_ASSASSINATION':
        // if assassin
        break;
      default:
        break;
    }
  }

  render() {
    //MissionVote currently here for testing
    const { name, room } = this.props;
    return (
      <div className="ActionArea">
        <MissionVote name={name} room={room} />
      </div>
    );
  }
}

export default ActionArea;
