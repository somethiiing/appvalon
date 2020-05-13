module.exports = {
    "roomName": "mango",
    "roomOwner": "alex",
    "status": "TEAM_PROPOSAL",
    "createdAt": 1589336585126,
    "playerCount": 5,
    "lakeSetting": "NONE",
    "selectedRoles": [
        "morgana",
        "merlin",
        "mordred",
        "percival",
        "genericGood"
    ],
    "players": {
        "alex": {
            "role": "morgana",
            "name": "alex",
            "sees": {
                "mordred": {
                    "role": "mordred",
                    "alignment": "evil",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "bridget"
                        ]
                    }
                }
            },
            "alignment": "evil",
            "teamVote": "notVoted",
            "isKing": true,
            "isHammer": false,
            "isLake": false
        },
        "wilson": {
            "role": "merlin",
            "name": "wilson",
            "sees": {
                "morgana": {
                    "role": "morgana",
                    "alignment": "evil",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "alex"
                        ]
                    }
                }
            },
            "alignment": "good",
            "teamVote": "notVoted",
            "isKing": false,
            "isHammer": false,
            "isLake": false
        },
        "bridget": {
            "role": "mordred",
            "name": "bridget",
            "sees": {
                "morgana": {
                    "role": "morgana",
                    "alignment": "evil",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "alex"
                        ]
                    }
                }
            },
            "alignment": "evil",
            "teamVote": "notVoted",
            "isKing": false,
            "isHammer": true,
            "isLake": false
        },
        "jason": {
            "role": "percival",
            "name": "jason",
            "sees": {
                "merlin": {
                    "role": "merlin",
                    "alignment": "unknown",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "wilson"
                        ]
                    }
                },
                "morgana": {
                    "role": "morgana",
                    "alignment": "unknown",
                    "knowsRole": false,
                    "players": {
                        "assigned": [
                            "alex"
                        ]
                    }
                }
            },
            "alignment": "good",
            "teamVote": "notVoted",
            "isKing": false,
            "isHammer": false,
            "isLake": false
        },
        "ashwin": {
            "role": "genericGood",
            "name": "ashwin",
            "sees": {},
            "alignment": "good",
            "teamVote": "notVoted",
            "isKing": false,
            "isHammer": false,
            "isLake": false
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
        "ashwin",
        "alex",
        "jason",
        "wilson",
        "bridget"
    ],
    "currentMission": 1,
    "voteTrack": 1,
    "proposedTeam": ['ashwin', 'jason'],
    "teamVoteResult": null,
    "missionVote": {
        "success": 0,
        "fail": 0,
        "reverse": 0
    }
}