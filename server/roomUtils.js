const missionsData = require('./missionsData');
const {deepCopy} = require('./otherUtils');
const enums = require('./enums')
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
    teamVoteResult: enums.TeamVote.NOT_VOTED,
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

const createPlayerObj = (name) => {
  return {
    name: name,
    teamVote: null,
    role: '',
    information: {},
    isKing: false,
    isHammer: false,
  }
}

const createInitialRoomState = (room, host, settings, playerObjArr = undefined) => {
  const { playerCount, lakeSetting } = settings;
  const { numGood, numEvil, doubleFailRequired, missionSizes, voteTrack } = missionsData[playerCount];

  if (!playerObjArr){
    playerObjArr = {[host]: createPlayerObj(host)};
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
    players: playerObjArr,
    boardInfo,
    gameSettings: settings
  });
};

const joinRoom = (roomObj, playerName) => {
  let dup = deepCopy(roomObj);
  dup.players[playerName] = (createPlayerObj(playerName));
  return dup;
}

module.exports = { getRandomFruit, createInitialRoomState, joinRoom };
