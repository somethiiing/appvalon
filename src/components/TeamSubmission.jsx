import React from 'react';
import Player from "./Player";
import {Heading, Sub} from "./Text";
import Button from "./Button";
import {dispatchSubmitForVote, dispatchSubmitTeamVote, dispatchUpdateTeamMembers} from "../ApiUtils";

const api = 'http://localhost:5000'

let socket;

const in_progress = {
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'WAITING_FOR_PLAYERS',
    createdAt: 0,
    playerCount: 5,
    lakeSettings: 'NONE',
    selectedRoles: ['merlin', 'percival', 'genericGood', 'mordred', 'morgana'],
    players: [{
        name: 'alex',
        isKing: true,
        isLake: false
    }, {
        name: 'wilson',
        isKing: false,
        isLake: false
    }, {
        name: 'bridget',
        isKing: false,
        isLake: true
    }],
    boardInfo: {
        playerCount: 5,
        numGood: 3,
        numEvil: 2,
        doubleFailRequired: false,
        missions: [{
            count: 1,
            size: 2,
            status: 'NOT_GONE'
        },
            {
                count: 2,
                size: 3,
                status: 'NOT_GONE'
            },
            {
                count: 3,
                size: 3,
                status: 'NOT_GONE'
            },
            {
                count: 4,
                size: 2,
                status: 'NOT_GONE'
            },
            {
                count: 5,
                size: 3,
                status: 'NOT_GONE'
            }
        ]
    },
    kingOrder: ['alex', 'bridget', 'chris', 'david', 'elliot'],
    currentMission: 1,
    voteTrack: 1,
    proposedTeam: [],
    teamVoteResults: null,
    missionVote: ['SUCCESS', 'FAIL', 'SUCCESS', 'SUCCESS']
}

export class TeamSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamProposalArray: [],
            teamVote: 'REJECT',
            missionVote: 'SUCCESS',
            roomList: [],
            roomState: in_progress,
        }
        this.updateTeamProposal = this.updateTeamProposal.bind(this);
    }

    //todo add validity for number of candidates
    // add highlight on click action
    // update and send action to server for vote

    getKing = () => {
        const players = this.state.roomState.players;
        for (let player in players) {
            //possible iteration over unexpected members blah blah
            if (player.king) {
                return player.name;
            }
        }
    }

    getPlayer = () => {
        const players = this.state.roomState.players;
        const name = this.state.name;
        for (let player in players) {
            //possible iteration over unexpected members blah blah
            if (player.name === name) {
                return player;
            }
        }
    }

    voteSubmit = () => {
        //does this just need a player name?
        const player = this.getPlayer();
        const room = this.state.roomState;
        dispatchSubmitForVote({room, player})
            .then(res => {
                console.log(res)
            });
    }

    updateTeamProposal(candidate) {
        const player = this.getPlayer();
        const room = this.state.roomState;
        let teamProposal = this.state.teamProposalArray;
        teamProposal = teamProposal.filter(e => e !== candidate);
        if (teamProposal[candidate]) {
            teamProposal = teamProposal.filter(e => e !== candidate);
        } else {
            teamProposal.concat(candidate);
        }
        dispatchUpdateTeamMembers({player, room, teamProposal})
            .then(res => {
                console.log(res)
            });
        this.setState({
            teamProposalArray: teamProposal
        })
    }

    render() {
        const currentKing = this.getKing();
        const teamProposalArray = this.state.teamProposalArray;
        console.log(currentKing);
        return (
            <div>
                {JSON.stringify(this.props.boardState)}
                <Heading>{this.props.name}, select candidates for your mission. </Heading>
                {this.state.roomState.players.map(player => {
                    return <Player name={player.name} selected={teamProposalArray[player.name]}
                                   onClick={this.updateTeamProposal(player.name)}/>
                })}
                <Button onClick={this.voteSubmit}>Submit For Vote</Button>
            </div>
        );
    }
}