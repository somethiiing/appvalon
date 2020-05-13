const assert = require('chai').assert;
const enums = require('../server/enums');

const { handleSubmitMissionVote, handleSubmitAssassination } = require('../server/action');
const { in_progress, mission_vote } = require('./sample_server_states');

describe.only('assassinate', () => {
    const initial_state = in_progress;
    initial_state.players[0].role = enums.Roles.MERLIN;
    initial_state.players[1].role = enums.Roles.GENERIC_GOOD;
    let result = handleSubmitAssassination(initial_state, initial_state.players[1].name);
    it('wrong assassination should mean good wins', () => {
        assert.equal(result.status, enums.GameState.GOOD_WIN);
    });
    result = handleSubmitAssassination(initial_state, initial_state.players[0].name)
    it('assassinating merlin should mean evil wins', () => {
        assert.equal(result.status, enums.GameState.EVIL_WIN);
    });
});

describe.only('missionVote', () => {
   const initial_state = mission_vote;
   initial_state.status = enums.GameState.MISSION_VOTE;
   // first vote increments vote track and the game state is s
   let result = handleSubmitMissionVote(initial_state, "test", enums.MissionVote.SUCCESS);
   //first vote should increment vote track and continue votes
       assert.equal(result.voteTrack , 2);
       assert.equal(result.status, enums.GameState.MISSION_VOTE);
   // complete the rest of the votes
   for (let i = 0; i <= result.boardInfo.missions[result.currentMission].maxVoteTrack; i++) {
       result = handleSubmitMissionVote(result, "test", enums.MissionVote.SUCCESS);
    }
   // should move to HANDLE_MISSION_VOTE_RESULTS
    it('when voting is done, it should move to handling the vote results', () => {
        assert.equal(result.status, enums.GameState.HANDLE_MISSION_VOTE_RESULT);
    });
});