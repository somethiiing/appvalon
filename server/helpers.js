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
const setMissionCount = (mission, count) => {
    let dup = otherUtils.deepCopy(mission)
    dup.currentMission = count;
    return dup;
};

/**
 * Sets the current round of votes in room
 * @param {Room} room
 * @param {number} count
 */
const setVoteTrackCount = (room, count) => {
    let dup = otherUtils.deepCopy(room)
    dup.voteTrack = count;
    return dup;
}

/**
 * Returns a new list of players that have been shuffled
 * @param {array} array of players to be shuffled
 */
const shufflePlayers = (players) => {
    return otherUtils.deepCopy(otherUtils.shuffle(players));
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
const setStatus = (room, status) => {
    let dup = otherUtils.deepCopy(room);
    dup.status = status;
    return dup;
}

/**
 * Sets designated player as king (THERE CAN ONLY BE ONE!)
 * @param {Player} player
 */
const setKing = (newKingName, players) => {
    let replacedPlayers = [];
    let deposedKing = otherUtils.deepCopy(players.find((player) => player.isKing));
    if (deposedKing) {
        deposedKing.isKing = false;
        replacedPlayers.push(deposedKing);
    }

    let newKing = otherUtils.deepCopy(players.find(it => it.name === newKingName));
    newKing.isKing = true;

    replacedPlayers.push(newKing);

    return replacePlayers(otherUtils.deepCopy(players), replacedPlayers);
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
 * @param {Player} player
 */
const setLake = (newLakeName, players) => {
    let replacedPlayers = [];
    let deposedLake = otherUtils.deepCopy(players.find((player) => player.isLake));
    if (deposedLake) {
        deposedLake.isLake = false;
        replacedPlayers.push(deposedLake);
    }

    let newLake = otherUtils.deepCopy(players.find(it => it.name === newLakeName));
    newLake.isLake = true;

    replacedPlayers.push(newLake);

    return replacePlayers(otherUtils.deepCopy(players), replacedPlayers);
}

const replacePlayers = (players, newPlayers) => {
    // creates a new players array with replaced players
    return players.map((player) => {
        console.log(newPlayers)
        const playerToReplace = newPlayers
            .find(newPlayer => newPlayer.name === player.name);
        if (playerToReplace) {
            return playerToReplace;
        } else {
            return player;
        }
    });
}

/**
 * Sets room state to initial settings, retaining players (but clearing roles)
 */
const resetRoom = (settings, room) => {
    const newRoom = roomUtils.createInitialRoomState(settings, room.name, room.owner);
    newRoom.players = assignRoles();
    return newRoom;
}

module.exports = { reallyUsefulFunction, setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus, setKing, shiftKing, setLake, resetRoom };