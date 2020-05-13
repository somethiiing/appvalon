const otherUtils = require('./otherUtils.js');
const roomUtils = require('./roomUtils.js');
const roleUtils = require('./roleAssignment.js')
const enums = require('./enums.js');

// changeStatus(obj, newStatus)
// submitTeamVote(obj, player, vote)

// const submitTeamVote = (state: Room, player: string, vote: string) : Room

const reallyUsefulFunction = () => true;

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
const shufflePlayers = (roomObj) => {
    let dup = otherUtils.deepCopy(roomObj)
    otherUtils.shuffle(dup.players)
    return dup;
}

/**
 * Assigns players roles from a set of roles selected by admin
 * @param {[Players]} players
 * @param {FESettingsObj} availableRoles
 */
const assignRoles = (playerNames, settings) => {
    return roleUtils.createRoleAssignment(playerNames, settings)
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
    dup.players.find(player => player.isKing).isKing = false;

    let newKing = dup.players.find(it => it.name === newKingName);
    newKing.isKing = true;

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
    newRoom.players = setKing(futureKing, newRoom.players);
    return newRoom;
}

/**
 * Sets designated player as lake (THERE CAN ONLY BE ONE!)
 * @param {PlayerObj} player
 */
const setLake = (roomObj, newLakeName) => {
    let dup = otherUtils.deepCopy(roomObj)
    dup.players.find(player => player.isLake).isLake = false;

    let newLake = dup.players.find(it => it.name === newLakeName);
    newLake.isLake = true;

    return dup;
}

/**
 * Sets room state to initial settings, retaining players (but clearing roles)
 */
const resetRoom = (roomObj, settings) => {
    const newRoom = roomUtils.createInitialRoomState(settings, room.name, room.owner);
    newRoom.players = assignRoles();
    return newRoom;
}

/**
 * Returns true if mission has failed. Takes in an array of votes and whether double failed is required
 *
 * @param missionVotes
 * @param isDoubleFailRequired
 */
const isFailedMission = (missionVotes, isDoubleFailRequired) => {
    const failCount = missionVotes.filter( i => i === enums.MissionVote.FAIL).length;
    const reverseCount = missionVotes.filter( i => i === enums.MissionVote.REVERSE).length;
    let failed = false;
    // check if mission was successful
    if ((!isDoubleFailRequired && failCount > 0) ||
        (isDoubleFailRequired && failCount > 1)) {
        failed = true;
    }
    // reverse logic
    if (reverseCount > 0 && reverseCount % 2 === 1) {
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
    players.forEach(player => {
        if (player.teamVote === enums.TeamVote.APPROVE) {
            successCount++;
        } else if (player.teamVote === enums.TeamVote.REJECT) {
            failCount++;
        }
    });

    return successCount > failCount;

}

module.exports = { reallyUsefulFunction, setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus,
    isFailedMission, getGameStateBasedOnMissionStatus, isTeamApproved, setKing, shiftKing, setLake, resetRoom };