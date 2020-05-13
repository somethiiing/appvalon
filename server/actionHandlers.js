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
    newRoom.players.forEach(p => {
        if (p.name === player) {
            p.teamVote = vote;
        }
    })
    return newRoom;
}

const handleRevealTeamVote = (room) => {
    return helpers.setStatus(room, enums.GameState.DISPLAY_TEAM_VOTE);
}

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
        if (newRoom.voteTrack === 5) {

            return helpers.setStatus(newRoom, enums.GameState.GAME_END)
        }
        // Otherwise we move things along to the next team proposal
        // TODO: Reset state
        newRoom = helpers.resetTeamVote(newRoom);
        newRoom.voteTrack++;
        newRoom = helpers.shiftKing(newRoom)
        return helpers.setStatus(newRoom, enums.GameState.TEAM_PROPOSAL);
    }
}

const handleSubmitMissionVote = (room, player, vote) => {
    const newRoom = otherUtils.deepCopy(room);
    newRoom.missionVote.push(vote);
    newRoom.voteTrack++;
    // Max votes reached
    if (newRoom.voteTrack === newRoom.boardInfo.missions[newRoom.currentMission-1].maxVoteTrack) {
        newRoom.status = enums.GameState.HANDLE_MISSION_VOTE_RESULT;
    }
    // TODO: Reset state?
    return newRoom;
}

const handleHandleMissionVoteResult = (room) => {
    let newRoom = otherUtils.deepCopy(room);
    const failed = helpers.isFailedMission(newRoom.missionVote, newRoom.boardInfo.doubleFailRequired)
    newRoom = helpers.resetMissionVote(newRoom);
    if (failed) {
        newRoom.boardInfo.missions[newRoom.currentMission-1].status = enums.MissionStatus.FAIL;
    } else {
        newRoom.boardInfo.missions[newRoom.currentMission-1].status = enums.MissionStatus.SUCCESS;
    }


    const gameState = helpers.getGameStateBasedOnMissionStatus(newRoom.missions);
    //Update the game state
    newRoom = helpers.setStatus(gameState);
    // If the game is not over we need to move things along for the next mission
    if (newRoom.status === enums.GameState.TEAM_PROPOSAL) {
        newRoom.currentMission++;
        newRoom.voteTrack = 0;
        newRoom = helpers.shiftKing(newRoom);
        newRoom.status = enums.GameState.TEAM_PROPOSAL;
    }
    // TODO: Reset state?

    return newRoom;
}

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