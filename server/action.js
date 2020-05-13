const enums = require('../server/enums');
const helpers = require('./helpers');
const otherUtils = require( "./otherUtils");

const handleSubmitForVote = (room) => {
    return helpers.setStatus(room, enums.GameState.TEAM_VOTE);
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
        return helpers.setStatus(newRoom, enums.GameState.MISSION_VOTE);
    } else {
        // Team not approved
        // Game ends if team approval has reached max failures
        if (newRoom.voteTrack === 5) {
            return helpers.setStatus(newRoom, enums.GameState.GAME_END)
        }
        // Otherwise we move things along to the next team proposal
        // TODO: Reset state
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

module.exports = { handleSubmitForVote, handleSubmitTeamVote, handleRevealTeamVote,
    handleHandleTeamVoteResult, handleSubmitMissionVote, handleHandleMissionVoteResult, handleSubmitAssassination}