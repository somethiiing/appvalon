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
module.exports = { in_progress };