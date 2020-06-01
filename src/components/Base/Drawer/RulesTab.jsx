import React from 'react';

import { Link, Sub, Bold as Highlight, Heading } from '../Text';

function RulesTab(props) {
  return (
    <React.Fragment>
      <Link href='https://avalon.fun/pdfs/rules.pdf'>Official Game Rules</Link>
      <div className='Tab-Rules'>
        <Heading>Roles</Heading>
        <div className='Rules-role'>
          <Sub>
            <Highlight>Merlin - Good</Highlight>
            Can see all evil characters except Mordred.
          </Sub>
        </div>
        <div className='Rules-role'>
          <Sub>
            <Highlight>Percival - Good</Highlight>
            Can see 2 names, belonging to Merlin(good) and Morgana(evil), but
            does not know who is what role.
          </Sub>
        </div>
        <div className='Rules-role'>
          <Sub>
            <Highlight>Morgana - Evil</Highlight>
            Is one of the names that Percival sees as a potential Merlin.
          </Sub>
        </div>
        <div className='Rules-role'>
          <Sub>
            <Highlight>Mordred - Evil</Highlight>
            Is hidden from Merlin.
          </Sub>
        </div>
        <div className='Rules-role'>
          <Sub>
            <Highlight>Assassin - Evil</Highlight>
            Is the final call on who to assasinate at the end in case Good wins.
          </Sub>
        </div>
        <div className='Rules-role'>
          <Sub>
            <Highlight>Oberon - Evil</Highlight>
            Does not know who else is evil, and is hidden from other Evil
            members.
          </Sub>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RulesTab;
