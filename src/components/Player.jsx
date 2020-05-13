import React from 'react';
import { IoMdClose, IoIosCloseCircleOutline } from 'react-icons/io';
import { GiCloakDagger } from 'react-icons/gi';
import { FaCrown } from 'react-icons/fa';
import { BsHammer } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import { GrClose } from 'react-icons/gr';
import { Sub } from './Text';

function Player(props) {
  const { name, king, hammer, selected, teamVote } = props;

  // use this to generate random icon colors on initialization
  const randomColor = "#" + Math.random().toString(16).slice(2, 8);
  return (
    <button type='button' className={`Player ${selected ? 'selected': ''}`}>
      {king &&
        <FaCrown className='king-icon' size={22} color='#ffbb01' />
      }
      {hammer &&
        <BsHammer className='hammer-icon' size={20} color='#ffbb01' />
      }
      <GiCloakDagger size={48} color={randomColor} />
      <Sub>{name}</Sub>
      {teamVote === 'approve' && 
        <FcCheckmark className='vote-icon' size={25} color='#00d673'/>
      }
      {teamVote === 'reject' && 
        <IoMdClose className='vote-icon' size={25} color='#d10146'/>
      }
    </button>
  );
}

export default Player;
