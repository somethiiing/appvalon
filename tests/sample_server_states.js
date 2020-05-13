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
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'MISSION_VOTE',
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
            status: 'NOT_GONE',
            maxVoteTrack: 5
        },
            {
                count: 2,
                size: 3,
                status: 'NOT_GONE',
                maxVoteTrack: 5
            },
            {
                count: 3,
                size: 3,
                status: 'NOT_GONE',
                maxVoteTrack: 5
            },
            {
                count: 4,
                size: 2,
                status: 'NOT_GONE',
                maxVoteTrack: 5
            },
            {
                count: 5,
                size: 3,
                status: 'NOT_GONE',
                maxVoteTrack: 5
            }
        ]
    },
    kingOrder: ['alex', 'bridget', 'chris', 'david', 'elliot'],
    currentMission: 1,
    voteTrack: 1,
    proposedTeam: [],
    teamVoteResults: null,
    missionVote: []
}

module.exports = { newGame, inProgress, missionVote, fivePlayerGameSettings, resetBoard };