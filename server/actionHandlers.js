const enums = require('./enums');
const helpers = require('./helpers');
const otherUtils = require( "./otherUtils");

/**
 * Creates an array of player objects with roles assigned
 */
const handleGameStart = (roomObj ) => {
    const settings = roomObj.gameSettings
    roomObj = helpers.setStatus(roomObj, enums.GameState.TEAM_PROPOSAL);
    roomObj = helpers.setMissionCount(roomObj, 1);
    roomObj = helpers.shufflePlayers(roomObj);
    roomObj = helpers.setVoteTrackCount(roomObj, 1);
    roomObj = helpers.assignRoles(roomObj, Object.keys(roomObj.players), settings);
    roomObj = helpers.setKingOrder(roomObj);
    roomObj = helpers.setKing(roomObj, roomObj.kingOrder[0]);
    roomObj = helpers.setSelectedRoles(roomObj);
    roomObj = helpers.setHammer(roomObj);
    roomObj = helpers.addHueToPlayers(roomObj);
    roomObj = helpers.getAssassin(roomObj);
    if (roomObj.lakeSetting !== enums.LakeSettings.NONE){
        roomObj = helpers.setLake(roomObj, roomObj.kingOrder[roomObj.kingOrder.length - 1])
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
    playerObj.teamVote = vote.toUpperCase();
    return newRoom;
}

const handleRevealTeamVote = (room) => {
    return helpers.setStatus(room, enums.GameState.DISPLAY_TEAM_VOTE);
}

const handleRevealMissionVote = (room) => {
    return helpers.setStatus(room, enums.GameState.DISPLAY_MISSION_VOTE);
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
        console.log("proposed team has been approved")
        newRoom = helpers.resetPlayerTeamVotes(newRoom);
        return helpers.setStatus(newRoom, enums.GameState.MISSION_VOTE);
    } else {
        // Team not approved
        // Game ends if team approval has reached max failures
        console.log("proposed team has been rejected")
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
 * @returns newRoom
 */
const handleSubmitMissionVote = (room, player, vote) => {
    let newRoom = otherUtils.deepCopy(room);
    const playerObj = Object.values(newRoom.players).find(p => p.name === player);
    console.log(playerObj.missionVote)
    if (playerObj.missionVote === enums.MissionVote.NOT_VOTED) {
        console.log("vote recieved: " + vote)
        switch (vote.toUpperCase()) {
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
        playerObj.missionVote = vote;
        console.log(playerObj)
        const totalVotes = newRoom.missionVote.fail + newRoom.missionVote.success + newRoom.missionVote.reverse;
        // Max votes reached
        if (totalVotes === helpers.getCurrentMission(newRoom).size) {
            console.log("mission votes have been submitted");
            newRoom = handleRevealMissionVote(newRoom);
        }
        return newRoom
    } else {
        console.log("duplicate vote recieved from player: " + playerObj.name);
        return newRoom;
    }

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
    console.log(newRoom.boardInfo.doubleFailRequired)
    //gross magic numbers ewww
    const failed = helpers.isFailedMission(newRoom.missionVote, newRoom.boardInfo.doubleFailRequired && room.currentMission == 4)
    newRoom = helpers.resetMissionVote(newRoom);
    const currentMission = helpers.getCurrentMission(newRoom);
    if (failed) {
        console.log("fission mailed.")
        currentMission.status = enums.MissionStatus.FAIL;
    } else {
        console.log("mission has succeeded!")
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
    for (let player of Object.values(room.players)) {
        if (player.name === target && player.role === enums.Roles.MERLIN) {
            success = true;
            break;
        }
    }
    if(success) {
        console.log("merlin has been assassinated!")
        return helpers.setStatus(room, enums.GameState.EVIL_WIN);
    } else {
        console.log('the loyal servants of king arthur are victorious!')
        return helpers.setStatus(room, enums.GameState.GOOD_WIN);
    }
}

module.exports = { handleGameStart, handleUpdateTeamMembers, handleSubmitForVote, handleReconfigureGame, handleSubmitTeamVote, handleRevealTeamVote,
    handleHandleTeamVoteResult, handleSubmitMissionVote, handleHandleMissionVoteResult, handleSubmitAssassination, handleRevealMissionVote}