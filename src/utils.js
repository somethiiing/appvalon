const checkTimeExpiration = (time) => {
  return time < Date.now();
}

const setRelogToken = ({ player, room }) => {
  if (window && window.localStorage) {
    window.localStorage.setItem('player', player);
    window.localStorage.setItem('room', room);
  }
}

export { checkTimeExpiration, setRelogToken }