const serverstate = {
  banana: {
    roomName: 'mango',
    roomOwner: 'alex',
    status: 'WAITING_FOR_PLAYERS',
    createdAt: 0,
    playerCount: 5,
    lakeSettings: 'NONE',
    selectedRoles: ['merlin', 'percival', 'genericGood', 'mordred', 'morgana'],
    players: [
      {
        name: 'alex',

      }
    ],
    boardInfo: {
      playerCount: 5,
      numGood: 3,
      numEvil: 2,
      doubleFailRequired: false,
      missions: [
        {
          count: 1,
          size: 2,
          status: 'NOT_GONE'
        },
        {
          count: 2,
          size: 3,
          status: 'NOT_GONE'
        },
        {
          count: 3,
          size: 3,
          status: 'NOT_GONE'
        },
        {
          count: 4,
          size: 2,
          status: 'NOT_GONE'
        },
        {
          count: 5,
          size: 3,
          status: 'NOT_GONE'
        }
      ]
    },
    kingOrder: ['alex', 'bridget', 'chris', 'david', 'elliot'],
    currentMission: 1,
    voteTrack: 1,
    proposedTeam: [],
    teamVoteResults: null,
    missionVote: ['SUCCESS', 'FAIL', 'SUCCESS', 'SUCCESS']
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
  lakeSettings: 'ROLE', // ROLE, ALIGNMENT, NONE

}

interface Room {
  roomName: string;
  roomOwner: string;
  status: string;
  createdAt: number;
  playerCount: number;
  lakeSettings: LakeSettings;
  selectedRoles: [Roles];
  players: [Player];
  boardInfo: BoardInfo;
  kingOrder: [string];
  voteTrack: number;
  proposedTeam: [string];
  currentMission: number;
  teamVoteResults: boolean; // true === approve, false === reject, undefined === not gone?
  missionVote: [MissionVote];
}

interface Player {
  name: string;
  teamVote: boolean;
  role: [];
  information: {}; // stuff they know
  isKing: boolean;
  isHammer: boolean;
}

interface BoardInfo {
  playerCount: number;
  numGood: number;
  numEvil: number;
  doubleFailRequired: boolean;
  missions: [Mission]
}

interface Mission {
  count: 1,
  size: number;
  status: MissionStatus;
}

enum Roles {
  merlin, percival, tristan, iseult, genericGood,
  mordred, morgana, assassin, oberon, noberon, genericEvil
}

enum MissionStatus {
  SUCCESS, FAIL, NOT_GONE
}

enum TeamVote {
  APPROVE, REJECT
}

enum MissionVote {
  SUCCESS, FAIL, REVERSE
}

enum LakeSettings {
  ROLE, ALIGNMENT, NONE
}
