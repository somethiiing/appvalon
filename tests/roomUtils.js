const assert = require('chai').assert;
const enums = require('../server/enums');

const { submitMissionVote, submitAssassination } = require('../server/roomUtils');
const { assignRoles } = require('../server/helpers')
const { in_progress, mission_vote } = require('./sample_server_states');

describe.only('assassinate', () => {
    const initial_state = in_progress;
    in_progress.players[0].role = enums.Roles.MERLIN;
    in_progress.players[1].role = enums.Roles.GENERIC_GOOD;
    let result = submitAssassination(in_progress, in_progress.players[1].name);
    assert.equal(result.status, enums.GameState.GOOD_WIN);
    result = submitAssassination(in_progress, in_progress.players[0].name)
    assert.equal(result.status, enums.GameState.EVIL_WIN);
});

describe.only('missionVote', () => {
   const initial_state = mission_vote;
   initial_state.status = enums.GameState.MISSION_VOTE;
   // first vote increments vote track and the game state is s
   let result = submitMissionVote(initial_state, "test", enums.MissionVote.SUCCESS);
   assert.equal(result.voteTrack , 2);
   assert.equal(result.status, enums.GameState.MISSION_VOTE);
   // complete the rest of the votes
   for (let i = 0; i <= result.boardInfo.missions[result.currentMission].maxVoteTrack; i++) {
       result = submitMissionVote(result, "test", enums.MissionVote.SUCCESS);
    }
   // should move to HANDLE_MISSION_VOTE_RESULTS
    assert.equal(result.status, enums.GameState.HANDLE_MISSION_VOTE_RESULT);
});