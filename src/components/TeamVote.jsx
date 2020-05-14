import React from 'react';
import Player from "./Player";
import Card from "./Card";
import {dispatchSubmitTeamVote} from "../ApiUtils";
import Button from "./Button";

class TeamVote extends React.Component {

    dispatchTeamVote = (vote) => {
        dispatchSubmitTeamVote({
            player: this.props.roomState.roomName,
            vote: this.props.name,
            teamVote: vote
        }).then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        })
    }

    showVoteResult() {
        dispatchRevealTeamVote = ({room: this.props.roomState.roomName, player: this.props.name}).then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        const teamProposalArray = this.props.roomState.proposedTeam;
        const isKing = this.props.name === this.props.roomState.kingOrder[0];
        // const isKing =  this.props.roomState.players.filter(e => e !== candidate);
        return (
            <div>
                {teamProposalArray.map(name => {
                    return <Player key={name} name={name} selected={teamProposalArray.includes(name)}/>
                })}
                <div className='Card-list'>
                    <Card type='approve' onClick={() => this.dispatchTeamVote('APPROVE')}/>
                    <Card type='reject' onClick={() => this.dispatchTeamVote('REJECT')}/>
                </div>
                {isKing && <Button onClick={this.showVoteResult}/>}
            </div>
        );
    }
}

export default TeamVote