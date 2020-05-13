import React from 'react';
import Player from "./Player";

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

export class NonKingProposalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamProposalArray: ['alex'],
            roomState: in_progress,
            // move to using props later
            // roomState: props.roomState
        }
    }

    render() {
        const teamProposalArray = this.state.teamProposalArray;
        return (
            <div>
                {this.state.roomState.kingOrder.map(name => {
                    return <Player key={name} name={name} selected={teamProposalArray.includes(name)}/>
                })}
            </div>
        );
    }
}