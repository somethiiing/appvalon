import React from 'react';
import { Drawer as MaterialDrawer } from '@material-ui/core';
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, Sub, Highlight, Heading } from './Text';

function Drawer(props) {

  return (
    <MaterialDrawer className='Drawer' anchor='right' open={props.isOpen}>
      <div>
        <IoIosCloseCircleOutline className='Drawer-close' onClick={props.toggleDrawer} size={35} />
        <SimpleTabs />
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
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleTabs() {
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
        Intel pertaining to your particular role will show up here.
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
