const assert = require('chai').assert;
const enums = require('../server/enums');

const { handleGameStart, handleSetTeamMembers, handleSubmitForVote } = require('../server/action');
const { newGame, inProgress, fivePlayerGameSettings, resetBoard } = require('./sample_server_states');

describe.only('#handleGameStart', () => {
  const playerNames = ['alex', 'wilson', 'bridget', 'jason', 'ashwin'];
  const result = handleGameStart(newGame, fivePlayerGameSettings, playerNames);

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
    console.log(result.proposedTeam)
    assert.deepEqual(result.proposedTeam, playerNames)
  })
})

describe.only('#handleSubmitForVote', () =>{
  const result = handleSubmitForVote(inProgress);
  it('should set status to TEAM_VOTE', () => {
    assert.equal(result.status, enums.GameState.TEAM_VOTE);
  })
})


