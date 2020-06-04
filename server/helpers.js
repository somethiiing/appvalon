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
 * Updates the active king based on previous king
 * @param room
 */
const updateKing = (room) => {
    const newRoom = otherUtils.deepCopy(room)

    const currentKing = Object.values(newRoom.players).find(player => player.isKing);
    const nextKingIndex = (newRoom.kingOrder.indexOf(currentKing.name) + 1) % newRoom.kingOrder.length;
    return setKing(newRoom, newRoom.kingOrder[nextKingIndex]);
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
    let missionSuccessCount = 0;
    let missionFailedCount = 0;
    missions.forEach(mission => {
        if (mission.status === enums.MissionStatus.SUCCESS) {
            missionSuccessCount = missionSuccessCount + 1;
        } else if (mission.status === enums.MissionStatus.FAIL) {
            missionFailedCount = missionFailedCount + 1;
        }
    });
    // Game ends
    if (missionSuccessCount >= 3) {
        return enums.GameState.ASSASSINATION;
    } else if (missionFailedCount >= 3) {
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
    let newHammerName;
    const currentMission = getCurrentMission(dup);
    const maxVoteCount = currentMission.maxVoteTrack;
    const currentHammer = Object.values(dup.players).find(player => player.isHammer);

    if(currentHammer){
        // advance hammer if it exists, wrapping at end of array
        const newHammerIndex = (dup.kingOrder.indexOf(currentHammer.name) + 1) % dup.kingOrder.length;
        console.log("index of hammer name: " + newHammerIndex)
        newHammerName = dup.kingOrder[newHammerIndex];
    } else {
        // start of game - set the hammer
        newHammerName =  dup.kingOrder[maxVoteCount - 1];
    }
    console.log("new hammer name: " + newHammerName)

    const newHammer = getPlayer(dup,newHammerName);
    console.log(roomObj)
    if (currentHammer) {
        currentHammer.isHammer = false;
    }
    newHammer.isHammer = true

    return dup;
}

const resetMissionVote = (roomObj) => {
    const dup = otherUtils.deepCopy(roomObj);
    Object.values(dup.players).forEach((player) => {
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

const getAssassin = (roomObj) => {
    const players = roomObj.players
    let assassin = Object.values(players).find(player => player.role === 'assassin');
    assassin = assassin && assassin.name;
    if (!assassin) {
        assassin = Object.values(players).find(player => player.role === 'morgana');
        assassin = assassin && assassin.name;
    }
    if (!assassin) {
        assassin = Object.values(players).find(player => player.role === 'mordred');
        assassin = assassin && assassin.name;
    }
    roomObj.assassin = assassin;
    return roomObj;
}

module.exports = {
    setMissionCount, setVoteTrackCount, shufflePlayers: shuffleKingOrder, assignRoles,
    setStatus, setKing, setLake, updateKing, reinitializeBoard, setTeamMembers, isFailedMission,
    getGameStateBasedOnMissionStatus, isTeamApproved, resetPlayerTeamVotes, getCurrentMission,
    setKingOrder, setSelectedRoles, setHammer, resetMissionVote, addHueToPlayers, getPlayer,
    getAssassin
};
