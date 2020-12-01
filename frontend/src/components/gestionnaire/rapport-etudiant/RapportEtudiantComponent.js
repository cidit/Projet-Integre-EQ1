
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import EtudiantService from '../../../service/EtudiantService';
import ListeGenericEtudiant from './ListeGenericEtudiant';
import ApprobationEtudiantsCV from './ApprobationEtudiantsCV';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
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
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function ScrollableTabsButtonAuto() {

    const [etudiantsInscrits, setEtudiantsInscrits] = useState([]);
    const getEtudiantsInscrits = async () => {
        var idSession = localStorage.getItem("session");
        const response = await EtudiantService.getEtudiants(idSession);
        setEtudiantsInscrits(response.data);
    }

    const [etudiantsSansCV, setEtudiantsSansCV] = useState([]);
    const getEtudiantsSansCV = async () => {
        var idSession = localStorage.getItem("session");
        const response = await EtudiantService.getEtudiantsAucunCV(idSession);
        setEtudiantsSansCV(response.data);
    }

    const [etudiantsSansStage, setEtudiantsSansStage] = useState([]);
    const getEtudiantsSansStage = async () => {
        var idSession = localStorage.getItem("session");
        const response = await EtudiantService.getEtudiantsSansStage(idSession);
        setEtudiantsSansStage(response.data);
    }

    useEffect(() => {
      getEtudiantsInscrits();
      getEtudiantsSansCV();
      getEtudiantsSansStage();
    },[])

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Étudiants CV non approuvé" {...a11yProps(0)} />
            <Tab label="Étudiants inscrits" {...a11yProps(1)} />
            <Tab label="Étudiants sans CV" {...a11yProps(2)} />
            <Tab label="Étudiants sans stage" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ApprobationEtudiantsCV/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListeGenericEtudiant etudiants={etudiantsInscrits}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListeGenericEtudiant etudiants={etudiantsSansCV}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <ListeGenericEtudiant etudiants={etudiantsSansStage}/>
        </TabPanel>
      </div>
    );
  }