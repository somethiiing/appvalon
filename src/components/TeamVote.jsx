import React from 'react';
import Player from "./Player";
import Card from "./Card";
import {dispatchSubmitTeamVote, dispatchRevealTeamVote} from "../ApiUtils";
import Button from "./Button";

class TeamVote extends React.Component {

    dispatchTeamVote = (vote) => {
        dispatchSubmitTeamVote({
            room: this.props.roomState.roomName,
            player: this.props.name,
            teamVote: vote
        }).then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        })
    }

    showVoteResult = () => {
        dispatchRevealTeamVote({room: this.props.roomState.roomName, player: this.props.name}).then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        })
    }


    render() {
        if (!this.props.roomState) {
            return null;
        }
        const players = this.props.roomState.players;
        const teamProposalArray = this.props.roomState.proposedTeam;
        const isKing = this.props.name === this.props.roomState.kingOrder[0];
        const anyNotVoted = this.props.roomState.kingOrder.filter(player => players[player].teamVote === "NOT_VOTED").length !== 0;

        return (
            <div>
                {teamProposalArray.map(name => {
                    return <Player key={name} name={name} selected={teamProposalArray.includes(name)}
                                   hue={players[name].hue}/>
                })}
                <div className='Card-list'>
                  <form>
                    <Card type='approve' inputType={'radio'} inputName={'votes'} onClick={() => this.dispatchTeamVote('APPROVE')}/>
                    <Card type='reject' inputType={'radio'} inputName={'votes'} onClick={() => this.dispatchTeamVote('REJECT')}/>
                  </form>
                </div>
                {isKing && <Button onClick={this.showVoteResult} disabled={anyNotVoted}>Reveal Votes</Button>}
            </div>
        );
    }
}

export default TeamVote
