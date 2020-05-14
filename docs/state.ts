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
      "players": {
        "asdf": {
          "name": "asdf",
          "teamVote": null,
          "role": "",
          "information": {},
          "isKing": false,
          "isHammer": false
        }
      },
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
  "roomName": "mango", // room name - used for all api calls
  "roomOwner": "alex", // room owner - used for forcing votes/afk,etc
  "status": "TEAM_PROPOSAL", // controls action area
  "createdAt": 1589336585126, // probably not useful, but just in case
  "playerCount": 5, // mostly state stuff, determines # of good/evil
  "lakeSetting": "NONE", // lake setting, lake role/alignment/none
  "selectedRoles": [ // list of roles that are used in this game.
    'percival',
    'morgana',
    'mordred',
    'merlin',
    'genericGood'
  ],
  "players": { // object used for live object lookup. player name is key, 
    "alex": {
      "role": "mordred",
      "name": "alex",
      "sees": {
        "morgana": {
          "role": "morgana",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jason"
            ]
          }
        }
      },
      "isKing": true
    },
    "wilson": {
      "role": "percival",
      "name": "wilson",
      "sees": {
        "merlin": {
          "role": "merlin",
          "alignment": "unknown",
          "knowsRole": false,
          "players": {
            "assigned": [
              "bridget"
            ]
          }
        },
        "morgana": {
          "role": "morgana",
          "alignment": "unknown",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jason"
            ]
          }
        }
      }
    },
    "bridget": {
      "role": "merlin",
      "name": "bridget",
      "sees": {
        "morgana": {
          "role": "morgana",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jason"
            ]
          }
        }
      }
    },
    "jason": {
      "role": "morgana",
      "name": "jason",
      "sees": {
        "mordred": {
          "role": "mordred",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "alex"
            ]
          }
        }
      }
    },
    "ashwin": {
      "role": "genericGood",
      "name": "ashwin",
      "sees": {}
    }
  },
  "boardInfo": {
    "playerCount": 5, // total # of players
    "numGood": 3, // number of good on a team
    "numEvil": 2, // number of evil on a team
    "doubleFailRequired": false, // double fail on mission 4
    "missions": [
      {
        "count": 1, // mission number
        "size": 2, // size of mission
        "status": "NOT_GONE", // status of mission: NOT_GONE, SUCCESS, FAIL
        "maxVoteTrack": 5 // max # of picks on a mission, used for thavalon. defaults to 5 for normal avalon
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
  "kingOrder": [ // order for rendering players. first person is always king
    "bridget",
    "wilson",
    "alex",
    "jason",
    "ashwin"
  ],
  "currentMission": 1, // what mission # we're on
  "voteTrack": 1, // how many team proposals its been
  "proposedTeam": [], // team proposal array, list of strings
  "teamVoteResult": null, // result of most recent vote
  "missionVote": { // count of mission votes
    "success": 0,
    "fail": 0,
    "reverse": 0
  }
};
