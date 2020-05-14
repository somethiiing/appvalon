const Roles = {
    MERLIN: "merlin",
    PERCIVAL: "percival",
    TRISTAN: "tristan",
    ISEULT: "iseult",
    GENERIC_GOOD: "genericGood",
    MORDRED: "mordred",
    MORGANA: "morgana",
    ASSASSIN: "assassin",
    GENERIC_EVIL: "genericEvil",
    NONE: ""
};

Object.freeze(Roles)

const MissionStatus = {
    SUCCESS: "success",
    FAIL: "fail",
    NOT_GONE: "notGone"
};

Object.freeze(MissionStatus)

const TeamVote = {
    APPROVE: "approve",
    REJECT: "reject",
    NOT_VOTED: "notVoted"
};

Object.freeze(TeamVote)

const MissionVote = {
    SUCCESS: "success",
    FAIL: "fail",
    REVERSE: "reverse"
}

Object.freeze(MissionVote)

const LakeSettings = {
    ROLE: "ROLE",
    ALIGNMENT: "ALIGNMENT",
    NONE: "NONE"
}

Object.freeze(LakeSettings)

const GameState = {
    // admin is configuring the room
    ROOM_SETUP: "ROOM_SETUP",
    // players are proposing a team
    TEAM_PROPOSAL: "TEAM_PROPOSAL",
    // waiting for players to ????
    WAITING_FOR_PLAYERS: "WAITING_FOR_PLAYERS",
    // waiting for players to vote on a team
    TEAM_VOTE: "TEAM_VOTE",
    // displaying the results of the team proposal vote
    DISPLAY_TEAM_VOTE: "DISPLAY_TEAM_VOTE",
    // players are voting on success/fail of mission
    MISSION_VOTE: "MISSION_VOTE",
    // reveal the results of the mission
    DISPLAY_MISSION_VOTE: "DISPLAY_MISSION_VOTE",
    // handle results of the mission proposal vote
    HANDLE_MISSION_VOTE_RESULT: "HANDLE_MISSION_VOTE_RESULT",
    // exactly what it says on the tin
    GAME_END: "GAME_END",
    // assassination
    ASSASSINATION: "ASSASSINATION",
    // evil has won the game
    EVIL_WIN: "EVIL_WIN",
    // good has won the game
    GOOD_WIN: "GOOD_WIN"
}

module.exports = { Roles, MissionStatus, TeamVote, MissionVote, LakeSettings, GameState };