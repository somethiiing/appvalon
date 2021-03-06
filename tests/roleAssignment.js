const assert = require('chai').assert;
const rewire = require('rewire');

const roleAssignment = rewire('../server/roleAssignment');

describe('testGenerateRoleList', () => {
  it('should return true', () => {
    const generateRoleList = roleAssignment.__get__('generateRoleList');
    const roleSet1 = {
      selectedRoles: {
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
    const roleSet1Validation =
      ["merlin",
      "percival",
      "assassin",
      "mordred",
      "morgana",
      "genericGood",
      "genericGood"];
    const roleSet2 = {
      selectedRoles: {
        merlin: true, //bool
        percival: true, //bool
        tristan: true, //bool
        iseult: true, //bool
        titania: true, //bool
        genericGood: false, //bool
        numGenGood: 0, //num

        assassin: true, //bool
        mordred: true, //bool
        morgana: true, //bool
        agravaine: false, //bool
        colgrevance: false, //bool
        oberon: false, //bool
        noberon: false, //bool
        genericEvil: true, //bool
        numGenEvil: 1 //num
      }
    };
    const roleSet2Validation =
      ["merlin",
      "percival",
      "tristan",
      "iseult",
      "titania",
      "assassin",
      "mordred",
      "morgana",
      "genericEvil"];
    assert.equal(JSON.stringify(generateRoleList(roleSet1)), JSON.stringify(roleSet1Validation));
    assert.equal(JSON.stringify(generateRoleList(roleSet2)), JSON.stringify(roleSet2Validation));
  });
});

describe('testAssignRoles', () => {
  it('should return true', () => {
    const assignRoles = roleAssignment.__get__('assignRoles');
    const playerList = ["wilson", "bridget", "vinh", "steven", "kelvin"];
    const roleList = ["merlin", "percival", "assassin", "mordred", "morgana"];

    const result = assignRoles(playerList, roleList);
    // Check if the lengths are the same
    assert.equal(result.assignedPlayersObj.length, result.assignedRolesObj.length);
    // Check if each roles and players match in the assignedRoles and assignedPlayers objects
    Object.keys(result.assignedPlayersObj).forEach( player => {
      const expectedRole = result.assignedPlayersObj[player].role;
      const expectedPlayer = result.assignedRolesObj[expectedRole].assigned;
      assert.equal(expectedPlayer, player);
    })
  });
});

describe('testAssignSeenData ', () => {
  it('should return true', () => {
    const assignSeenData = roleAssignment.__get__('assignSeenData');

    const playerData = {
      role: "percival",
      sees: {}
    }

    const assignedRolesObj= {
      "merlin": {
      "assigned": [
        "wilson"
      ]
    },
      "percival": {
      "assigned": [
        "bridget"
      ]
    },
      "mordred": {
      "assigned": [
        "steven"
      ]
    },
      "morgana": {
      "assigned": [
        "kelvin"
      ]
    },
      "genericGood": {
      "assigned": [
        "richard",
        "andrew"
      ]
    },
      "genericBod": {
        "assigned": [
          "vinh"
        ]
      }
    };

    const seen = assignSeenData(playerData, assignedRolesObj);
    assert.equal(JSON.stringify(Object.keys(seen.sees)), JSON.stringify(["merlin", "morgana"]));
  });
});




describe('testCreateRoleAssignment', () => {
  it('should return true', () => {
    const createRoleAssignment = roleAssignment.__get__('createRoleAssignment');

    const playerList = ['wilson', 'bridget', 'vinh', 'steven', 'kelvin', 'richard', 'alex', 'andrew', 'bob', 'alice'];

    const settings = {
      playerCount: 10, // number
      numGood: 6, // number
      numEvil: 4, // number
      selectedRoles: {
        merlin: true, //bool
        percival: true, //bool
        tristan: true, //bool
        iseult: false, //bool
        titania: false, //bool
        genericGood: true, //bool
        numGenGood: 3, //num

        assassin: true, //bool
        mordred: true, //bool
        morgana: true, //bool
        agravaine: false, //bool
        colgrevance: false, //bool
        oberon: false, //bool
        noberon: false, //bool
        genericEvil: true, //bool
        numGenEvil: 1 //num
      }
    };

    const expectedAssignedRoles = {
      "wilson": {
        "role": "merlin",
        "name": "wilson",
        "sees": {
          "morgana": {
            "role": "morgana",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "richard"
              ]
            }
          },
          "genericEvil": {
            "role": "genericEvil",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "alice"
              ]
            }
          },
          "assassin": {
            "role": "assassin",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "steven"
              ]
            }
          }
        },
        "alignment": "good"
      },
      "bridget": {
        "role": "percival",
        "name": "bridget",
        "sees": {
          "merlin": {
            "role": "merlin",
            "alignment": "unknown",
            "knowsRole": false,
            "players": {
              "assigned": [
                "wilson"
              ]
            }
          },
          "morgana": {
            "role": "morgana",
            "alignment": "unknown",
            "knowsRole": false,
            "players": {
              "assigned": [
                "richard"
              ]
            }
          }
        },
        "alignment": "good"
      },
      "vinh": {
        "role": "tristan",
        "name": "vinh",
        "sees": {},
        "alignment": "good"
      },
      "steven": {
        "role": "assassin",
        "name": "steven",
        "sees": {
          "mordred": {
            "role": "mordred",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "kelvin"
              ]
            }
          },
          "morgana": {
            "role": "morgana",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "richard"
              ]
            }
          },
          "genericEvil": {
            "role": "genericEvil",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "alice"
              ]
            }
          }
        },
        "alignment": "evil"
      },
      "kelvin": {
        "role": "mordred",
        "name": "kelvin",
        "sees": {
          "morgana": {
            "role": "morgana",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "richard"
              ]
            }
          },
          "genericEvil": {
            "role": "genericEvil",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "alice"
              ]
            }
          },
          "assassin": {
            "role": "assassin",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "steven"
              ]
            }
          }
        },
        "alignment": "evil"
      },
      "richard": {
        "role": "morgana",
        "name": "richard",
        "sees": {
          "mordred": {
            "role": "mordred",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "kelvin"
              ]
            }
          },
          "genericEvil": {
            "role": "genericEvil",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "alice"
              ]
            }
          },
          "assassin": {
            "role": "assassin",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "steven"
              ]
            }
          }
        },
        "alignment": "evil"
      },
      "alex": {
        "role": "genericGood",
        "name": "alex",
        "sees": {},
        "alignment": "good"
      },
      "andrew": {
        "role": "genericGood",
        "name": "andrew",
        "sees": {},
        "alignment": "good"
      },
      "bob": {
        "role": "genericGood",
        "name": "bob",
        "sees": {},
        "alignment": "good"
      },
      "alice": {
        "role": "genericEvil",
        "name": "alice",
        "sees": {
          "mordred": {
            "role": "mordred",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "kelvin"
              ]
            }
          },
          "morgana": {
            "role": "morgana",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "richard"
              ]
            }
          },
          "assassin": {
            "role": "assassin",
            "alignment": "evil",
            "knowsRole": false,
            "players": {
              "assigned": [
                "steven"
              ]
            }
          }
        },
        "alignment": "evil"
      }
    }

    const assignedRoles = createRoleAssignment(playerList, settings, false);

    assert.equal(JSON.stringify(assignedRoles), JSON.stringify(expectedAssignedRoles));
  });
});