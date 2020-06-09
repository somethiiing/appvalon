import React from 'react';

export default class WaitingArea extends React.Component {
  constructor(props) {
    super(props);

    this.generateSelectedRolesList = this.generateSelectedRolesList.bind(this);
  }

  generateSelectedRolesList(settings) {
    let result = [];
    const { selectedRoles = {} } = settings;
    const { genericGood, genericEvil, numGenEvil, numGenGood } = selectedRoles;
    let rolesKeys = Object.keys(selectedRoles);
    rolesKeys.forEach((role) => {
      if (
        selectedRoles[role] === true &&
        !(role === 'genericGood' || role === 'genericEvil')
      ) {
        result.push(role);
      }
    });

    if (genericGood)
      result = result.concat(new Array(numGenGood).fill('genericGood'));
    if (genericEvil)
      result = result.concat(new Array(numGenEvil).fill('genericEvil'));

    return result;
  }

  render() {
    const {
      players = {},
      roomOwner,
      gameSettings = {},
      playerCount,
      roomName
    } = this.props.roomState;
    const { lakeSetting } = gameSettings;
    let currentPlayerCount = Object.keys(players).length;
    // TODO display player components
    return (
      <div className='WaitingArea'>
        <div>
          {`Waiting for ${playerCount - currentPlayerCount} players to join.`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>{`Room Code: ${roomName}`}</div>
          <div>{`Host: ${roomOwner}`}</div>
          <div>{`Lake Setting: ${lakeSetting}`}</div>
          <div>{`Current Players: ${Object.keys(players)}`}</div>
          <div>{`Roles: ${JSON.stringify(
            this.generateSelectedRolesList(gameSettings)
          )}`}</div>
        </div>
      </div>
    );
  }
}