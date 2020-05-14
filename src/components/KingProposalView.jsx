import React from 'react';
import Player from "./Player";
import {Heading} from "./Text";
import Button from "./Button";
import {dispatchSubmitForVote, dispatchUpdateTeamMembers} from "../ApiUtils";

//todo add validity for number of candidate
export class KingProposalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamProposalArray: [],
        }
        this.updateTeamProposal = this.updateTeamProposal.bind(this);
    }

    componentDidMount() {
        this.setState({
            teamProposalArray: this.props.roomState.proposedTeam
        })
    }

    //todo add validity for number of candidate

    // getKing = () => {
    //     const players = this.state.roomState.players;
    //     for (let player in players) {
    //         //possible iteration over unexpected members blah blah
    //         if (players[player].isKing) {
    //             return players[player].name;
    //         }
    //     }
    // }

    voteSubmit = () => {
        const playerName = this.props.name;
        const roomName = this.props.roomState.roomName;
        dispatchSubmitForVote({room: roomName, player: playerName})
            .then(res => {
                console.log(res)
            });
    }

    updateTeamProposal(candidate) {
        const playerName = this.props.name;
        const roomName = this.props.roomState.roomName;
        let teamProposal = this.state.teamProposalArray;
        const missionSize = this.props.roomState.boardInfo.missions[this.props.roomState.currentMission].size;
        let valid = false;
        if (teamProposal.includes(candidate)) {
            teamProposal = teamProposal.filter(e => e !== candidate);
            valid = true;
        } else {
            //validate number of picks
            if (teamProposal.length < missionSize) {
                teamProposal = teamProposal.concat(candidate);
                valid = true;
            }
        }
        if (valid) {
            dispatchUpdateTeamMembers({player: playerName, room: roomName, teamProposalArray: teamProposal})
                .then(res => {
                    console.log(res)
                });
            //should setState be removed once this state is being passed in via props?
            // updated state should trigger new render
            this.setState({
                teamProposalArray: teamProposal
            })
        }
    }

    render() {
        const teamProposalArray = this.state.teamProposalArray;
        const kingOrder = this.props.roomState.kingOrder;
        const name = this.props.name;
        const missionSize = this.props.roomState.boardInfo.missions[this.props.roomState.currentMission].size;
        const disabled = missionSize !== teamProposalArray.length
        return (
            <div>
                <Heading>{name}, select {missionSize} candidates for your mission. </Heading>
                {kingOrder.map(name => {
                    return <Player key={name} name={name} selected={teamProposalArray.includes(name)}
                                   onClick={() => this.updateTeamProposal(name)}/>
                })}
                <Button onClick={this.voteSubmit} disabled={disabled}>Submit For Vote</Button>
            </div>
        );
    }
}