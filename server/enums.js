const Roles = {
    MERLIN: "merlin",
    PERCIVAL: "percival",
    TRISTAN: "tristan",
    ISEULT: "iseult",
    GENERIC_GOOD: "genericGood",
    MORDRED: "mordred",
    MORGANA: "morgana",
    ASSASSIN: "assassin",
    GENERIC_EVIL: "genericEvil"
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
    ROLE: "role",
    ALIGNMENT: "alignment",
    NONE: "none"
}

Object.freeze(LakeSettings)

const GameState = {
    // admin is configuring the room
    ROOM_SETUP: "roomSetup",
    // players are proposing a team
    TEAM_PROPOSAL: "teamProposal",
    // waiting for players to ????
    WAITING_FOR_PLAYERS: "waitingForPlayers",
    // waiting for players to vote on a team
    TEAM_VOTE: "teamVote",
    // displaying the results of the team proposal vote
    DISPLAY_TEAM_VOTE: "displayTeamVote",
    // handle results of the team proposal vote
    HANDLE_TEAM_VOTE_RESULT: "handleTeamVoteResult",
    // players are voting on success/fail of mission
    MISSION_VOTE: "missionVote",
    // exactly what it says on the tin
    GAME_END: "gameEnd"
}

module.exports = { Roles, MissionStatus, TeamVote, MissionVote, LakeSettings, GameState };