import React from 'react';
import { Drawer as MaterialDrawer } from '@material-ui/core';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { Heading } from './Text';

function Drawer(props) {
  return (
    <MaterialDrawer className='Drawer' anchor='right' open={props.isOpen}>
      <div>
        <IoIosCloseCircleOutline size={35} />
        <Heading>Intel</Heading>
      </div>
      <p>Hi where</p>

    </MaterialDrawer>
  );
}

export default Drawer;
