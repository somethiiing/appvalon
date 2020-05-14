import axios from 'axios';

const api = '';

const fetchRoomList = () => {
  return axios.get(`${api}/api/getRoomList`);
}

const fetchRoomData = ({room}) => {
  return axios.get(`${api}/api/getRoomData?room=${room}`);
}

const joinRoom = ({name, room}) => {
  return axios.post(`${api}/api/joinRoom`, {name, room});
}

const createRoom = ({settings, host}) => {
  return axios.post(`${api}/api/createRoom`, {data: {type: 'CREATE_ROOM', settings, host}});
}

const dispatchUpdateTeamMembers = ({room, player, teamProposalArray}) => {
  return axios.post(`${api}/api/update`, {
    type: 'UPDATE_TEAM_MEMBERS',
    room,
    player,
    data: { teamProposalArray }
  });
};

const dispatchSubmitForVote = ({room, player}) => {
  return axios.post(`${api}/api/update`, {
    type: 'SUBMIT_FOR_VOTE',
    room,
    player
  });
};

const dispatchSubmitTeamVote = ({room, player, teamVote}) => {
  return axios.post(`${api}/api/update`, {
    type: 'SUBMIT_TEAM_VOTE',
    room,
    player,
    data: { teamVote }
  });
};

const dispatchRevealTeamVote = ({room, player}) => {
  return axios.post(`${api}/api/update`, {
    type: 'REVEAL_TEAM_VOTE',
    room,
    player
  });
};

const dispatchHandleTeamVoteResult = ({room, player}) => {
  return axios.post(`${api}/api/update`, {
    type: 'HANDLE_TEAM_VOTE_RESULT',
    room,
    player
  });
};

const dispatchSubmitMissionVote = ({room, player, missionVote}) => {
  return axios.post(`${api}/api/update`, {
    type: 'SUBMIT_MISSION_VOTE',
    room,
    player,
    data: { missionVote }
  });
};

const dispatchHandleMissionVoteResult = ({room, player}) => {
  return axios.post(`${api}/api/update`, {
    type: 'HANDLE_MISSION_VOTE_RESULT',
    room,
    player
  });
};

const dispatchSubmitAssassination = ({room, player, assassinationTarget}) => {
  return axios.post(`${api}/api/update`, {
    type: 'SUBMIT_ASSASSINATION',
    room,
    player,
    data: { assassinationTarget }
  });
};

const dispatchReconfigureGame = ({room, player}) => {
  return axios.post(`${api}/api/update`, {
    type: 'RECONFIGURE_GAME',
    room,
    player
  });
};

export {
  createRoom,
  joinRoom,
  fetchRoomList,
  fetchRoomData,
  dispatchUpdateTeamMembers,
  dispatchSubmitForVote,
  dispatchSubmitTeamVote,
  dispatchRevealTeamVote,
  dispatchHandleTeamVoteResult,
  dispatchSubmitMissionVote,
  dispatchHandleMissionVoteResult,
  dispatchSubmitAssassination,
  dispatchReconfigureGame
};