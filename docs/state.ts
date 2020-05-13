const serverstate = {
  mango: {
    "host": "test2",
    "room": "mango",
    "player": "",
    "teamProposalArray": "",
    "teamVote": "REJECT",
    "missionVote": "SUCCESS",
    "roomList": [
      "blueberry",
      "pomelo",
      "pineapple",
      "tangerine",
      "watermelon"
    ],
    "roomState": {
      "roomName": "pamelo",
      "roomOwner": "asdf",
      "status": "WAITING_FOR_PLAYERS",
      "createdAt": 1589356303551,
      "playerCount": 5,
      "lakeSetting": "ROLE",
      "selectedRoles": [],
      "players": [
        {
          "name": "asdf",
          "teamVote": null,
          "role": "",
          "information": {},
          "isKing": false,
          "isHammer": false
        }
      ],
      "boardInfo": {
        "playerCount": 5,
        "numGood": 3,
        "numEvil": 2,
        "doubleFailRequired": false,
        "missions": [
          {
            "count": 1,
            "size": 2,
            "status": "NOT_GONE",
            "maxVoteTrack": 5
          },
          {
            "count": 2,
            "size": 3,
            "status": "NOT_GONE",
            "maxVoteTrack": 5
          },
          {
            "count": 3,
            "size": 2,
            "status": "NOT_GONE",
            "maxVoteTrack": 5
          },
          {
            "count": 4,
            "size": 3,
            "status": "NOT_GONE",
            "maxVoteTrack": 5
          },
          {
            "count": 5,
            "size": 3,
            "status": "NOT_GONE",
            "maxVoteTrack": 5
          }
        ]
      },
      "kingOrder": [],
      "currentMission": 1,
      "voteTrack": 1,
      "proposedTeam": [],
      "teamVoteResult": null,
      "missionVote": {
        "success": 0,
        "fail": 0,
        "reverse": 0
      }
    }
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
  selectedRoles: [Role];
  players: [Player];
  boardInfo: BoardInfo;
  kingOrder: [string];
  voteTrack: number;
  proposedTeam: [string];
  currentMission: number;
  teamVoteResult: boolean; // true === approve, false === reject, undefined === not voted?
  missionVote: MissionVote;
}

interface Player {
  name: string;
  teamVote: boolean;
  role: Role;
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
  count: number;
  size: number;
  status: MissionStatus;
  maxVoteTrack: number;
}

interface MissionVote {
  success: number;
  fail: number;
  reverse: number;
}

enum Role {
  merlin, percival, tristan, iseult, genericGood,
  mordred, morgana, assassin, oberon, noberon, genericEvil
}

enum MissionStatus {
  SUCCESS, FAIL, NOT_GONE
}

enum TeamVote {
  APPROVE, REJECT
}

enum LakeSettings {
  ROLE, ALIGNMENT, NONE
}


const test = {
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
      teamVote: 'APPROVE',
      role: 'Role',
      information: {}, // stuff they know
      isKing: false,
      isHammer: false
    },
    {
      name: 'bridget',
      teamVote: 'APPROVE',
      role: 'Role',
      information: {}, // stuff they know
      isKing: false,
      isHammer: false
    },
    {
      name: 'chris',
      teamVote: 'APPROVE',
      role: 'Role',
      information: {}, // stuff they know
      isKing: false,
      isHammer: false
    },
    {
      name: 'david',
      teamVote: 'APPROVE',
      role: 'Role',
      information: {}, // stuff they know
      isKing: false,
      isHammer: false
    },
    {
      name: 'elliot',
      teamVote: 'APPROVE',
      role: 'Role',
      information: {}, // stuff they know
      isKing: false,
      isHammer: false
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
        status: 'SUCCESS'
      },
      {
        count: 2,
        size: 3,
        status: 'FAIL'
      },
      {
        count: 3,
        size: 3,
        status: 'SUCCESS'
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
};
