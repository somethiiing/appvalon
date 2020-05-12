// const {  } = require('');

// changeStatus(obj, newStatus)
// submitTeamVote(obj, player, vote)

// const submitTeamVote = (state: Room, player: string, vote: string) : Room

const reallyUsefulFunction = () => true;

module.exports = {
  reallyUsefulFunction
};

/**
 * Sets the status of the room
 * @param {Room} room
 * @param {GameStatus} status
 */
const setStatus = (room, status) => {
  let dup = otherUtils.deepCopy(room);
  dup.status = status;
  return dup;
}

module.exports = { setStatus }