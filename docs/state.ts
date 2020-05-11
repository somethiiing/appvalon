// serverstate = {
//   rooms: {
//     banana: Room
//   }
// }

interface Room {
  roomName: string;
  roomOwner: string;
  status: string;
  createdAt: number;
  playerCount: number;
  selectedRoles: [Roles];
  players: [Player];
  boardInfo: BoardInfo;
  kingOrder: [string];
  voteTrack: number;
  proposedTeam: [string];
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
  size: number;
  status: MissionStatus;
}

enum Roles {
  merlin, percival, tristan, iseult, genericGood,
  mordred, morgana, assassin, genericEvil
}

enum MissionStatus {
  SUCCESS, FAIL, NOT_GONE
}

enum MissionVote {
  SUCCESS, FAIL, REVERSE
}