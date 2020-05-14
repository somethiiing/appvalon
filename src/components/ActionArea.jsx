import React from 'react';

class ActionArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    // this.props.roomObj = roomObj
    // this.props.name = name
  }

  renderActions() {
    const { name, roomObj } = this.props;
    const { status, players } = roomObj;
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
    return (
      <div className='ActionArea'>

      </div>
    );
  }
}

export default ActionArea;
