import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ContratService from '../../service/ContratService';
import ListeGenericContrat from './ListeGenericContrat';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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

    const [contratsNonSigneEtudiant, setContratsNonSigneEtudiant] = useState(null);
    const getContratsNonSigneEtudiant = async () => {
        const response = await ContratService.getContratsNonSignesEtudiant();
        setContratsNonSigneEtudiant(response.data);
    }

    const [contratsNonSigneEmployeur, setContratsNonSigneEmployeur] = useState(null);
    const getContratsNonSigneEmployeur = async () => {
        const response = await ContratService.getContratsNonSignesEmployeur();
        setContratsNonSigneEmployeur(response.data);
    }

    const [contratsNonSigneAdministration, setContratsNonSigneAdministration] = useState(null);
    const getContratsNonSigneAdministration = async () => {
        const response = await ContratService.getContratsNonSignesAdministration();
        setContratsNonSigneAdministration(response.data);
    }

    useEffect(() => {
        getContratsNonSigneEtudiant();
        getContratsNonSigneEmployeur();
        getContratsNonSigneAdministration();
    }, [])

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
                    <Tab label="Contrats non signé par employeur" {...a11yProps(0)} />
                    <Tab label="Contrats non signé par étudiant" {...a11yProps(1)} />
                    <Tab label="Contrats non signé par administration" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>{contratsNonSigneEmployeur != null &&
                <ListeGenericContrat contrats={contratsNonSigneEmployeur}/>
                }
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>{contratsNonSigneEtudiant != null &&
                <ListeGenericContrat contrats={contratsNonSigneEtudiant}/>
                }
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>{contratsNonSigneAdministration != null &&
                <ListeGenericContrat contrats={contratsNonSigneAdministration}/>
                }
                </div>
            </TabPanel>
        </div>
    );
}