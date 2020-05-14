const rolesData = require('./roleAssignmentData');
const otherUtils = require('./otherUtils');

function generateRoleList(settings) {
  let result = [];
  console.log("creating roles with settings: " + JSON.stringify(settings), null, 2)
  const { selectedRoles } = settings;
  const { genericGood, genericEvil, numGenEvil, numGenGood } = selectedRoles;
  let rolesKeys = Object.keys(selectedRoles);
  rolesKeys.forEach( role => {
    if (selectedRoles[role] === true && !(role === 'genericGood' || role === 'genericEvil')) {
      result.push(role);
    }
  });

  if(genericGood) result = result.concat(new Array(numGenGood).fill('genericGood'));
  if(genericEvil) result = result.concat(new Array(numGenEvil).fill('genericEvil'));

  return result;
};

function roleNumberCheck(rolesList, settings) {
  let goodCounter = 0;
  let evilCounter = 0;

  rolesList.forEach( role => {
    rolesData[role].alignment === 'good' ? goodCounter++ : evilCounter++;
  });

  return (goodCounter + evilCounter) === settings.playerCount;
};

function assignRoles(playerList, roleList) {
  let assignedPlayersObj = {};
  let assignedRolesObj = {};

  roleList.forEach( (role, ind) => {
    assignedRolesObj[role] = assignedRolesObj[role] || {};
    assignedRolesObj[role].assigned = assignedRolesObj[role].assigned || [];
    assignedRolesObj[role].assigned.push(playerList[ind]);

    assignedPlayersObj[ playerList[ind] ] = {
      role,
      name: playerList[ind],
      sees: {},
      alignment: rolesData[role].alignment
    };

  });

  return { assignedPlayersObj, assignedRolesObj }
};

function assignSeenData(playerData, assignedRolesObj) {
  let { role, sees } = playerData;
  const seenRolesData = rolesData[role].sees

  Object.keys(seenRolesData).forEach( seenRole => {
    if (assignedRolesObj[seenRole]) {
      sees[seenRole] = {
        role: seenRole,
        alignment: seenRolesData[seenRole].alignment,
        knowsRole: seenRolesData[seenRole].knowsRole,
        players: assignedRolesObj[seenRole],
      }
    }
  });

  return { sees };
};

/**
 * Creates an array of player objects with roles assigned
 * @param {[string]} playerList
 * @param {FESettingsObj} settings
 * @param {boolean} shuffle
 */
function createRoleAssignment(playerList, settings, shuffle = true) {
  let roleList = generateRoleList(settings);
  if (shuffle) {
    roleList = otherUtils.shuffle(generateRoleList(settings));
  }

  if(!roleNumberCheck(roleList, settings, rolesData)) return null;
  let { assignedPlayersObj, assignedRolesObj } = assignRoles(playerList, roleList, rolesData);

  Object.keys(assignedPlayersObj).forEach( player => {
    assignedPlayersObj[player] = Object.assign(
      assignedPlayersObj[player],
      assignSeenData(assignedPlayersObj[player], assignedRolesObj)
    );
  });
  return assignedPlayersObj;
};

module.exports = {
  createRoleAssignment
}
