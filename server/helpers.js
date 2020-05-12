const otherUtils = require('./otherUtils.js');
const enums = require('./enums.js');

// changeStatus(obj, newStatus)
// submitTeamVote(obj, player, vote)

// const submitTeamVote = (state: Room, player: string, vote: string) : Room

const reallyUsefulFunction = () => true;

/**
 * create a new game based provided settings
 * @param {FESettingsObj} settings provided by admin
 */
const initializeGame = (settingsObj, playerNames, ownerName) => {

}

/**
 * 
 * @param {FESettingsObj} settingsObj 
 * @param {[string]} playerNames 
 * @param {string} ownerName 
 */
const createRoom = (settingsObj, playerNames, ownerName) => {
    const room = {};
    room.name = "RANDOM_FRUITY_NAME";
    room.owner = ownerName;
    room.status = enums.GameState.WAITING_FOR_PLAYERS;
    room.selectedRoles = pickRoles(settingsObj);
    room.createdAt = Math.round((new Date()).getTime() / 1000);
    room.playerCount = playerNames.length;
    room.players = createPlayers(playerNames);
    room.boardInfo = createBoardInfo(settingsObj);
    room.kingOrder = shufflePlayers(room.players);
    room.currentMission = 1;
    room.voteTrack = 1;
    room.proposedTeam = [];
    room.teamVoteResults = null;
    room.missionVote = [];
    return room;
}

const createBoardInfo = (settingsObj) => {
    //todo: create from static JSON file
}

const createPlayers = (playerNames) => {
    return playerNames.map(createPlayer);
}

const createPlayer = (playerName) => {
    const player = {};
    player.name = playerName;
    player.isKing = false;
    player.isLake = false;
    return player;
}

/**
 * Sets the number of missions that have been approved
 */
const setMissionCount = (mission, count) => {
    let dup = otherUtils.deepCopy(mission)
    dup.count = count;
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
 * @param {[Roles]} availableRoles 
 */
const assignRoles = (players, availableRoles) => {
    let playerDup = otherUtils.deepCopy(players);
    let allRoles = generateAllRoles(availableRoles);

    otherUtils.shuffle(playerDup);
    otherUtils.shuffle(allRoles);

    for (let i = 0; index < playerDup.length; i++) {
        let player = playerDup[index];
        player.role = allRoles[i]
    }

    //todo: add logic for player information (ect merlin sees these people, evil sees Hannah, ect..)

    return playerDup;
}

/**
 * Sets the status of the room
 * @param {Room} room 
 * @param {} status 
 */
const setStatus = (room, status) => {
    // throw an error here or otherwise get cranky if the status
    // does not exist on the enums file

    let dup = otherUtils.deepCopy(room);
    dup.status = status;
}

// todo: mechanism to enforce that when a king is appointed, old king
// is cleared

/**
 * Sets designated player as king (THERE CAN ONLY BE ONE!)
 * @param {} player
 */
const setKing = (player, players) => {
    let dup = otherUtils.deepCopy(player);
    dup.isKing = true;
    return dup;
}

/**
 * Sets designated player as lake (THERE CAN ONLY BE ONE!)
 * @param {} player
 */
const setLake = (player) => {
    let dup = otherUtils.deepCopy(player);
    dup.isLake = true;
    return dup;
}

/**
 * Generates list of roles, with duplicates for generic good and generic bad
 * @param {[Roles]} availableRoles - all roles admin has chosen
 * @param {number} totalGenericEvil - number of generic evil in game
 * @param {number} totalPlayers - total number of players
 */
const generateAllRoles = (availableRoles, totalGenericEvil, totalPlayers) => {
    // do some error checking here to make sure there aren't more
    // available roles than players
    let roles = [].concat(availableRoles)

    // we already added a Generic Evil when concatting
    for (let i = 1; i < totalGenericEvil; i++) {
        roles.push(enums.Roles.GENERIC_EVIL);
    }
    let genericGoodCount = totalPlayers - (availableRoles.count +
        totalGenericEvil);
    for (let i = 0; i < genericGoodCount; i++) {
        roles.push(enums.Roles.GENERIC_GOOD);
    }
    return roles;
}

const pickRoles = (settingsObj) => {
    const roles = {};
    const selectedRoles = settingsObj.selectedRoles;
    for (const roleName in settingsObj.selectedRoles) {
        if (selectedRoles.hasOwnProperty(roleName)) {
            const roleValue = selectedRoles[roleName];
            if (roleName === enums.Roles.GENERIC_GOOD || roleName === enums.Roles.GENERIC_EVIL) {
                otherUtils.times(roleValue, (roleName) => roles.push(roleName))
            } else if (Object.keys(enums.Roles).includes(roleName) && roleValue) {
                roles.push(roleName);
            } else {
                console.error(`could not find role : ${key} in Roles enum`)
            }
        }
    }
    if (roles.length != settingsObj.playerCount) {
        throw "Incorrect role assignment: number of roles does not match number of players!";
    }
    return roles;
}

/**
 * Sets room state to initial settings, retaining players (but clearing roles)
 */
const resetRoom = () => {

}

module.exports = { reallyUsefulFunction };