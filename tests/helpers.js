const assert = require('chai').assert;
const enums = require('../server/enums');

const { setMissionCount, setVoteTrackCount, shufflePlayers, assignRoles, setStatus, setKing, setLake, setTeamMembers, reinitializeBoard, resetRoom, isFailedMission, getGameStateBasedOnMissionStatus, isTeamApproved, resetPlayerTeamVotes, getCurrentMission, setHammer } = require('../server/helpers');
const { inProgress, fivePlayerGameSettings, resetBoard, missionVote } = require('./sample_server_states');

describe.only('#setMissionCount', () => {
    const initial_state = inProgress;
    const result = setMissionCount(initial_state, 2);
    it('should set mission count', () => {
        assert.equal(result.currentMission, 2);
    })
    it('should not mutate old mission', () => {
        assert.notEqual(initial_state.currentMission, result.currentMission)
    })
});

describe.only('#setVoteTrackCount', () => {
    const initial_state = inProgress;
    const result = setVoteTrackCount(initial_state, 2)
    it('should set vote track count', () => {
        assert.equal(result.voteTrack, 2)
    })
    it('should not mutate old room', () => {
        assert.notEqual(result.voteTrack, initial_state.voteTrack)
    })
});

describe.only('#setHammer', () => {
    const initial_state = inProgress;
    const result = setHammer(initial_state)
    it('should set vote track count', () => {
        assert.equal(Object.values(result.players).find(player => player.isHammer).name, result.kingOrder[4])
    })
});

describe.only('#shufflePlayers', () => {
    const initial_state = inProgress;
    const result = shufflePlayers(initial_state)
    it('should create a new array of shuffled players', () => {
        // comparing references is fine - could set the random seed but w/e
        assert.notEqual(initial_state.players, result.players)
    })
});

describe.only('#assignRoles', () => {
    const initial_state = inProgress;
    it('assigns all players new roles', () => {

    })
});

describe.only('#setStatus', () => {
    const initial_state = inProgress;
    const result = setStatus(initial_state, enums.GameState.TEAM_PROPOSAL);
    it('should not mutate original room', () => {
        assert.equal(result.status, enums.GameState.TEAM_PROPOSAL);
    })
});

describe.only('#setTeamMembers', () => {
    const initial_state = inProgress;
    const proposedPlayers = ['ashwin','jason','niyati'];
    const result = setTeamMembers(initial_state, proposedPlayers);
    it('should update team members', () => {
        assert.deepEqual(result.proposedTeam, proposedPlayers);
    })
    it('should not mutate original room', () => {
        assert.notEqual(result.proposedTeam, initial_state.proposedPlayers);
    })
});

// describe.only('#setKing', () => {
//     const initial_state = inProgress;
//     const oldKingName = initial_state.players[0].name;
//     const newKingName = initial_state.players[1].name;
//     const result = setKing(initial_state, newKingName);

//     it('should elect a new king', () => {
//         const newKing = result.players.find((player) => player.isKing);
//         assert.exists(newKing);
//         assert.equal(newKing.name, newKingName);
//     })
//     it('should depose the old king', () => {
//         const oldKing = (result.players.find((player) => player.name == oldKingName));
//         assert.exists(oldKing);
//         assert.equal(oldKing.name, oldKingName);
//     })
//     it('should not mutate the original players list', () => {
//         assert.notDeepEqual(initial_state.players, result);
//     })
// });

// describe.only('#setLake', () => {
//     const initial_state = inProgress;
//     initial_state.players[0].isLake = true;
//     const oldLakeName = initial_state.players[0].name;
//     const newLakeName = initial_state.players[1].name;
//     const result = setLake(initial_state, newLakeName);

//     it('should elect a new lake', () => {
//         const newLake = result.players.find((player) => player.isLake);
//         assert.exists(newLake);
//         assert.equal(newLake.name, newLakeName);
//     })
//     it('should depose the old lake', () => {
//         const oldLake = (result.players.find((player) => player.name == oldLakeName));
//         assert.exists(oldLake);
//         assert.equal(oldLake.name, oldLakeName);
//     })
//     it('should not mutate the original players list', () => {
//         assert.notDeepEqual(initial_state.players, result);
//     })
// });

// describe.only('#reinitializeBoard', () => {
//     const initial_state = inProgress;
//     const result = reinitializeBoard(initial_state, fivePlayerGameSettings);

//     it('should have the same name and owner', () => {
//         assert.equal(result.roomName, resetBoard.roomName)
//         assert.equal(result.roomOwner, resetBoard.roomOwner)
//     })
//     it('should have an accurate player count', () => {
//         assert.equal(result.playerCount, resetBoard.playerCount)
//     })
//     it('should have accurate lake settings', () => {
//         assert.equal(result.lakeSetting, resetBoard.lakeSetting)
//     })
//     it('should have the same players without roles or information', () => {
//         assert.deepEqual(result.players,  resetBoard.players)
//     })
//     it('should reset mission and vote track', () => {
//         assert.equal(result.voteTrack, resetBoard.voteTrack)
//         assert.equal(result.currentMission, resetBoard.currentMission)
//     })
// });


