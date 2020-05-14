import React from 'react';

export default class WaitingArea extends React.Component {
  constructor(props) {
    super(props);

    // todo: hook up to render this instead of BOARD
    this.state = roomState

    this.generateSelectedRolesList = this.generateSelectedRolesList.bind(this);
  }

  generateSelectedRolesList(settings) {
    let result = [];
    console.log("creating roles with settings: " + JSON.stringify(settings), null, 2)
    const { selectedRoles = {} } = settings;
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
  }

  render() {
    const { players = {}, roomOwner, gameSettings = {}, playerCount } = this.state;
    console.log(this.state);
    const { lakeSetting } = gameSettings;
    let currentPlayerCount = Object.keys(players).length;

    return (
      <div className='WaitingArea'>
        <div>
          {`Waiting for ${playerCount - currentPlayerCount} players to join.`}
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>{`Host: ${roomOwner}`}</div>
          <div>{`Lake Setting: ${lakeSetting}`}</div>
          <div>{`Roles: ${JSON.stringify(this.generateSelectedRolesList(gameSettings))}`}</div>
        </div>
      </div>
    );
  }
}

const roomState = {
    "roomName": "fig",
    "roomOwner": "asdf",
    "status": "WAITING_FOR_PLAYERS",
    "createdAt": 1589428588310,
    "playerCount": 5,
    "lakeSetting": "ROLE",
    "selectedRoles": [],
    "players": {
      "asdf": {
        "name": "asdf",
        "teamVote": null,
        "role": "",
        "information": {},
        "isKing": false,
        "isHammer": false
      }
    },
    "boardInfo": {
      "playerCount": 5,
      "numGood": 3,
      "numEvil": 2,
      "doubleFailRequired": false,
      "missions": [
        {
          "count": 1,
          "size": 2,
          "status": "NOT_GONE",
          "maxVoteTrack": 5
        },
        {
          "count": 2,
          "size": 3,
          "status": "NOT_GONE",
          "maxVoteTrack": 5
        },
        {
          "count": 3,
          "size": 2,
          "status": "NOT_GONE",
          "maxVoteTrack": 5
        },
        {
          "count": 4,
          "size": 3,
          "status": "NOT_GONE",
          "maxVoteTrack": 5
        },
        {
          "count": 5,
          "size": 3,
          "status": "NOT_GONE",
          "maxVoteTrack": 5
        }
      ]
    },
    "kingOrder": [],
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
      "playerCount": 5,
      "selectedRoles": {
        "merlin": true,
        "percival": true,
        "tristan": false,
        "iseult": false,
        "genericGood": true,
        "numGenGood": 2,
        "assassin": true,
        "mordred": true,
        "morgana": true,
        "oberon": false,
        "noberon": false,
        "genericEvil": false,
        "numGenEvil": 0
      },
      "lakeSetting": "ROLE"
    }
}