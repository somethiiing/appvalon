import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Drawer as MaterialDrawer } from '@material-ui/core';

import SimpleTabs from './SimpleTabs';

import './Drawer.css';

function Drawer(props) {
  const { name, roomState } = props;

  return (
    <MaterialDrawer className='Drawer' anchor='right' open={props.isOpen}>
      <div>
        <IoIosCloseCircleOutline
          className='Drawer-close'
          onClick={props.toggleDrawer}
          size={35}
        />
        <SimpleTabs name={name} roomState={roomState} />
      </div>
    </MaterialDrawer>
  );
}

export default Drawer;
