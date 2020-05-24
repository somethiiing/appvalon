module.exports = {
    "roomName": "mango", // room name - used for all api calls
    "roomOwner": "alex", // room owner - used for forcing votes/afk,etc
    "status": "ASSASSINATION", // controls action area
    "createdAt": 1589336585126, // probably not useful, but just in case
    "playerCount": 5, // mostly state stuff, determines # of good/evil
    "lakeSetting": "NONE", // lake setting, lake role/alignment/none
    "selectedRoles": [ // list of roles that are used in this game.
        'percival',
        'morgana',
        'mordred',
        'merlin',
        'genericGood'
    ],
    "players": { // object used for live object lookup. player name is key,
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
        "playerCount": 5, // total # of players
        "numGood": 3, // number of good on a team
        "numEvil": 2, // number of evil on a team
        "doubleFailRequired": false, // double fail on mission 4
        "missions": [
            {
                "count": 1, // mission number
                "size": 2, // size of mission
                "status": "NOT_GONE", // status of mission: NOT_GONE, SUCCESS, FAIL
                "maxVoteTrack": 5 // max # of picks on a mission, used for thavalon. defaults to 5 for normal avalon
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
    "kingOrder": [ // order for rendering players. first person is always king
        "bridget",
        "wilson",
        "alex",
        "jason",
        "ashwin"
    ],
    "currentMission": 1, // what mission # we're on
    "voteTrack": 1, // how many team proposals its been
    "proposedTeam": ['bridget', 'wilson'], // team proposal array, list of strings
    "teamVoteResult": null, // result of most recent vote
    "missionVote": { // count of mission votes
        "success": 1,
        "fail": 1,
        "reverse": 0
    }
}
