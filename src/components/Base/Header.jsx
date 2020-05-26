import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import Drawer from '../Base/Drawer';
import { Heading } from './Text';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleDrawer = (isOpen) => {
    this.setState({
      isOpen
    });
  }

  render() {
    return (
      <header className="Header">
        <Heading>Appvalon</Heading>
        <MdInfoOutline className='Info-icon' onClick={() => this.toggleDrawer(true)} size={32} />
        <Drawer name={this.props.name} roomState={this.props.roomState} isOpen={this.state.isOpen} toggleDrawer={() => this.toggleDrawer(false)}/>
      </header>
    );
  }
}

export default Header;
