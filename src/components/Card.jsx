import React from 'react';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { GiJeweledChalice } from 'react-icons/gi';
import { P } from './Text';

function Card(props) {
  let cardIcon;


  switch(props.type) {
    case 'approve':
      cardIcon = <IoIosCheckmarkCircleOutline size={92} color='#00d673'/>;
      break;
    case 'reject': 
      cardIcon = <IoIosCloseCircleOutline size={92} color='#d10146' />;
      break;
    case 'success': 
      cardIcon = <GiJeweledChalice size={92} color='#ffbb01' />;
      break;
    case 'fail': 
      cardIcon = <GiJeweledChalice size={92} color='#212121' />;
      break;
  }
  return (
        <div className="Card" onClick={props.onClick}>
          {cardIcon}
          <P>{props.type}</P>
        </div>
  );
}

export default Card;
