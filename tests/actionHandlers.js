const assert = require('chai').assert;
const enums = require('../server/enums');
const otherUtils = require('../server/otherUtils');
const roomUtils = require('../server/roomUtils');

const { handleGameStart, handleUpdateTeamMembers, handleSubmitForVote, handleSubmitMissionVote, handleHandleMissionVoteResult, handleSubmitAssassination, handleSubmitTeamVote, handleHandleTeamVoteResult } = require('../server/actionHandlers');
const { newGame, inProgress, fivePlayerGameSettings, resetBoard, missionVote } = require('./sample_server_states');

describe.only('#handleGameStart', () => {
  const newGameDup = otherUtils.deepCopy(newGame);
  newGameDup.gameSettings = fivePlayerGameSettings;
  const result = handleGameStart(newGameDup);

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
    const firstKingName = result.kingOrder[0];
    assert.isTrue(result.players[firstKingName].isKing)
  })
  it('should set the lake if appropriate', () => {
    const lake = Object.values(result.players).find(player => player.isLake)
    assert.equal(lake, undefined)
  })
});

describe.only('#handleUpdateTeamMembers', () => {
  const playerNames = ['alex', 'bridget'];
  const result = handleUpdateTeamMembers(inProgress,  playerNames);

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
   const initial_state = otherUtils.deepCopy(missionVote);
   initial_state.status = enums.GameState.MISSION_VOTE;
   // first vote increments vote track and the game state is s
   let result1 = handleSubmitMissionVote(initial_state, enums.MissionVote.SUCCESS);
   it('first vote should add to votes and continue voting', () => {
       assert.equal(result1.missionVote.success , 1);
       assert.equal(result1.status, enums.GameState.MISSION_VOTE);
   })
    let result2 = otherUtils.deepCopy(result1);
   // complete the rest of the votes
   for (let i = 0; i <= result2.boardInfo.missions[result2.currentMission].maxVoteTrack; i++) {
       result2 = handleSubmitMissionVote(result2, enums.MissionVote.SUCCESS);
    }
   // should move to HANDLE_MISSION_VOTE_RESULTS
    it('when voting is done, it should move to handling the vote results', () => {
        assert.equal(result2.status, enums.GameState.HANDLE_MISSION_VOTE_RESULT);
    });
});

describe.only('integrationTest', () => {
    let room = roomUtils.createInitialRoomState("mango", "alex", fivePlayerGameSettings)
    room = roomUtils.joinRoom(room, "bridget");
    room = roomUtils.joinRoom(room, "wilson");
    room = roomUtils.joinRoom(room, "ashwin");
    room = roomUtils.joinRoom(room, "jason");

    room = handleGameStart(room);
    room = handleUpdateTeamMembers(room, 'alex', 'bridget');
    room = handleSubmitForVote(room);
    // Everyone submits their vote
    room = handleSubmitTeamVote(room, "alex", enums.TeamVote.APPROVE);
    room = handleSubmitTeamVote(room, "wilson", enums.TeamVote.APPROVE);
    room = handleSubmitTeamVote(room, "bridget", enums.TeamVote.APPROVE);
    room = handleSubmitTeamVote(room, "ashwin", enums.TeamVote.REJECT);
    room = handleSubmitTeamVote(room, "jason", enums.TeamVote.REJECT);
    // UI tells backend to handle votes
    room = handleHandleTeamVoteResult(room);
    // Since team was approved, we expect to move on to Mission Vote
    assert.equal(room.status, enums.GameState.MISSION_VOTE);
    // Start on first mission with a vote
    room = handleSubmitMissionVote(room, enums.MissionVote.SUCCESS);
    // Game should still be in voting mode
    assert.equal(room.status, enums.GameState.MISSION_VOTE);
    // Last player votes
    room = handleSubmitMissionVote(room, enums.MissionVote.FAIL);
    // Game should move on to handle mission votes
    assert.equal(room.status, enums.GameState.HANDLE_MISSION_VOTE_RESULT);
    // Handle the mission votes
    room = handleHandleMissionVoteResult(room);
    // Mission failed, team proposal
    assert.equal(room.status, enums.GameState.TEAM_PROPOSAL);
    it('game moves on to 2nd mission', () => {
        // Move to next mission
        assert.equal(room.currentMission, 2);
        // Votes reset
        assert.equal(room.missionVote.success, 0);
        assert.equal(room.missionVote.fail, 0);
        assert.equal(room.missionVote.reverse, 0);
        assert.equal(room.voteTrack, 0);
    });
    }
)