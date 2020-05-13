import React from 'react';
import Player from "./Player";
import {Heading} from "./Text";
import Button from "./Button";
import {dispatchSubmitForVote, dispatchUpdateTeamMembers} from "../ApiUtils";

const in_progress = {
    "roomName": "mango",
    "roomOwner": "alex",
    "status": "TEAM_PROPOSAL",
    "createdAt": 1589336585126,
    "playerCount": 5,
    "lakeSetting": "NONE",
    "selectedRoles": [],
    "players": {
        "alex": {
            "role": "mordred",
            "name": "alex",
            "sees": {
                "morgana": {
                    "role": "morgana",
                    "alignment": "evil",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "jason"
                        ]
                    }
                }
            },
            "isKing": true
        },
        "wilson": {
            "role": "percival",
            "name": "wilson",
            "sees": {
                "merlin": {
                    "role": "merlin",
                    "alignment": "unknown",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "bridget"
                        ]
                    }
                },
                "morgana": {
                    "role": "morgana",
                    "alignment": "unknown",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "jason"
                        ]
                    }
                }
            }
        },
        "bridget": {
            "role": "merlin",
            "name": "bridget",
            "sees": {
                "morgana": {
                    "role": "morgana",
                    "alignment": "evil",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "jason"
                        ]
                    }
                }
            }
        },
        "jason": {
            "role": "morgana",
            "name": "jason",
            "sees": {
                "mordred": {
                    "role": "mordred",
                    "alignment": "evil",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "alex"
                        ]
                    }
                }
            }
        },
        "ashwin": {
            "role": "genericGood",
            "name": "ashwin",
            "sees": {}
        }
    },
    "boardInfo": {
        "playerCount": 5,
        "numGood": 3,
        "numEvil": 2,
        "doubleFailRequired": false,
        "missions": [
            {
                "count": 1,
                "size": 2,
                "status": "NOT_GONE",
                "maxVoteTrack": 5
            },
            {
                "count": 2,
                "size": 3,
                "status": "NOT_GONE",
                "maxVoteTrack": 5
            },
            {
                "count": 3,
                "size": 2,
                "status": "NOT_GONE",
                "maxVoteTrack": 5
            },
            {
                "count": 4,
                "size": 3,
                "status": "NOT_GONE",
                "maxVoteTrack": 5
            },
            {
                "count": 5,
                "size": 3,
                "status": "NOT_GONE",
                "maxVoteTrack": 5
            }
        ]
    },
    "kingOrder": [
        "bridget",
        "wilson",
        "alex",
        "jason",
        "ashwin"
    ],
    "currentMission": 1,
    "voteTrack": 1,
    "proposedTeam": [],
    "teamVoteResult": null,
    "missionVote": {
        "success": 0,
        "fail": 0,
        "reverse": 0
    }
}

//todo add validity for number of candidate
export class TeamSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamProposalArray: [],
            roomState: in_progress,
            // move to using props later
            // roomState: props.roomState
        }
        this.updateTeamProposal = this.updateTeamProposal.bind(this);
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
        const roomName = this.state.roomState.roomName;
        console.log(roomName, playerName)
        dispatchSubmitForVote({room: roomName, player: playerName})
            .then(res => {
                console.log(res)
            });
    }

    updateTeamProposal(candidate) {
        const playerName = this.props.name;
        const roomName = this.state.roomState.roomName;
        let teamProposal = this.state.teamProposalArray;
        if (teamProposal.includes(candidate)) {
            teamProposal = teamProposal.filter(e => e !== candidate);
        } else {
            teamProposal = teamProposal.concat(candidate);
        }
        dispatchUpdateTeamMembers({player: playerName, room: roomName, teamProposal: teamProposal})
            .then(res => {
                console.log(res)
            });
        //should setState be removed once this state is being passed in via props?
        // updated state should trigger new render
        this.setState({
            teamProposalArray: teamProposal,
            initialPickDone: true
        })
    }

    render() {
        const teamProposalArray = this.state.teamProposalArray;
        return (
            <div>
                <Heading>{this.props.name}, select candidates for your mission. </Heading>
                {this.state.roomState.kingOrder.map(name => {
                    return <Player key={name} name={name} selected={teamProposalArray.includes(name)}
                                   onClick={() => this.updateTeamProposal(name)}/>
                })}
                <Button onClick={this.voteSubmit}>Submit For Vote</Button>
            </div>
        );
    }
}