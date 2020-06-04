import React from 'react';
import Player from '../../../Base/Player';
import Card from '../../../Base/Card';
import Button from '../../../Base/Button';
import {
  dispatchSubmitTeamVote,
  dispatchRevealTeamVote
} from '../../../../ApiUtils';

class TeamVote extends React.Component {
  dispatchTeamVote = (vote) => {
    dispatchSubmitTeamVote({
      room: this.props.roomState.roomName,
      player: this.props.name,
      teamVote: vote
    });
  };

  showVoteResult = () => {
    dispatchRevealTeamVote({
      room: this.props.roomState.roomName,
      player: this.props.name
    });
  };

  render() {
    const { roomState, name } = this.props;
    if (!roomState) {
      return null;
    }
    const { players = {}, proposedTeam } = roomState;
    const isKing = players[name] && players[name].isKing;
    const anyNotVoted =
      this.props.roomState.kingOrder.filter(
        (player) => players[player].teamVote === 'NOT_VOTED'
      ).length !== 0;

    return (
      <div>
        {proposedTeam.map((name) => {
          return (
            <Player
              key={name}
              name={name}
              selected={proposedTeam.includes(name)}
              hue={players[name].hue}
            />
          );
        })}
        <div className='Card-list'>
          <form>
            <Card
              type='approve'
              inputType={'radio'}
              inputName={'votes'}
              onClick={() => this.dispatchTeamVote('APPROVE')}
            />
            <Card
              type='reject'
              inputType={'radio'}
              inputName={'votes'}
              onClick={() => this.dispatchTeamVote('REJECT')}
            />
          </form>
        </div>
        {isKing && (
          <Button onClick={this.showVoteResult} disabled={anyNotVoted}>
            Reveal Votes
          </Button>
        )}
      </div>
    );
  }
}

export default TeamVote;
