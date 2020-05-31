import React from 'react';

import KingProposalView from './TeamProposal/KingProposalView';
import NonKingProposalView from './TeamProposal/NonKingProposalView';
import TeamVote from './TeamProposal/TeamVote';
import TeamVoteResultView from './TeamProposal/TeamVoteResultView';
import MissionVote from './MissionVote/MissionVote';
import MissionResultView from './MissionVote/MissionResultView';
import Assassination from './EndGame/Assassination';
import EndGame from './EndGame/EndGame';
import { P } from '../../Base/Text';

import './ActionArea.css';

class ActionArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.renderActions = this.renderActions.bind(this);
  }

  renderActions() {
    const { name, room, roomState = {} } = this.props;
    const { status = '', players = [], proposedTeam = [] } = roomState;
    if (!players[name]) {
      return null;
    }
    switch (status) {
      case 'TEAM_PROPOSAL':
        if (players[name].isKing) {
          return <KingProposalView roomState={roomState} name={name} />;
        } else {
          return <NonKingProposalView roomState={roomState} name={name} />;
        }
      case 'TEAM_VOTE':
        return <TeamVote roomState={roomState} name={name} />;
      case 'DISPLAY_TEAM_VOTE':
        return (
          <TeamVoteResultView roomState={roomState} name={name} room={room} />
        );
      case 'MISSION_VOTE':
        if (proposedTeam.includes(name)) {
          return <MissionVote name={name} room={room} roomState={roomState} />;
        } else {
          return <P>Please wait while the mission is going</P>;
        }
      case 'DISPLAY_MISSION_VOTE':
        return <MissionResultView boardState={roomState} name={name} />;
      case 'ASSASSINATION':
        return <Assassination roomState={roomState} name={name} />;
      case 'EVIL_WIN':
      case 'GOOD_WIN':
        return <EndGame roomState={roomState} />;
      default:
        break;
    }
  }

  render() {
    return <div className="ActionArea">{this.renderActions()}</div>;
  }
}

export default ActionArea;
