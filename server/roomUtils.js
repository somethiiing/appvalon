const missionsData = require('./missionsData');
const rolesData = require('./roleAssignmentData');
const helpers = require('./helpers');

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

const handleTeamVoteResult = (room, vote)

const submitAssassination = (room, target) => {
  let success = false;
  for (let player of room.players) {
    if (player.name === target && player.role === rolesData.merlin.roleTitle) {
      success = true;
      break;
    }
  }
  if(success) {
    return helpers.setStatus(room, "EVIL_WIN");
  } else {
    return helpers.setStatus(room, "GOOD_WIN");
  }
}

module.exports = { getRandomFruit, createInitialRoomState }