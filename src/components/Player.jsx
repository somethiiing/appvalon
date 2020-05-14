import React from 'react';
import {IoMdClose, IoIosCloseCircleOutline} from 'react-icons/io';
import {GiCloakDagger} from 'react-icons/gi';
import { ReactComponent as Avatar } from '../avatar.svg';
import { ReactComponent as Chalice } from '../icon-chalice.svg';
import { ReactComponent as FcCheckmark } from '../icon-check.svg';
import { ReactComponent as Close } from '../icon-close.svg';
import { ReactComponent as FaCrown } from '../icon-crown.svg';
import { ReactComponent as BsHammer } from '../icon-hammer.svg';
import { ReactComponent as Info } from '../icon-info.svg';
import {ReactComponent as GrClose} from '../icon-x.svg';
import {BsQuestion} from 'react-icons/bs';

import { Sub } from './Text';

function Player(props) {
    const {name, king, hammer, selected, teamVote, onClick, hue, roomState} = props;
    // use this to generate random icon colors on initialization
    // const randomColor = "#" + Math.random().toString(16).slice(2, 8);
    // Your colors are better but without access to the keyed layers to do a proper offset, this does the trick.
    const randomNumber = hue ? hue : Math.floor(Math.random() * Math.floor(360));
    let status = false;
    if (roomState) {
        status = roomState && roomState.status !== "TEAM_VOTE";
    }
    return (
        <button type='button' className={`Player ${selected ? 'selected' : ''}`} onClick={onClick}>
            {king &&
            <FaCrown className='king-icon' size={22} color='#ffbb01'/>
            }
            {hammer &&
            <BsHammer className='hammer-icon' size={20} color='#ffbb01'/>
            }
            <Avatar className='avatar' style={{filter: `hue-rotate(` + randomNumber + `deg)`}}/>
            <Sub>{name}</Sub>
            {status && teamVote === 'APPROVE' &&
            <FcCheckmark className='vote-icon' size={25} color='#00d673'/>
            }
            {status && teamVote === 'REJECT' &&
            <IoMdClose className='vote-icon' size={25} color='#d10146'/>
            }
            {!status && teamVote && <BsQuestion className='vote-icon' size={25} color="#015aff"/>}
    </button>
  );
}

export default Player;
