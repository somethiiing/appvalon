import React from 'react';
import { Drawer as MaterialDrawer } from '@material-ui/core';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, Sub, Bold as Highlight, Heading, P } from './Text';

//TODO split into multiple components

function Drawer(props) {
  const { name, roomState } = props;

  return (
    <MaterialDrawer className='Drawer' anchor='right' open={props.isOpen}>
      <div>
        <IoIosCloseCircleOutline className='Drawer-close' onClick={props.toggleDrawer} size={35} />
        <SimpleTabs name={name} roomState={roomState} />
      </div>

    </MaterialDrawer>
  );
}

export default Drawer;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333',
  },
}));

const renderRoleInfo = (name, room) => {

  const currentPlayer = room && room.players && room.players[name];

  if (room.status === 'WAITING_FOR_PLAYERS') {
    return <P>Your role info will be shown here when everyone has joined.</P>
  }

  let roleInfo = `${room.players.name}, you are ${currentPlayer.role === 'genericGood' ? 'Generic Good' : currentPlayer.role}. You are ${currentPlayer.alignment || 'neutral'}.`;

  if (currentPlayer.role === 'genericGood') {
    roleInfo = `${name}, you are Generic Good.`
  } else {
    roleInfo = <Sub>{name}, you are {currentPlayer.role}. You are <span
        className={`${currentPlayer.alignment === 'evil' ? 'red' : 'blue'}`}>{currentPlayer.alignment}</span>.</Sub>;
  }

  const sees = currentPlayer.sees;
  let seeInfo = [];
  let seeData = [];

  seeInfo.push(roleInfo);

  Object.values(sees).forEach(value => {
    const person = value.players.assigned[0];
    const alignment = value.alignment;
    seeData.push({
      name: person,
      alignment
    });
  });

  seeData.map(({ name, alignment }) => {
    let info;
    switch(currentPlayer.role) {
      case 'merlin':
        info = <Sub><Highlight>{name}</Highlight> is <span className='red'>{alignment}</span>.</Sub>
        break;
      case 'percival':
        info = <Sub><Highlight>{name}</Highlight> is <span className='blue'>Merlin</span> or <span className='red'>Morgana</span>.</Sub>
        break;
      case 'mordred':
        info = <Sub><Highlight>{name}</Highlight>  is also <span className='red'>{alignment}</span>.</Sub>;
        break;
      case 'morgana':
        info = <Sub><Highlight>{name}</Highlight>  is also <span className='red'>{alignment}</span>.</Sub>;
        break;
      case 'assassin':
        info = <Sub><Highlight>{name}</Highlight>  is also <span className='red'>{alignment}</span>.</Sub>;
        break;
      default:
        break;
    }
    seeInfo.push(info);
    //TODO return instead of push?
  });

  let noteInfo;
  switch (currentPlayer.role) {
    case 'merlin':
      noteInfo = <Sub>Note: You do not see Mordred.</Sub>;
      break;
    case 'percival':
      noteInfo = <Sub>Note: The following two names are Merlin and Morgana, but you do not know who is what role.</Sub>;
      break;
    case 'mordred':
      noteInfo = <Sub>Note: You are hidden from Merlin.</Sub>
      break;
    case 'morgana':
      noteInfo = <Sub>You appear as a potential Merlin to Percival You are visible to Merlin.</Sub>
      break;
    case 'assassin':
      noteInfo = <Sub>You have the final say in assasinating Merlin if Good wins. You are visible to Merlin.</Sub>
      break;
    case 'oberon':
      noteInfo = <Sub>You are not visible to your evil team mates. You are visible to Merlin.</Sub>
      break;
    default:
      break;
  }
  seeInfo.push(noteInfo);

  const countNote = <Sub>There are {room.boardInfo.numGood} good players and {room.boardInfo.numEvil} evil
    players.</Sub>
  seeInfo.push(countNote);

  return <div>
  {
    seeInfo.map((info) => {
      if (!info) {
        return null;
      }
      return <div className="Rules-role">
        {info}
      </div>
    })
  }
  </div>;
}

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Intel" />
          <Tab label="Rules" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {renderRoleInfo(props.name, props.roomState)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Link href='https://avalon.fun/pdfs/rules.pdf'>Official Game Rules</Link>
        <div className="Tab-Rules">
          <Heading>Roles</Heading>
          <div className="Rules-role">
            <Sub>
              <Highlight>Merlin - Good</Highlight>
              Can see all evil characters except Mordred.
            </Sub>
          </div>
          <div className="Rules-role">
            <Sub>
              <Highlight>Percival - Good</Highlight>
              Can see 2 names, belonging to Merlin(good) and Morgana(evil), but does not know who is what role.
            </Sub>
          </div>
          <div className="Rules-role">
            <Sub>
              <Highlight>Morgana - Evil</Highlight>
              Is one of the names that Percival sees as a potential Merlin.
            </Sub>
          </div>
          <div className="Rules-role">
            <Sub>
              <Highlight>Mordred - Evil</Highlight>
              Is hidden from Merlin.
            </Sub>
          </div>
          <div className="Rules-role">
            <Sub>
              <Highlight>Assassin - Evil</Highlight>
              Is the final call on who to assasinate at the end in case Good wins.
            </Sub>
          </div>
          <div className="Rules-role">
            <Sub>
              <Highlight>Oberon - Evil</Highlight>
              Does not know who else is evil, and is hidden from other Evil members.
            </Sub>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}
