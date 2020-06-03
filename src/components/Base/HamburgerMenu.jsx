import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IoIosMenu } from 'react-icons/io';
import './HamburgerMenu.css';

export default function HamburgerMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExitGame = () => {
    window.exitGame();
    handleClose();
  };

  return (
    <React.Fragment>
      <IoIosMenu
        aria-controls='simple-menu'
        aria-haspopup='true'
        className='Menu'
        onClick={handleClick}
        size={35}
      />
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleExitGame}>Exit Game</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
