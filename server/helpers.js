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

module.exports = { reallyUsefulFunction, setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus, setKing, setLake, resetRoom };