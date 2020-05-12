const rolesData = require('./roleAssignmentData');
const { shuffle } = require('./otherUtils');

const fakePlayerList = ['wilson', 'bridget', 'vinh', 'steven', 'kelvin', 'richard', 'andrew'];

const fakeSettings = {
  numPeople: 7, // number
  numGood: 4, // number
  numEvil: 3, // number
  roles: {
    merlin: true, //bool
    percival: true, //bool
    tristan: false, //bool
    iseult: false, //bool
    titania: false, //bool
    genericGood: true, //bool
    numGenGood: 2, //num

    assassin: true, //bool
    mordred: true, //bool
    morgana: true, //bool
    agravaine: false, //bool
    colgrevance: false, //bool
    oberon: false, //bool
    noberon: false, //bool
    genericEvil: false, //bool
    numGenEvil: 0 //num
  }
};

function generateRoleList(settings) {
  let result = [];
  const { roles } = settings;
  const { genericGood, genericEvil, numGenEvil, numGenGood } = roles;
  let rolesKeys = Object.keys(roles);

  rolesKeys.forEach( role => {
    if(roles[role] === true && !(role === 'genericGood' || role === 'genericEvil')) {
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
  return goodCounter === settings.numGood
    && evilCounter === settings.numEvil
    && (goodCounter + evilCounter) === settings.numPeople;
};

function assignRoles(playerList, roleList) {
  let assignedPlayersObj = {};
  let assignedRolesObj = {};

  roleList.forEach( (role, ind) => {
    assignedRolesObj[role] = assignedRolesObj[role] || {};
    assignedRolesObj[role].assigned = assignedRolesObj[role].assigned || [];
    assignedRolesObj[role].assigned.push(playerList[ind]);

    assignedPlayersObj[ playerList[ind] ] = {
      roleTitle: rolesData[role].roleTitle,
      role,
      player: playerList[ind],
      sees: {}
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

function createRoleAssignment(playerList, settings, shuffle = true) {
  let roleList = generateRoleList(settings);
  if (shuffle) {
    roleList = shuffle(generateRoleList(settings));
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