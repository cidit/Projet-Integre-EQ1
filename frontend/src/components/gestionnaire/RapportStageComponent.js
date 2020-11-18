
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import StageService from '../../service/StageService';
import ListeGenericStage from './ListeGenericStage';

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

    const [offreStages, setOffreStages] = useState(null);
    const getOffreStages = async () => {
        const response = await StageService.getStagesSession();
        setOffreStages(response.data);
    }

    const [offreStagesNonApprouve, setOffreStagesNonApprouve] = useState(null);
    const getOffreStagesNonApprouve = async () => {
        const response = await StageService.getStagesNonApprouves();
        setOffreStagesNonApprouve(response.data);
    }

    const [offreStagesAucunStagiaires, setOffreStagesAucunStagiaires] = useState(null);
    const getOffreStagesAucunStagiaires = async () => {
        const response = await StageService.getStagesAyantAucunStagiaires();
        setOffreStagesAucunStagiaires(response.data);
    }

    useEffect(() => {
      getOffreStages();
      getOffreStagesNonApprouve();
      getOffreStagesAucunStagiaires();
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
            <Tab label="Stages" {...a11yProps(0)} />
            <Tab label="Stages non approuvés" {...a11yProps(1)} />
            <Tab label="Stages non comblés" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>{offreStages != null &&
              <ListeGenericStage stages={offreStages} />
          }
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>{offreStagesNonApprouve != null &&
              <ListeGenericStage stages={offreStagesNonApprouve} />
          }
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>{offreStagesAucunStagiaires != null &&
              <ListeGenericStage stages={offreStagesAucunStagiaires} />
          }
          </div>
        </TabPanel>
      </div>
    );
  }