const enums = require('./enums');
const helpers = require('./helpers');
const otherUtils = require( "./otherUtils");

/**
 * Creates an array of player objects with roles assigned
 */
const handleGameStart = (roomObj, settings, playerNames ) => {
    roomObj = helpers.setStatus(roomObj, enums.GameState.TEAM_PROPOSAL);
    roomObj = helpers.setMissionCount(roomObj, 1);
    roomObj = helpers.shufflePlayers(roomObj);
    roomObj = helpers.setVoteTrackCount(roomObj, 1);
    roomObj = helpers.assignRoles(roomObj, playerNames, settings);
    roomObj = helpers.setKing(roomObj, Object.values(roomObj.players)[0].name);
    roomObj = helpers.setKingOrder(roomObj);
    roomObj = helpers.setSelectedRoles(roomObj);
    roomObj = helpers.setHammer(roomObj);
    if (roomObj.lakeSetting !== enums.LakeSettings.NONE){
        roomObj = helpers.setLake(roomObj, roomObj.players[roomObj.players.length - 1].name)
    }
    return roomObj;
}

/**
 * Sets the proposed players
 */
const handleUpdateTeamMembers = (roomObj, playerNames) => {
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

const handleSubmitTeamVote = (room, player, vote) => {
    let newRoom = otherUtils.deepCopy(room);

    const playerObj = Object.values(newRoom.players).find(p => p.name === player);
    playerObj.teamVote = vote;

    return newRoom;
}

const handleRevealTeamVote = (room) => {
    return helpers.setStatus(room, enums.GameState.DISPLAY_TEAM_VOTE);
}

/**
 * When team voting is done check if the team vote passed
 * If it failed, shift the king, add to vote track and move back to proposal
 * If it failed and the voteTrack limit has been reached the game moves to GAME_END
 *
 * @param room
 * @returns room
 */
const handleHandleTeamVoteResult = (room) => {
    let newRoom = otherUtils.deepCopy(room);

    const isApproved = helpers.isTeamApproved(newRoom.players);
    // Team approved
    if (isApproved) {
        newRoom = helpers.resetTeamVote(newRoom);
        return helpers.setStatus(newRoom, enums.GameState.MISSION_VOTE);
    } else {
        // Team not approved
        // Game ends if team approval has reached max failures
        const currentMission = helpers.getCurrentMission(newRoom);
        if (newRoom.voteTrack === currentMission.maxVoteTrack) {
            return helpers.setStatus(newRoom, enums.GameState.GAME_END)
        }
        // Otherwise we move things along to the next team proposal
        // Reset the player votes
        newRoom.players = helpers.resetPlayerTeamVotes(newRoom.players);
        newRoom.voteTrack++;
        // Shift to new king
        newRoom = helpers.shiftKing(newRoom)
        return helpers.setStatus(newRoom, enums.GameState.TEAM_PROPOSAL);
    }
}

/**
 * Collects votes until it's equal to the number of players on the mission then
 * moves the game to handle the mission vote result
 *
 * @param room
 * @param vote
 * @returns room
 */
const handleSubmitMissionVote = (room, vote) => {
    const newRoom = otherUtils.deepCopy(room);
    switch(vote) {
        case enums.MissionVote.FAIL:
            newRoom.missionVote.fail++;
            break;
        case enums.MissionVote.SUCCESS:
            newRoom.missionVote.success++;
            break;
        case enums.MissionVote.REVERSE:
            newRoom.missionVote.reverse++;
            break;
    }
    const totalVotes = newRoom.missionVote.fail + newRoom.missionVote.success + newRoom.missionVote.reverse;
    // Max votes reached
    if (totalVotes === helpers.getCurrentMission(newRoom).size) {
        newRoom.status = enums.GameState.HANDLE_MISSION_VOTE_RESULT;
    }
    return newRoom;
}

/**
 * Determines if mission has failed based on the missionVote
 * Moves game state to GameState.ASSASSINATION, EVIL_WIN, or TEAM_PROPOSAL
 * depending on how many missions have succeeded or failed
 *
 * If game moves to the next mission reset the votes, and move the king
 *
 * @param room
 * @returns room
 */
const handleHandleMissionVoteResult = (room) => {
    let newRoom = otherUtils.deepCopy(room);
    const failed = helpers.isFailedMission(newRoom.missionVote, newRoom.boardInfo.doubleFailRequired)
    newRoom = helpers.resetMissionVote(newRoom);
    const currentMission = helpers.getCurrentMission(newRoom);
    if (failed) {
        currentMission.status = enums.MissionStatus.FAIL;
    } else {
        currentMission.status = enums.MissionStatus.SUCCESS;
    }

    const gameState = helpers.getGameStateBasedOnMissionStatus(newRoom.boardInfo.missions);
    //Update the game state
    newRoom = helpers.setStatus(newRoom, gameState);
    // If the game is not over we need to move things along for the next mission
    if (newRoom.status === enums.GameState.TEAM_PROPOSAL) {
        newRoom.currentMission++;
        newRoom.voteTrack = 0;
        newRoom = helpers.shiftKing(newRoom);
        newRoom.status = enums.GameState.TEAM_PROPOSAL;
    }

    return newRoom;
}

/**
 *  If target is merlin shift game state to EVIL_WIN otherwise GOOD_WIN
 *
 * @param room
 * @param target
 * @returns room
 */
const handleSubmitAssassination = (room, target) => {
    let success = false;
    for (let player of room.players) {
        if (player.name === target && player.role === enums.Roles.MERLIN) {
            success = true;
            break;
        }
    }
    if(success) {
        return helpers.setStatus(room, enums.GameState.EVIL_WIN);
    } else {
        return helpers.setStatus(room, enums.GameState.GOOD_WIN);
    }
}

module.exports = { handleGameStart, handleUpdateTeamMembers, handleSubmitForVote, handleReconfigureGame, handleSubmitTeamVote, handleRevealTeamVote,
    handleHandleTeamVoteResult, handleSubmitMissionVote, handleHandleMissionVoteResult, handleSubmitAssassination}