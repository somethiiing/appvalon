import React from 'react';
import Player from '../../../Base/Player';
import { Heading } from '../../../Base/Text';
import Button from '../../../Base/Button';
import { dispatchSubmitAssassination } from '../../../../ApiUtils';
import Timer from '../../../Base/Timer';

export default class Assassination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '',
      candidates: []
    };
  }

  submitAssassination = () => {
    const playerName = this.props.name;
    const roomName = this.props.roomState.roomName;
    dispatchSubmitAssassination({
      room: roomName,
      player: playerName,
      assassinationTarget: this.state.target
    });
  };

  updateTarget(candidate) {
    let target = this.state.target;
    if (target === candidate) {
      target = '';
    } else {
      target = candidate;
    }
    this.setState({
      target: target
    });
  }

  componentDidMount() {
    const players = this.props.roomState.players;
    const candidates = Object.keys(players).filter((name) =>
      /good/.test(players[name].alignment)
    );
    this.setState({
      candidates: candidates
    });
  }

  render() {
    const disabled = this.state.target === '';
    const target = this.state.target;
    const candidates = this.state.candidates;
    const players = this.props.roomState.players;
    // if there is no assassin in the game, other roles may act as the assassin
    const isAssassin = this.props.name === this.props.roomState.assassin;
    return (
      <React.Fragment>
        {isAssassin && (
          <div className='LayoutGroup LayoutGroup--KingProposalView'>
            <Heading>
              {this.props.name}, select a target to assassinate as Merlin.
            </Heading>
            <div className='PlayerGroup PlayerGroup--KingView'>
              {candidates.map((name) => {
                return (
                  <Player
                    key={name}
                    name={name}
                    selected={target === name}
                    onClick={() => this.updateTarget(name)}
                    hue={players[name].hue}
                  />
                );
              })}
            </div>
            <Button
              type='button'
              onClick={this.submitAssassination}
              disabled={disabled}
            >
              Attempt Assassination
            </Button>
          </div>
        )}
        <Timer />
      </React.Fragment>
    );
  }
}
