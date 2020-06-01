import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';
import RoleInfoTab from './RoleInfoTab';
import RulesTab from './RulesTab';

import './Drawer.css';

function SimpleTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={'SimpleTabs'}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Intel' />
          <Tab label='Rules' />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RoleInfoTab name={props.name} room={props.roomState} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RulesTab />
      </TabPanel>
    </div>
  );
}

export default SimpleTabs;
