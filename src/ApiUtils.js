import axios from 'axios';

const api = 'http://localhost:5000';

const fetchRoomList = () => {
  return axios.get(`${api}/api/getRoomList`);
}

const joinRoom = ({name, room}) => {
  return axios.post(`${api}/api/joinRoom`, {name, room})
}

const createRoom = ({settings, host}) => {
  return axios.post(`${api}/api/createRoom`, {settings, host})
}

export {
  createRoom,
  joinRoom,
  fetchRoomList
};