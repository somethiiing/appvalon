import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import Button from './Button';
import Drawer from './Drawer';
import { Heading } from './Text';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleDrawer = () => {
    this.setState(prev  => ({
      isOpen: !prev.isOpen
    }));
  }

  render() {
    return (
      <header className="Header">
        <Heading>Appvalon</Heading>
        <MdInfoOutline onClick={this.toggleDrawer} size={32} />
        <Drawer isOpen={this.state.isOpen} />
      </header>
    );
  }
}

export default Header;
