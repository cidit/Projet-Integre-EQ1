import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import {Tabs, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import ProfilEnseignant from './ProfilEnseignant'
import ProfileEnseignantMotsDePasse from './ProfilEnseignantMotsDePasse'

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
        margin: theme.spacing(2),
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'inline-flex',
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(-15),
        margin: 'auto',
        maxWidth: '50%',
        marginLeft: theme.spacing(1, 'auto'),
    }
}));

export default function EnseignantTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

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
                <Tab label="Votre profile" {...a11yProps(0)} />
                <Tab label="Changer votre mot de passe" {...a11yProps(1)} />
               
            </Tabs>
            <TabPanel value={value} index={0}  >
                <Paper className={classes.paper}>
                <Typography variant="h5" align='center'>Votre profil</Typography>
                    <ProfilEnseignant/>
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Paper className={classes.paper} >
                <Typography variant="h5" align='center'>Changer votre mot de passe</Typography>
                    <ProfileEnseignantMotsDePasse/>
                </Paper>
            </TabPanel>
        </div>
    );
}


