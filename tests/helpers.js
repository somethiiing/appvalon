const assert = require('chai').assert;
const enums = require('../server/enums');

const { reallyUsefulFunction, setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus, setKing, setLake, resetRoom } = require('../server/helpers');
const { in_progress } = require('./sample_server_states');

describe.only('setMissionCount', () => {
    const initial_state = in_progress;
    const result = setMissionCount(initial_state, 2);
    it('should set mission count', () => {
        assert.equal(result.currentMission, 2);
    })
    it('should not mutate old mission', () => {
        assert.notEqual(initial_state.currentMission, result.currentMission)
    })
});

describe.only('setVoteTrackCount', () => {
    const initial_state = in_progress;
    const result = setVoteTrackCount(initial_state, 2)
    it('should set vote track count', () => {
        assert.equal(result.voteTrack, 2)
    })
    it('should not mutate old room', () => {
        assert.notEqual(result.voteTrack, initial_state.voteTrack)
    })
});

describe.only('shuffle players', () => {
    const initial_state = in_progress;
    const result = shufflePlayers(initial_state)
    it('should create a new array of shuffled players', () => {
        // comparing references is fine - could set the random seed but w/e
        assert.notEqual(initial_state.players, result.players)
    })
});

describe.only('assignRoles', () => {
    const initial_state = in_progress;
    it('assigns all players new roles', () => {

    })
});

describe.only('setStatus', () => {
    const initial_state = in_progress;
    const result = setStatus(initial_state, enums.GameState.TEAM_PROPOSAL);
    it('should not mutate original room', () => {
        assert.equal(result.status, enums.GameState.TEAM_PROPOSAL);
    })
    it('Room has new status', () => {
        assert.notEqual(result.status, initial_state.status);
    })
});

describe.only('setKing', () => {
    const initial_state = in_progress;
    const oldKingName = initial_state.players[0].name;
    const newKingName = initial_state.players[1].name;
    const result = setKing(initial_state, newKingName);

    it('should elect a new king', () => {
        const newKing = result.players.find((player) => player.isKing);
        if (!newKing) {
            console.log(result)
        }
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
        console.log(result)
    })
});

describe.only('setLake', () => {
    const initial_state = in_progress;
    const oldLakeName = initial_state.players[0].name;
    const newLakeName = initial_state.players[1].name;
    const result = setLake(initial_state, newLakeName);

    it('should elect a new lake', () => {
        const newLake = result.players.find((player) => player.isLake);
        if (!newLake) {
            console.log(result)
        }
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
        console.log(result)

    })
});

describe.only('resetRoom', () => {
    it('should not mutate original room', () => {

    })
    it('Room has new status', () => {

    })
});