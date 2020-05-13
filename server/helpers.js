const otherUtils = require('./otherUtils.js');
const roomUtils = require('./roomUtils.js');
const roleUtils = require('./roleAssignment.js');
const enums = require('./enums');

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
const assignRoles = (roomObj, playerNames, settings) => {
    let dup = otherUtils.deepCopy(roomObj)
    dup.players = roleUtils.createRoleAssignment(playerNames, settings)
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

    const falseKing = dup.players.find(player => player.isKing);

    if (falseKing){
        falseKing.isKing = false;
    }

    let newKing = dup.players.find(it => it.name === newKingName);
    newKing.isKing = true;

    return dup;
}

/**
 * Sets designated player as lake (THERE CAN ONLY BE ONE!)
 * @param {PlayerObj} player
 */
const setLake = (roomObj, newLakeName) => {
    let dup = otherUtils.deepCopy(roomObj);

    const falseLake =  dup.players.find(player => player.isLake);
    if (falseLake){
        falseLake.isLake = false;
    }

    let newLake = dup.players.find(it => it.name === newLakeName);
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

module.exports = { reallyUsefulFunction, setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus, setKing, setLake, reinitializeBoard, setTeamMembers };