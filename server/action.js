const helpers = require('./helpers.js');
const enums = require('./enums.js');


/**
 * Creates an array of player objects with roles assigned
 */
const handleGameStart = (roomObj, settings, playerNames ) => {
    roomObj = helpers.setStatus(roomObj, enums.GameState.TEAM_PROPOSAL);
    roomObj = helpers.setMissionCount(roomObj, 1);
    roomObj = helpers.shufflePlayers(roomObj);
    roomObj = helpers.setVoteTrackCount(roomObj, 1);
    roomObj = helpers.assignRoles(roomObj, playerNames, settings);
    roomObj = helpers.setKing(roomObj, roomObj.players[0].name);
    if (roomObj.lakeSetting !== enums.LakeSettings.NONE){
      roomObj = helpers.setLake(roomObj, roomObj.players[roomObj.players.length - 1].name)
    }
    return roomObj;
}

/**
 * Sets the proposed players
 */
const handleSetTeamMembers = (roomObj, playerNames) => {
  return helpers.setTeamMembers(roomObj, playerNames);
}

/**
 * Changes status to TEAM_VOTE
 */
const handleSubmitForVote = (roomObj) => {
  return helpers.setStatus(roomObj, enums.GameState.TEAM_VOTE);
}

/**
 * Resets game to default state
 */
const handleReconfigureGame = (roomObj) => {
  //todo: implement this later. this is a stretch goal
  helpers.reinitializeBoard(roomObj)

  return roomObj;
}

module.exports = { handleGameStart, handleSetTeamMembers, handleSubmitForVote, handleReconfigureGame }