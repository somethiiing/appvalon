const otherUtils = require( "./otherUtils");

const missionsData = require('./missionsData');
const helpers = require('./helpers');
const enums = require('../server/enums');

const fruits = {
  'apple': false,
  'apricot': false,
  'avocado': false,
  'banana': false,
  'blackberry': false,
  'blueberry': false,
  'cantaloupe': false,
  'cherry': false,
  'clementine': false,
  'coconut': false,
  'cranberry': false,
  'cucumber': false,
  'currant': false,
  'date': false,
  'dragonfruit': false,
  'durian': false,
  'eggplant': false,
  'elderberry': false,
  'fig': false,
  'grape': false,
  'grapefruit': false,
  'guava': false,
  'honeydew': false,
  'jackfruit': false,
  'jujube': false,
  'kiwi': false,
  'kumquat': false,
  'lemon': false,
  'lime': false,
  'lychee': false,
  'mango': false,
  'nectarine': false,
  'nut': false,
  'olive': false,
  'orange': false,
  'pamelo': false,
  'papaya': false,
  'passionfruit': false,
  'peach': false,
  'pear': false,
  'pineapple': false,
  'plum': false,
  'pomelo': false,
  'raisin': false,
  'raspberry': false,
  'strawberry': false,
  'tangerine': false,
  'tomato': false,
  'watermelon': false,
  'yuzu': false
};

const defaultState = {
  roomName: '',
  roomOwner: '',
  status: 'WAITING_FOR_PLAYERS',
  createdAt: 0,
  playerCount: 0,
  lakeSetting: 'NONE',
  selectedRoles: [],
  players: [],
  boardInfo: {
    playerCount: 5,
    numGood: 3,
    numEvil: 2,
    doubleFailRequired: false,
    missions: []
  },
  kingOrder: [],
  currentMission: 1,
  voteTrack: 1,
  proposedTeam: [],
  teamVoteResult: null,
  missionVote: {
    success: 0,
    fail: 0,
    reverse: 0
  }
}

const FESettingsObj = {
  playerCount: 5,
  selectedRoles: {
    merlin: true, //bool
    percival: true, //bool
    tristan: false, //bool
    iseult: false, //bool
    genericGood: true, //bool
    numGenGood: 2, //num

    assassin: true, //bool
    mordred: true, //bool
    morgana: true, //bool
    oberon: false, //bool
    noberon: false, //bool
    genericEvil: false, //bool
    numGenEvil: 0 //num
  },
  lakeSetting: 'ROLE', // ROLE, ALIGNMENT, NONE
}

const checkFruitsFull = () => {
  let keys = Object.keys(fruits);
  for (let i = 0; i < keys.length; i++) {
    if (!fruits[keys[i]]) { return false; }
  }
  return true;
}

const getRandomFruit = () => {
  if (checkFruitsFull()) { return null; }

  let randomizer = true;
  let keys = Object.keys(fruits);
  let randomFruit = keys[Math.floor(Math.random() * keys.length)];

  while(randomizer) {
    if (fruits[randomFruit] === true) {
      randomFruit = keys[Math.floor(Math.random() * keys.length)];
    } else {
      randomizer = false;
    }
  }
  fruits[randomFruit] = true;

  return randomFruit;
}

const createInitialRoomState = (room, host, settings) => {
  const { playerCount, lakeSetting } = settings;
  const { numGood, numEvil, doubleFailRequired, missionSizes, voteTrack } = missionsData[playerCount];

  const playerObj = {
    name: host,
    teamVote: null,
    role: '',
    information: {},
    isKing: false,
    isHammer: false,
  }

  const boardInfo = {
    playerCount,
    numGood,
    numEvil,
    doubleFailRequired,
    missions: missionSizes.map( (size, index) => {
      return {
        count: index + 1,
        size,
        status: 'NOT_GONE',
        maxVoteTrack: voteTrack[index]
      };
    })
  }

  return Object.assign({}, defaultState, {
    roomName: room,
    roomOwner: host,
    createdAt: Date.now(),
    playerCount,
    lakeSetting,
    players: [playerObj],
    boardInfo
  });
};

