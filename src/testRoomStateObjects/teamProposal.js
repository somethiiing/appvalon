module.exports = {
  "roomName": "pamelo",
  "roomOwner": "alex",
  "status": "TEAM_PROPOSAL",
  "createdAt": 1589429564693,
  "playerCount": 8,
  "lakeSetting": "ALIGNMENT",
  "selectedRoles": [
    "genericGood",
    "mordred",
    "genericGood",
    "percival",
    "merlin",
    "assassin",
    "genericGood",
    "morgana"
  ],
  "players": {
    "alex": {
      "role": "genericGood",
      "name": "alex",
      "sees": {},
      "alignment": "good",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": false,
      "isLake": false,
      "hue": 1
    },
    "jesus": {
      "role": "mordred",
      "name": "jesus",
      "sees": {
        "morgana": {
          "role": "morgana",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "fred"
            ]
          }
        },
        "assassin": {
          "role": "assassin",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jason"
            ]
          }
        }
      },
      "alignment": "evil",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": false,
      "isLake": false,
      "hue": 36
    },
    "mehtab": {
      "role": "genericGood",
      "name": "mehtab",
      "sees": {},
      "alignment": "good",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": false,
      "isLake": true,
      "hue": 71
    },
    "wilson": {
      "role": "percival",
      "name": "wilson",
      "sees": {
        "merlin": {
          "role": "merlin",
          "alignment": "unknown",
          "knowsRole": false,
          "players": {
            "assigned": [
              "bridget"
            ]
          }
        },
        "morgana": {
          "role": "morgana",
          "alignment": "unknown",
          "knowsRole": false,
          "players": {
            "assigned": [
              "fred"
            ]
          }
        }
      },
      "alignment": "good",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": false,
      "isLake": false,
      "hue": 106
    },
    "bridget": {
      "role": "merlin",
      "name": "bridget",
      "sees": {
        "morgana": {
          "role": "morgana",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "fred"
            ]
          }
        },
        "assassin": {
          "role": "assassin",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jason"
            ]
          }
        }
      },
      "alignment": "good",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": false,
      "isLake": false,
      "hue": 141
    },
    "jason": {
      "role": "assassin",
      "name": "jason",
      "sees": {
        "mordred": {
          "role": "mordred",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jesus"
            ]
          }
        },
        "morgana": {
          "role": "morgana",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "fred"
            ]
          }
        }
      },
      "alignment": "evil",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": true,
      "isLake": false,
      "hue": 176
    },
    "ashwin": {
      "role": "genericGood",
      "name": "ashwin",
      "sees": {},
      "alignment": "good",
      "teamVote": "APPROVE",
      "isKing": false,
      "isHammer": false,
      "isLake": false,
      "hue": 211
    },
    "fred": {
      "role": "morgana",
      "name": "fred",
      "sees": {
        "mordred": {
          "role": "mordred",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jesus"
            ]
          }
        },
        "assassin": {
          "role": "assassin",
          "alignment": "evil",
          "knowsRole": false,
          "players": {
            "assigned": [
              "jason"
            ]
          }
        }
      },
      "alignment": "evil",
      "teamVote": "APPROVE",
      "isKing": true,
      "isHammer": false,
      "isLake": false,
      "hue": 246
    }
  },
  "boardInfo": {
    "playerCount": 8,
    "numGood": 5,
    "numEvil": 3,
    "doubleFailRequired": true,
    "missions": [
      {
        "count": 1,
        "size": 3,
        "status": "NOT_GONE",
        "maxVoteTrack": 5
      },
      {
        "count": 2,
        "size": 4,
        "status": "NOT_GONE",
        "maxVoteTrack": 5
      },
      {
        "count": 3,
        "size": 4,
        "status": "NOT_GONE",
        "maxVoteTrack": 5
      },
      {
        "count": 4,
        "size": 5,
        "status": "NOT_GONE",
        "maxVoteTrack": 5
      },
      {
        "count": 5,
        "size": 5,
        "status": "NOT_GONE",
        "maxVoteTrack": 5
      }
    ]
  },
  "kingOrder": [
    "fred",
    "bridget",
    "jesus",
    "ashwin",
    "jason",
    "alex",
    "wilson",
    "mehtab"
  ],
  "currentMission": 1,
  "voteTrack": 1,
  "proposedTeam": [],
  "teamVoteResult": null,
  "missionVote": {
    "success": 0,
    "fail": 0,
    "reverse": 0
  },
  "gameSettings": {
    "playerCount": 8,
    "lakeSetting": "ALIGNMENT",
    "selectedRoles": {
      "merlin": true,
      "percival": true,
      "tristan": false,
      "iseult": false,
      "genericGood": true,
      "numGenGood": 3,
      "assassin": true,
      "mordred": true,
      "morgana": true,
      "oberon": false,
      "noberon": false,
      "genericEvil": false,
      "numGenEvil": 0
    }
  }
}
