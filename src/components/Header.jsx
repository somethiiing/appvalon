import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import Button from './Button';
import { Heading } from './Text';

function Header() {
  return (
    <header className="Header">
      <Heading>Appvalon</Heading>
      <Button>Tis' A Button</Button>
      <MdInfoOutline />
    </header>
  );
}

export default Header;