// describe.only('isFailedMission', () => {
//     const missionVotes1 = { success: 2, fail: 1, reverse: 0 };
//     const result1 = isFailedMission(missionVotes1, false);

//     it('one fail vote causes mission failure in single fail required', () => {
//         assert.equal(result1, true)
//     })

//     const missionVotes2 = { success: 1, fail: 1, reverse: 0 };
//     const result2 = isFailedMission(missionVotes2, true);

//     it('one fail vote doesnt causes mission failure in double fail required', () => {
//         assert.equal(result2, false)
//     })

//     const missionVotes3 = { success: 1, fail: 1, reverse: 1 };
//     const result3 = isFailedMission(missionVotes3, false);

//     it('reverse causes failed mission to succeed', () => {
//         assert.equal(result3, false)
//     })

//     const missionVotes4 = { success: 1, fail: 1, reverse: 2 };
//     const result4 = isFailedMission(missionVotes4, false);

//     it('double reverse negates any reverse', () => {
//         assert.equal(result4, true)
//     })
// });

// const missionCreator = (missionStatuses) => {
//     const missions = [];
//     missionStatuses.forEach(missionStatus => {
//         missions.push({status: missionStatus});
//     })
//     return missions;
// }

// describe.only('getGameStateBasedOnMissionStatus', () => {
//     const missionStatus1 = missionCreator([enums.MissionStatus.FAIL, enums.MissionStatus.SUCCESS,
//         enums.MissionStatus.SUCCESS, enums.MissionStatus.SUCCESS,]);

//     const result1 = getGameStateBasedOnMissionStatus(missionStatus1);
//     it('3 successes moves the game to assassination', () => {
//         assert.equal(result1, enums.GameState.ASSASSINATION);
//     })

//     const missionStatus2 = missionCreator([enums.MissionStatus.FAIL, enums.MissionStatus.SUCCESS,
//         enums.MissionStatus.FAIL, enums.MissionStatus.FAIL,]);

//     const result2 = getGameStateBasedOnMissionStatus(missionStatus2);
//     it('3 failures moves the game to evil win', () => {
//         assert.equal(result2, enums.GameState.EVIL_WIN);
//     })

//     const missionStatus3 = missionCreator([enums.MissionStatus.FAIL, enums.MissionStatus.SUCCESS]);

//     const result3 = getGameStateBasedOnMissionStatus(missionStatus3);
//     it('game moves to team proposal if 3 failures or successes have not been reached', () => {
//         assert.equal(result3, enums.GameState.TEAM_PROPOSAL);
//     })
// });

// const playerVoteCreator = (playerVotes) => {
//     const players = [];
//     playerVotes.forEach(vote => {
//         players.push({teamVote: vote});
//     })
//     return players;
// }
// describe.only('isTeamApproved', () => {
//     const votes1 = playerVoteCreator([enums.TeamVote.APPROVE, enums.TeamVote.APPROVE,
//         enums.TeamVote.APPROVE, enums.TeamVote.REJECT, enums.TeamVote.REJECT]);
//     const isApproved1 = isTeamApproved(votes1);

//     it('majority approval votes means team is approved', () => {
//         assert.equal(isApproved1, true);
//     })

//     const votes2 = playerVoteCreator([enums.TeamVote.APPROVE, enums.TeamVote.APPROVE,
//         enums.TeamVote.REJECT, enums.TeamVote.REJECT, enums.TeamVote.REJECT]);
//     const isApproved2 = isTeamApproved(votes2);

//     it('majority reject votes means team is not approved', () => {
//         assert.equal(isApproved2, false);
//     })

//     const votes3 = playerVoteCreator([enums.TeamVote.APPROVE, enums.TeamVote.APPROVE, enums.TeamVote.APPROVE,
//         enums.TeamVote.REJECT, enums.TeamVote.REJECT, enums.TeamVote.REJECT]);
//     const isApproved3 = isTeamApproved(votes3);

//     it('equal votes means team is not approved', () => {
//         assert.equal(isApproved3, false);
//     })
// });

// describe.only('resetPlayerTeamVotes', () => {
//     const players = playerVoteCreator([enums.TeamVote.APPROVE, enums.TeamVote.APPROVE,
//         enums.TeamVote.APPROVE, enums.TeamVote.REJECT, enums.TeamVote.REJECT]);
//     const resetPlayers = resetPlayerTeamVotes(players);

//     it('players votes should be reset to NOT_VOTED', () => {
//         resetPlayers.forEach( player => {
//             assert.equal(player.teamVote, enums.TeamVote.NOT_VOTED);
//         })
//     })
// });

// describe.only('getCurrentMission', () => {
//     const currentMission = getCurrentMission(missionVote);

//     it('currentMission should be returned', () => {
//         assert.equal(currentMission.size, 2);
//     })
// });