const assert = require('chai').assert;
const enums = require('../server/enums');
const otherUtils = require('../server/otherUtils');

const { handleGameStart, handleSetTeamMembers, handleSubmitForVote, handleSubmitMissionVote, handleSubmitAssassination } = require('../server/actionHandlers');
const { newGame, inProgress, fivePlayerGameSettings, resetBoard, missionVote } = require('./sample_server_states');

describe.only('#handleGameStart', () => {
  const playerNames = ['alex', 'wilson', 'bridget', 'jason', 'ashwin'];
  const result = handleGameStart(newGame, fivePlayerGameSettings, playerNames);
  console.log(JSON.stringify(result))

  it('should set the TEAM_PROPOSAL status', () => {
    assert.equal(result.status, enums.GameState.TEAM_PROPOSAL)
  })
  it('should set the mission count to 1', () => {
    assert.equal(result.currentMission, 1)
  })
  it('should set the vote track count to 1', () => {
    assert.equal(result.voteTrack, 1)
  })
  it('it should initialize the board to the correct default setting', () => {
    assert.deepEqual(result.boardInfo.missions, resetBoard.boardInfo.missions)
  })
  it('it should set the first player as king', () => {
    assert.isTrue(result.players[0].isKing)
  })
  it('should set the lake if appropriate', () => {
    const lake = result.players.find(player => player.isLake)
    assert.equal(lake, undefined)
  })
});

describe.only('#handleUpdateTeamMembers', () => {
  const playerNames = ['alex', 'bridget'];
  const result = handleSetTeamMembers(inProgress,  playerNames);

  it('should set proposed players', () => {
    assert.deepEqual(result.proposedTeam, playerNames)
  })
})

describe.only('#handleSubmitForVote', () =>{
  const result = handleSubmitForVote(inProgress);
  it('should set status to TEAM_VOTE', () => {
    assert.equal(result.status, enums.GameState.TEAM_VOTE);
  })
})


describe.only('assassinate', () => {
    const initial_state = inProgress;
    initial_state.players[0].role = enums.Roles.MERLIN;
    initial_state.players[1].role = enums.Roles.GENERIC_GOOD;
    let result1 = handleSubmitAssassination(initial_state, initial_state.players[1].name);
    it('wrong assassination should mean good wins', () => {
        assert.equal(result1.status, enums.GameState.GOOD_WIN);
    });
    let result2 = handleSubmitAssassination(initial_state, initial_state.players[0].name)
    it('assassinating merlin should mean evil wins', () => {
        assert.equal(result2.status, enums.GameState.EVIL_WIN);
    });
});

describe.only('missionVote', () => {
   const initial_state = missionVote;
   initial_state.status = enums.GameState.MISSION_VOTE;
   // first vote increments vote track and the game state is s
   let result1 = handleSubmitMissionVote(initial_state, "test", enums.MissionVote.SUCCESS);
   it('first vote should increment vote track and continue votes', () => {
       assert.equal(result1.voteTrack , 2);
       assert.equal(result1.status, enums.GameState.MISSION_VOTE);
   })
    let result2 = otherUtils.deepCopy(result1);
   // complete the rest of the votes
   for (let i = 0; i <= result2.boardInfo.missions[result2.currentMission].maxVoteTrack; i++) {
       result2 = handleSubmitMissionVote(result2, "test", enums.MissionVote.SUCCESS);
    }
   // should move to HANDLE_MISSION_VOTE_RESULTS
    it('when voting is done, it should move to handling the vote results', () => {
        assert.equal(result2.status, enums.GameState.HANDLE_MISSION_VOTE_RESULT);
    });
});