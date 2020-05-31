import React from 'react';
import { MdInfoOutline } from 'react-icons/md';

import Drawer from './Drawer';
import HamburgerMenu from './HamburgerMenu';
import { Heading } from './Text';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // TODO auto-open when role info becomes available
    this.state = {
      isOpen: false
    };
  }

  toggleDrawer = (isOpen) => {
    this.setState({
      isOpen
    });
  };

  render() {
    const { name, roomState } = this.props;
    const { isOpen } = this.state;

    return (
      <header className="Header">
        <div className="Header-left">
          <HamburgerMenu />
          <Heading>Appvalon</Heading>
        </div>
        <MdInfoOutline
          className="Info-icon"
          onClick={() => this.toggleDrawer(true)}
          size={32}
        />
        <Drawer
          name={name}
          roomState={roomState}
          isOpen={isOpen}
          toggleDrawer={() => this.toggleDrawer(false)}
        />
      </header>
    );
  }
}

export default Header;
