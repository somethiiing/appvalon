const newGame = {
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'WAITING_FOR_PLAYERS',
    createdAt: 1589336585126,
    playerCount: 5,
    lakeSetting: 'NONE',
    selectedRoles: [],
    players:
        [{
            name: 'alex',
            role: '',
            isKing: false,
            isHammer: false
        },
        {
            name: 'wilson',
            isKing: false,
            isLake: false,
            role: ''
        },
        {
            name: 'bridget',
            isKing: false,
            isLake: false,
            role: ''
        },
        {
            name: 'jason',
            isKing: false,
            isLake: false,
            role: ''
        },
        {
            name: 'ashwin',
            isKing: false,
            isLake: false,
            role: ''
        }
        ],
    boardInfo:
    {
        playerCount: 5,
        numGood: 3,
        numEvil: 2,
        doubleFailRequired: false,
        missions: [{ count: 1, size: 2, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 2, size: 3, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 3, size: 2, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 4, size: 3, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 5, size: 3, status: 'NOT_GONE', maxVoteTrack: 5 }]
    },
    kingOrder: [],
    currentMission: 1,
    voteTrack: 1,
    proposedTeam: [],
    teamVoteResult: null,
    missionVote: { success: 0, fail: 0, reverse: 0 }
}


const inProgress = {
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'TEAM_PROPOSAL',
    createdAt: 0,
    playerCount: 5,
    lakeSettings: 'NONE',
    selectedRoles: ['merlin', 'percival', 'genericGood', 'mordred', 'morgana'],
    players: [{
        name: 'alex',
        isKing: true,
        isLake: false,
        role: 'mordred'
    }, {
        name: 'wilson',
        isKing: false,
        isLake: false,
        role: 'merlin'
    }, {
        name: 'bridget',
        isKing: false,
        isLake: false,
        role: 'percival'
    }, {
        name: 'jason',
        isKing: false,
        isLake: false,
        role: 'morgana'
    }, {
        name: 'ashwin',
        isKing: false,
        isLake: false,
        role: 'genericGood'
    }
    ],
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

const resetBoard = {
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'WAITING_FOR_PLAYERS',
    createdAt: 1589330140275,
    playerCount: 5,
    lakeSetting: 'NONE',
    selectedRoles: [],
    players:
        [  {
            name: 'alex',
            isKing: false,
            isLake: false,
            role: '',
            teamVote: 'notVoted',
            information: {},
            isHammer: false
          },
          {
            name: 'wilson',
            isKing: false,
            isLake: false,
            role: '',
            teamVote: 'notVoted',
            information: {},
            isHammer: false
          },
          {
            name: 'bridget',
            isKing: false,
            isLake: false,
            role: '',
            teamVote: 'notVoted',
            information: {},
            isHammer: false
          },
          {
            name: 'jason',
            isKing: false,
            isLake: false,
            role: '',
            teamVote: 'notVoted',
            information: {},
            isHammer: false
          },
          {
            name: 'ashwin',
            isKing: false,
            isLake: false,
            role: '',
            teamVote: 'notVoted',
            information: {},
            isHammer: false
          }],
    boardInfo:
    {
        playerCount: 5,
        numGood: 3,
        numEvil: 2,
        doubleFailRequired: false,
        missions: [
            { count: 1, size: 2, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 2, size: 3, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 3, size: 2, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 4, size: 3, status: 'NOT_GONE', maxVoteTrack: 5 },
            { count: 5, size: 3, status: 'NOT_GONE', maxVoteTrack: 5 }
        ]
    },
    kingOrder: [],
    currentMission: 1,
    voteTrack: 1,
    proposedTeam: [],
    teamVoteResult: null,
    missionVote: { success: 0, fail: 0, reverse: 0 }
}


const fivePlayerGameSettings = {
    playerCount: 5,
    selectedRoles: {
        merlin: true, //bool
        percival: true, //bool
        tristan: false, //bool
        iseult: false, //bool
        genericGood: true, //bool
        numGenGood: 1, //num

        assassin: false, //bool
        mordred: true, //bool
        morgana: true, //bool
        oberon: false, //bool
        noberon: false, //bool
        genericEvil: false, //bool
        numGenEvil: 0 //num
    },
    lakeSetting: 'NONE', // ROLE, ALIGNMENT, NONE
}

const missionVote = {
    "roomName": "mango", // room name - used for all api calls
    "roomOwner": "alex", // room owner - used for forcing votes/afk,etc
    "status": "TEAM_VOTE", // controls action area
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
            "isKing": false
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
            },
            "isKing": false
        },
        "bridget": {
            "role": "merlin",
            "name": "bridget",
            "isKing": "true",
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
            },
            "isKing": false
        },
        "ashwin": {
            "role": "genericGood",
            "name": "ashwin",
            "sees": {},
            "isKing": false
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
    "proposedTeam": ["alex", "wilson"], // team proposal array, list of strings
    "teamVoteResult": null, // result of most recent vote
    "missionVote": { // count of mission votes
        "success": 0,
        "fail": 0,
        "reverse": 0
    }
}


module.exports = { newGame, inProgress, missionVote, fivePlayerGameSettings, resetBoard };