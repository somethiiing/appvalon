const otherUtils = require('./otherUtils.js');
const roomUtils = require('./roomUtils.js');
const roleUtils = require('./roleAssignment.js');
const enums = require('./enums');

const DEFAULT_MISSION_VOTE = {
    "success": 0,
    "fail": 0,
    "reverse": 0
};

Object.freeze(DEFAULT_MISSION_VOTE);

/**
 * Sets the number of missions that have been approved
 * @param {Mission} room
 * @param {number} count
 */
const setMissionCount = (roomObj, count) => {
    let dup = otherUtils.deepCopy(roomObj);
    dup.currentMission = count;
    return dup;
};

/**
 * Sets the current round of votes in room
 * @param {Room} room
 * @param {number} count
 */
const setVoteTrackCount = (roomObj, count) => {
    let dup = otherUtils.deepCopy(roomObj)
    dup.voteTrack = count;
    return dup;
}

/**
 * Returns a new list of players that have been shuffled
 * @param {roomObj} array of players to be shuffled
 */
const shuffleKingOrder = (roomObj) => {
    let dup = otherUtils.deepCopy(roomObj)
    otherUtils.shuffle(dup.kingOrder)
    return dup;
}

/**
 * Assigns players roles from a set of roles selected by admin
 * @param {[Players]} players
 * @param {FESettingsObj} availableRoles
 */
const assignRoles = (roomObj, playerNames, settings) => {
    let dup = otherUtils.deepCopy(roomObj)
    dup.players = roleUtils.createRoleAssignment(playerNames, settings)
    Object.values(dup.players).forEach((player) => {
        player.teamVote = enums.TeamVote.NOT_VOTED;
        player.missionVote = enums.MissionVote.NOT_VOTED;
        player.isKing = false;
        player.isHammer = false;
        player.isLake = false;
    })
    return dup;
}

/**
 * Sets the status of the room
 * @param {Room} room
 * @param {GameStatus} status
 */
const setStatus = (roomObj, status) => {
    let dup = otherUtils.deepCopy(roomObj);
    dup.status = status;
    return dup;
}

/**
 * Sets designated player as king (THERE CAN ONLY BE ONE!)
 * @param {string} newKingName
 * @param {[PlayerObj]} newKingName
 */
const setKing = (roomObj, newKingName) => {
    let dup = otherUtils.deepCopy(roomObj)

    const falseKing = Object.values(dup.players).find(player => player.isKing);

    if (falseKing){
        falseKing.isKing = false;
    }
    let newKing = Object.values(dup.players).find(it => it.name === newKingName);
    newKing.isKing = true;

    return dup;
}

const setKingOrder = (roomObj) => {
    let dup = otherUtils.deepCopy(roomObj)

    dup.kingOrder = otherUtils.shuffle(Object.keys(dup.players))

    return dup;
}

 const setSelectedRoles = (roomObj) => {
    let dup = otherUtils.deepCopy(roomObj);

    const roles = [];

    Object.values(roomObj.players).forEach((player) => {
        roles.push(player.role);
    })

    dup.selectedRoles = roles;
    return dup;
 }

/**
 * Shifts the king
 * @param room
 */
const shiftKing = (room) => {
    let newRoom = otherUtils.deepCopy(room)
    let currentKing = newRoom.kingOrder.shift();
    newRoom.kingOrder.push(currentKing);
    let futureKing = newRoom.kingOrder.shift();
    return setKing(newRoom, futureKing);
}

/**
 * Sets designated player as lake (THERE CAN ONLY BE ONE!)
 * @param {PlayerObj} player
 */
const setLake = (roomObj, newLakeName) => {
    let dup = otherUtils.deepCopy(roomObj);

    const falseLake = Object.values(dup.players).find(player => player.isLake);
    if (falseLake){
        falseLake.isLake = false;
    }

    let newLake = Object.values(dup.players).find(it => it.name === newLakeName);
    newLake.isLake = true;

    return dup;
}

const setTeamMembers = (roomObj, teamMembers) => {
    let dup = otherUtils.deepCopy(roomObj);

    dup.proposedTeam = teamMembers;

    return dup;
}

/**
 * Sets room state to initial settings, retaining players (but clearing roles)
 */
const reinitializeBoard= (roomObj, settings) => {
    let newRoom = roomUtils.createInitialRoomState(roomObj.roomName, roomObj.roomOwner, settings, roomObj.players);
    newRoom = unassignRoles(newRoom);
    return newRoom;
}

/**
 * unassigns player roles
 */
const unassignRoles = (roomObj) => {
    const dup = otherUtils.deepCopy(roomObj);

    for (const player of dup.players) {
        player.teamVote = enums.TeamVote.NOT_VOTED;
        player.role = enums.Roles.NONE;
        player.information = {};
        player.isHammer = false;
        player.isKing = false;
        player.isLake = false;
    }

    return dup;
}

