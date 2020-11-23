import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import EmployeurService from '../../service/EmployeurService';

import ProfileEmployeurMotsDePasse from './ProfileEmployeurMotsDePasse';

import { Avatar, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import photo from '../../images/photo-avatar-profil.png';

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
    maxWidth: '75%',
    marginLeft: theme.spacing(40),
  }
}));

export default function ProfileHome() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const id = localStorage.getItem("desc") === "Employeur" ? localStorage.getItem("id") : '';

  const [employeur, setEmployeur] = useState('')
  const getEmployeur = async () => {
      const response = await EmployeurService.getById(id);
      console.log(response)
      setEmployeur(response.data);
  }

  useEffect(() => {
      getEmployeur()
      return () => {
          setEmployeur('')
      }
  }, [])

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
      <TabPanel value={value} index={0} component={'span'} variant={'body2'}>
            <Paper className={classes.paper} >
              <Typography variant="h4" align='center'>
                Votre profile
              </Typography>
              <div className='row justify-content-md-center p-4'>
              <Avatar alt={employeur.nom} src={photo} className={classes.large} />
              </div>
               
                <Typography variant="h5" align='center'>{employeur.nom}</Typography>
                <br></br>

                <Typography variant="subtitle2" align='center'>
                    <PersonIcon /> Information
                 </Typography>
                <br></br>

                <div className='row '>
                    <div className='col '>
                        <Typography variant="subtitle2" align='right'>Téléphone :</Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="subtitle2" align='left'>{employeur.telephone}</Typography>
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col'>
                        <Typography variant="subtitle2" align='right'>Adresse :</Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="subtitle2" align='left'>{employeur.adresse}</Typography>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Typography variant="subtitle2" align='right'>Email :</Typography>
                    </div>
                    <div className='col'>
                        <Typography variant="subtitle2" align='left'>{employeur.email}</Typography>
                    </div>
                </div>
            </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <Paper className={classes.paper} >
              <Typography variant="h4" align='center'>Changer votre mot de passe</Typography>
              <ProfileEmployeurMotsDePasse/>
              <Typography variant="subtitle2" align='center'>
                *Votre nouveau mot de passe doit comprendre 1 majuscule, 1 minuscule et 1 chiffre
              </Typography>
            </Paper>
      </TabPanel>

    </div>
  );
}

