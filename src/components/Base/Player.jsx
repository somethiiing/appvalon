import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { ReactComponent as Avatar } from '../../icons/avatar.svg';
import { ReactComponent as FcCheckmark } from '../../icons/icon-check.svg';
import { ReactComponent as FaCrown } from '../../icons/icon-crown.svg';
import { ReactComponent as BsHammer } from '../../icons/icon-hammer.svg';
import { BsQuestion } from 'react-icons/bs';

import { Sub } from './Text';

import './Player.css';

function Player(props) {
  const { name, king, hammer, selected, teamVote, onClick, hue, roomState } =
    props;
  // use this to generate random icon colors on initialization
  // const randomColor = "#" + Math.random().toString(16).slice(2, 8);
  // Your colors are better but without access to the keyed layers to do a proper offset, this does the trick.
  const playerColor = hue ? hue : Math.floor(Math.random() * Math.floor(360));
  let status = false;
  if (roomState) {
    status = roomState && roomState.status !== 'TEAM_VOTE';
  }
  return (
    <button
      type='button'
      className={`Player ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {king && <FaCrown className='king-icon' size={22} color='#ffbb01' />}
      {hammer && <BsHammer className='hammer-icon' size={20} color='#ffbb01' />}
      <Avatar
        className='avatar'
        style={{ filter: `hue-rotate(` + playerColor + `deg)` }}
      />
      <Sub>{name}</Sub>
      {status && teamVote === 'APPROVE' && (
        <FcCheckmark className='vote-icon' size={25} color='#00d673' />
      )}
      {status && teamVote === 'REJECT' && (
        <IoMdClose className='vote-icon' size={25} color='#d10146' />
      )}
      {!status && teamVote && teamVote !== 'NOT_VOTED' && (
        <BsQuestion className='vote-icon' size={25} color='#015aff' />
      )}
    </button>
  );
}

export default Player;