/**
 * Returns true if mission has failed. Takes in an array of votes and whether double failed is required
 *
 * @param missionVotes
 * @param isDoubleFailRequired
 */
const isFailedMission = (missionVotes, isDoubleFailRequired) => {
    let failed = false;
    // check if mission was successful
    console.log(missionVotes)
    if ((!isDoubleFailRequired && missionVotes.fail > 0) ||
        (isDoubleFailRequired && missionVotes.fail > 1)) {
        failed = true;
    }
    // reverse logic
    if (missionVotes.reverse > 0 && missionVotes.reverse % 2 === 1) {
        failed = !failed;
    }
    return failed;
}

/**
 * Gets the game state based on the status of the array of missions provided
 * Can be one of GameState.ASSASSINATION, EVIL_WIN, or TEAM_PROPOSAL if the game continues
 * @param missions
 */
const getGameStateBasedOnMissionStatus = (missions) => {
    // Check if the game ends
    let missionFailedCount = 0;
    let missionSuccessCount = 0;
    missions.forEach(mission => {
        if (mission.status === enums.MissionStatus.SUCCESS) {
            missionSuccessCount++;
        } else if (mission.status === enums.MissionStatus.FAIL) {
            missionFailedCount++;
        }
    });

    // Game ends
    if (missionSuccessCount === 3) {
        return enums.GameState.ASSASSINATION;
    } else if (missionFailedCount === 3) {
        return enums.GameState.EVIL_WIN;
    }

    return enums.GameState.TEAM_PROPOSAL;
}

/**
 * Returns true if the team is approved based on the votes of the players
 *
 * @param players
 */
const isTeamApproved = (players) => {
    let failCount = 0;
    let successCount = 0;

    Object.values(players).forEach(player => {
        console.log(player.teamVote)
        if (player.teamVote === enums.TeamVote.APPROVE) {
            successCount++;
        } else if (player.teamVote === enums.TeamVote.REJECT) {
            failCount++;
        }
    });

    console.log("fail count: " + failCount)
    console.log("success count: " + successCount)
    return successCount > failCount;

}

/**
 * sets a player as the hammer based on number of mission proposals and king order
 * @param {RoomObj} roomObj
 */
const setHammer = (roomObj) => {
    const dup = otherUtils.deepCopy(roomObj);

    const currentMission = getCurrentMission(dup);
    const maxVoteCount = currentMission.maxVoteTrack;

    const hammerName = dup.kingOrder[maxVoteCount - 1];
    const newHammer = getPlayer(dup, hammerName);

    const falseHammer = Object.values(dup.players).find(player => player.isHammer);
    if (falseHammer) {
        falseHammer.isHammer = false;
    }
    newHammer.isHammer = true

    return dup;
}

/**
 * removes all votes for team from room
 * @param {RoomObj} roomObj
 */
const resetTeamVote = (roomObj) => {
    const dup = otherUtils.deepCopy(roomObj);

    dup.teamVoteResult = null;

    return dup;
}

const resetMissionVote = (roomObj) => {
    const dup = otherUtils.deepCopy(roomObj);
    Object.values(roomObj.players).forEach((player) => {
        player.missionVote = enums.MissionVote.NOT_VOTED;
    })
    dup.missionVote = otherUtils.deepCopy(DEFAULT_MISSION_VOTE);

    return dup;
}

const getPlayer = (roomObj, playerName) => {
    return Object.values(roomObj.players).find(player => player.name === playerName);
}

/**
 * Returns players array with team votes reset to NOT_VOTED
 * @param players
 */
const resetPlayerTeamVotes = (players) => {
    const newPlayers = otherUtils.deepCopy(players);
    Object.values(newPlayers).forEach(player => {
        player.teamVote = enums.TeamVote.NOT_VOTED;
    })
    return newPlayers;
}

/**
 * Returns mission that the game is currently active
 *
 * @param room
 * @returns mission
 */
const getCurrentMission = (room) => {
    return room.boardInfo.missions[room.currentMission-1];
}

const addHueToPlayers = (room) => {
    const dup = otherUtils.deepCopy(room);
    // ensure an even spread over the 360 different colors frontend can display,
    // assuming max of 10 players

    const hueIncrement = 35;
    let hueValue = 1;
    Object.values(dup.players).forEach(player => {
        player.hue = hueValue;
        hueValue += hueIncrement;
        if(player.name === 'iAshwin') {
            player.hue = undefined;
        }
    })
    return dup;
}

module.exports = { setMissionCount, setVoteTrackCount, shufflePlayers: shuffleKingOrder, assignRoles,
    setStatus, setKing, setLake, shiftKing, reinitializeBoard, setTeamMembers, isFailedMission,
    getGameStateBasedOnMissionStatus, isTeamApproved, resetPlayerTeamVotes, getCurrentMission,
    setKingOrder, setSelectedRoles, setHammer, resetMissionVote, resetTeamVote, addHueToPlayers, getPlayer };
