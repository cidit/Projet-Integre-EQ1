import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import EvaluationsAFaire from '../evaluations/EvaluationsAFaire';
import ListHistoriqueEvaluationsStagiaires from './ListHistoriqueEvaluationsStagiaires';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    //height: 224,
    margin: theme.spacing(3),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function EvaluationsHome() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const id = localStorage.getItem("desc") === "Employeur" ? localStorage.getItem("id") : '';


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Évaluations en attente" {...a11yProps(0)} />
        <Tab label="Historique d'évaluation" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0} component={'span'} variant={'body2'}>
        <div>
          <EvaluationsAFaire id={id} />
        </div>



      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListHistoriqueEvaluationsStagiaires />
      </TabPanel>

    </div>
  );
}

