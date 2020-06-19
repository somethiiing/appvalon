import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '../Base/Button';
import './CreateRoom.css';

import { createRoom } from '../../ApiUtils';
import { setRelogToken } from '../../utils';

export default class CreateRoom extends React.Component {
  constructor(props) {
    super(props);

    // props: handleSubmit
    this.state = {
      name: '', // host name
      playerCount: 7,
      lakeSetting: 'ALIGNMENT',

      merlin: true, //bool
      percival: true, //bool
      tristan: false, //bool
      iseult: false, //bool
      numGenGood: 2, //num

      mordred: true, //bool
      morgana: true, //bool
      assassin: true, //bool
      oberon: false, //bool
      noberon: false, //bool
      numGenEvil: 0 //num
    };

    // map player count to number of good and bad roles in the game
    this.expectedNumEvil = {
      5: 2,
      6: 2,
      7: 3,
      8: 3,
      9: 3,
      10: 4
    };

    this.expectedNumGood = {
      5: 3,
      6: 4,
      7: 4,
      8: 5,
      9: 6,
      10: 6
    };

    this.getDefaultSettingsForSize = this.getDefaultSettingsForSize.bind(this);
    this.constructSettingsObj = this.constructSettingsObj.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  getDefaultSettingsForSize(playerCount) {
    let settings = {
      lakeSetting: 'NONE',
      merlin: false, //bool
      percival: false, //bool
      tristan: false, //bool
      iseult: false, //bool
      numGenGood: 0, //num

      mordred: false, //bool
      morgana: false, //bool
      assassin: false, //bool
      oberon: false, //bool
      noberon: false, //bool
      numGenEvil: 0 //num
    };
    switch (playerCount) {
      case 5:
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 1;
        settings.morgana = true;
        settings.mordred = true;
        break;
      case 6:
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 2;
        settings.morgana = true;
        settings.mordred = true;
        break;
      case 7:
        settings.lakeSetting = 'ALIGNMENT';
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 2;
        settings.morgana = true;
        settings.mordred = true;
        settings.assassin = true;
        break;
      case 8:
        settings.lakeSetting = 'ROLE';
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 3;
        settings.morgana = true;
        settings.mordred = true;
        settings.assassin = true;
        break;
      case 9:
        settings.lakeSetting = 'ROLE';
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 4;
        settings.morgana = true;
        settings.mordred = true;
        settings.assassin = true;
        break;
      case 10:
        settings.lakeSetting = 'ROLE';
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 4;
        settings.morgana = true;
        settings.assassin = true;
        settings.oberon = true;
        settings.numGenEvil = 1;
        break;
      default:
        settings.lakeSetting = 'ALIGNMENT';
        settings.merlin = true;
        settings.percival = true;
        settings.numGenGood = 2;
        settings.morgana = true;
        settings.mordred = true;
        settings.assassin = true;
        break;
    }
    return settings;
  }

  constructSettingsObj() {
    const {
      playerCount,
      lakeSetting,
      merlin,
      percival,
      tristan,
      iseult,
      numGenGood,
      assassin,
      mordred,
      morgana,
      oberon,
      noberon,
      numGenEvil
    } = this.state;
    const genericGood = numGenGood > 0;
    const genericEvil = numGenEvil > 0;

    const settings = {
      playerCount,
      lakeSetting, // ROLE, ALIGNMENT, NONE
      selectedRoles: {
        merlin, //bool
        percival, //bool
        tristan, //bool
        iseult, //bool
        genericGood, //bool
        numGenGood, //num

        mordred, //bool
        morgana, //bool
        assassin, //bool
        oberon, //bool
        noberon, //bool
        genericEvil, //bool
        numGenEvil //num
      }
    };
    return settings;
  }

  handleCheckboxChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  handleChange = (e) => {
    let field = e.target.name;
    let val = e.target.value;
    if (field === 'playerCount') {
      const settings = this.getDefaultSettingsForSize(val);
      this.setState({ playerCount: val, ...settings });
    } else {
      this.setState({ [field]: val });
    }
  };

  handleOnSubmit() {
    createRoom({
      settings: this.constructSettingsObj(),
      host: this.state.name
    }).then((res) => {
      const { room, host } = res.data;
      setRelogToken({ player: host, room });
      this.props.handleSubmit({ name: host, room });
    });
  }

  render() {
    const {
      playerCount,
      lakeSetting,
      merlin,
      percival,
      tristan,
      iseult,
      numGenGood,
      assassin,
      mordred,
      morgana,
      oberon,
      noberon,
      numGenEvil
    } = this.state;
    const goodError =
      [merlin, percival, tristan, iseult].filter((v) => v).length +
        numGenGood !==
      this.expectedNumGood[playerCount];
    const evilError =
      [mordred, morgana, assassin, oberon, noberon].filter((v) => v).length +
        numGenEvil !==
      this.expectedNumEvil[playerCount];

    const playerCountOptions = [];
    for (let i = 5; i <= 10; i++) {
      playerCountOptions.push(
        <MenuItem key={`${i}-players`} value={i}>{`${i} Players`}</MenuItem>
      );
    }

    const genGoodOptions = [];
    for (let i = 0; i <= 6; i++) {
      genGoodOptions.push(
        <MenuItem key={`${i}-good`} value={i}>{`${i} Generic Good`}</MenuItem>
      );
    }

    const genEvilOptions = [];
    for (let i = 0; i <= 4; i++) {
      genEvilOptions.push(
        <MenuItem key={`${i}-evil`} value={i}>{`${i} Generic Evil`}</MenuItem>
      );
    }

    return (
      <div className='Create-room'>
        {/* NAME FORM */}
        <FormLabel component='legend' className='Form-label'>
          Host Name
        </FormLabel>
        <TextField
          variant='outlined'
          margin='normal'
          required
          id='name'
          label='Name'
          name='name'
          autoComplete='name'
          autoFocus
          onChange={this.handleChange}
        />
        {/* PLAYER COUNT */}
        <FormLabel component='legend' className='Form-label'>
          Game Settings
        </FormLabel>
        <Select
          className='Form-select'
          name='playerCount'
          value={playerCount}
          onChange={this.handleChange}
        >
          {playerCountOptions}
        </Select>
        {/* LAKE SETTINGS */}
        <Select
          className='Form-select'
          name='lakeSetting'
          value={lakeSetting}
          onChange={this.handleChange}
        >
          <MenuItem key={'no-lake'} value={'NONE'}>
            No Lake
          </MenuItem>
          <MenuItem key={'lake-alignment'} value={'ALIGNMENT'}>
            Lake Alignment
          </MenuItem>
          <MenuItem key={'lake-role'} value={'ROLE'}>
            Lake Role
          </MenuItem>
        </Select>
        {/* ROLE SETTINGS */}
        <FormControl required error={goodError} component='fieldset'>
          <FormGroup>
            <FormLabel component='legend' className='Form-label'>
              Good Roles
            </FormLabel>
            <FormHelperText>{`Choose ${this.expectedNumGood[playerCount]} Good Roles`}</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={merlin}
                  onChange={this.handleCheckboxChange}
                  name='merlin'
                />
              }
              label='Merlin'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={percival}
                  onChange={this.handleCheckboxChange}
                  name='percival'
                />
              }
              label='Percival'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={tristan}
                  onChange={this.handleCheckboxChange}
                  name='tristan'
                />
              }
              label='Tristan'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={iseult}
                  onChange={this.handleCheckboxChange}
                  name='iseult'
                />
              }
              label='Iseult'
            />
            <Select
              name='numGenGood'
              value={numGenGood}
              onChange={this.handleChange}
            >
              {genGoodOptions}
            </Select>
          </FormGroup>
        </FormControl>
        <FormControl required error={evilError} component='fieldset'>
          <FormGroup>
            <FormLabel component='legend' className='Form-label'>
              Evil Roles
            </FormLabel>
            <FormHelperText>{`Choose ${this.expectedNumEvil[playerCount]} Evil Roles`}</FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mordred}
                  onChange={this.handleCheckboxChange}
                  name='mordred'
                />
              }
              label='Mordred'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={morgana}
                  onChange={this.handleCheckboxChange}
                  name='morgana'
                />
              }
              label='Morgana'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={assassin}
                  onChange={this.handleCheckboxChange}
                  name='assassin'
                />
              }
              label='Assassin'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={oberon}
                  onChange={this.handleCheckboxChange}
                  name='oberon'
                />
              }
              label='Oberon (Seen by Merlin)'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={noberon}
                  onChange={this.handleCheckboxChange}
                  name='noberon'
                />
              }
              label='Oberon (Not Seen by Merlin)'
            />
            <Select
              name='numGenEvil'
              value={numGenEvil}
              onChange={this.handleChange}
            >
              {genEvilOptions}
            </Select>
          </FormGroup>
        </FormControl>
        {/* SUBMIT */}
        <div className='Form-submit'>
          <Button onClick={this.handleOnSubmit}>Create Room</Button>
        </div>
      </div>
    );
  }
}
