import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import Button from './Button';
import { Heading } from './Text';

function Header() {
  return (
    <header className="Header">
      <Heading>Appvalon</Heading>
      <MdInfoOutline size={32} />
    </header>
  );
}

export default Header;
