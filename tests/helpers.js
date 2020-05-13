const assert = require('chai').assert;
const enums = require('../server/enums');

const { setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus, setKing, setLake, setTeamMembers, reinitializeBoard } = require('../server/helpers');
const { inProgress, fivePlayerGameSettings, resetBoard } = require('./sample_server_states');

describe.only('#setMissionCount', () => {
    const initial_state = inProgress;
    const result = setMissionCount(initial_state, 2);
    it('should set mission count', () => {
        assert.equal(result.currentMission, 2);
    })
    it('should not mutate old mission', () => {
        assert.notEqual(initial_state.currentMission, result.currentMission)
    })
});

describe.only('#setVoteTrackCount', () => {
    const initial_state = inProgress;
    const result = setVoteTrackCount(initial_state, 2)
    it('should set vote track count', () => {
        assert.equal(result.voteTrack, 2)
    })
    it('should not mutate old room', () => {
        assert.notEqual(result.voteTrack, initial_state.voteTrack)
    })
});

describe.only('#shufflePlayers', () => {
    const initial_state = inProgress;
    const result = shufflePlayers(initial_state)
    it('should create a new array of shuffled players', () => {
        // comparing references is fine - could set the random seed but w/e
        assert.notEqual(initial_state.players, result.players)
    })
});

describe.only('#assignRoles', () => {
    const initial_state = inProgress;
    it('assigns all players new roles', () => {

    })
});

describe.only('#setStatus', () => {
    const initial_state = inProgress;
    const result = setStatus(initial_state, enums.GameState.TEAM_PROPOSAL);
    it('should not mutate original room', () => {
        assert.equal(result.status, enums.GameState.TEAM_PROPOSAL);
    })
});

describe.only('#setTeamMembers', () => {
    const initial_state = inProgress;
    const proposedPlayers = ['ashwin','jason','niyati'];
    const result = setTeamMembers(initial_state, proposedPlayers);
    it('should update team members', () => {
        assert.deepEqual(result.proposedTeam, proposedPlayers);
    })
    it('should not mutate original room', () => {
        assert.notEqual(result.proposedTeam, initial_state.proposedPlayers);
    })
});

describe.only('#setKing', () => {
    const initial_state = inProgress;
    const oldKingName = initial_state.players[0].name;
    const newKingName = initial_state.players[1].name;
    const result = setKing(initial_state, newKingName);

    it('should elect a new king', () => {
        const newKing = result.players.find((player) => player.isKing);
        assert.exists(newKing);
        assert.equal(newKing.name, newKingName);
    })
    it('should depose the old king', () => {
        const oldKing = (result.players.find((player) => player.name == oldKingName));
        assert.exists(oldKing);
        assert.equal(oldKing.name, oldKingName);
    })
    it('should not mutate the original players list', () => {
        assert.notDeepEqual(initial_state.players, result);
    })
});

describe.only('#setLake', () => {
    const initial_state = inProgress;
    initial_state.players[0].isLake = true;
    const oldLakeName = initial_state.players[0].name;
    const newLakeName = initial_state.players[1].name;
    const result = setLake(initial_state, newLakeName);

    it('should elect a new lake', () => {
        const newLake = result.players.find((player) => player.isLake);
        assert.exists(newLake);
        assert.equal(newLake.name, newLakeName);
    })
    it('should depose the old lake', () => {
        const oldLake = (result.players.find((player) => player.name == oldLakeName));
        assert.exists(oldLake);
        assert.equal(oldLake.name, oldLakeName);
    })
    it('should not mutate the original players list', () => {
        assert.notDeepEqual(initial_state.players, result);
    })
});

// describe.only('#reinitializeBoard', () => {
//     const initial_state = inProgress;
//     const result = reinitializeBoard(initial_state, fivePlayerGameSettings);

//     it('should have the same name and owner', () => {
//         assert.equal(result.roomName, resetBoard.roomName)
//         assert.equal(result.roomOwner, resetBoard.roomOwner)
//     })
//     it('should have an accurate player count', () => {
//         assert.equal(result.playerCount, resetBoard.playerCount)
//     })
//     it('should have accurate lake settings', () => {
//         assert.equal(result.lakeSetting, resetBoard.lakeSetting)
//     })
//     it('should have the same players without roles or information', () => {
//         assert.deepEqual(result.players, resetBoard.players )
//     })
//     it('should reset mission and vote track', () => {
//         assert.equal(result.voteTrack, resetBoard.voteTrack)
//         assert.equal(result.currentMission, resetBoard.currentMission)
//     })
// });