const submitForVote = (room) => {
  return helpers.setStatus(room, enums.GameState.TEAM_VOTE);
}

const submitTeamVote = (room, player, vote) => {
  let newRoom = otherUtils.deepCopy(room);
  newRoom.players.forEach(p => {
    if (p.name === player) {
      p.teamVote = vote;
    }
  })
  return newRoom;
}

const revealTeamVote = (room) => {
  return helpers.setStatus(room, enums.GameState.DISPLAY_TEAM_VOTE);
}

const handleTeamVoteResult = (room) => {
  let newRoom = otherUtils.deepCopy(room);
  let failCount = 0;
  let successCount = 0;
  newRoom.players.forEach(player => {
    if (player.teamVote === enums.TeamVote.APPROVE) {
      successCount++;
    } else if (player.teamVote === enums.TeamVote.REJECT) {
      failCount++;
    }
  });
  // Team approved
  if (successCount > failCount) {
    return helpers.setStatus(newRoom, enums.GameState.MISSION_VOTE);
  } else {
    // Team not approved
    if (newRoom.voteTrack === 5) {
      return helpers.setStatus(newRoom, enums.GameState.GAME_END)
    }
    newRoom.voteTrack++;
    newRoom = helpers.shiftKing(newRoom)
    return helpers.setStatus(newRoom, enums.GameState.TEAM_PROPOSAL);
  }
}

const submitMissionVote = (room, player, vote) => {
  const newRoom = otherUtils.deepCopy(room);
  newRoom.missionVote.push(vote);
  newRoom.voteTrack++;
  // Max votes reached
  if (newRoom.voteTrack === newRoom.boardInfo.missions[newRoom.currentMission-1].maxVoteTrack) {
    newRoom.status = enums.GameState.HANDLE_MISSION_VOTE_RESULT;
  }
  return newRoom;
}

const handleMissionVoteResult = (room) => {
  let newRoom = otherUtils.deepCopy(room);
  const failCount = newRoom.missionVote.filter( i => i === enums.MissionVote.FAIL).length;
  const reverseCount = newRoom.missionVote.filter( i => i === enums.MissionVote.REVERSE).length;
  let failed = false;
  // check if mission was successful
  if ((!newRoom.boardInfo.doubleFailRequired && failCount > 0) ||
      (newRoom.boardInfo.doubleFailRequired && failCount > 1)) {
    failed = true;
  }
  // reverse logic
  if (reverseCount > 0 && reverseCount % 2 === 1) {
      failed = !failed;
  }

  if (failed) {
    newRoom.boardInfo.missions[newRoom.currentMission-1].status = enums.MissionStatus.FAIL;
  } else {
    newRoom.boardInfo.missions[newRoom.currentMission-1].status = enums.MissionStatus.SUCCESS;
  }
  // Check if the game ends
  let missionFailedCount = 0;
  let missionSuccessCount = 0;
  newRoom.missions.forEach(mission => {
    if (mission.status === enums.MissionStatus.SUCCESS) {
      missionSuccessCount++;
    } else if (mission.status === enums.MissionStatus.FAIL) {
      missionFailedCount++;
    }
  })

  // Game ends
  if (missionSuccessCount === 3) {
    newRoom.status = enums.GameState.ASSASSINATION;
  } else if (missionFailedCount === 3) {
    newRoom.status = enums.GameState.EVIL_WIN;
  } else {
    // If the game continues
    newRoom.currentMission++;
    newRoom.voteTrack = 0;
    newRoom = helpers.shiftKing(newRoom);
    newRoom.status = enums.GameState.TEAM_PROPOSAL;
  }

  return newRoom;
}

const submitAssassination = (room, target) => {
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

module.exports = { getRandomFruit, createInitialRoomState, submitMissionVote, submitAssassination }