import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ListEnseignants from './ListEnseignants'
import AssignerEtudiantsAuEnseignant from './AssignerEtudiantsAuEnseignant'

  export default function RapportEnseignantComponent() {
    
    return (
      <div >
       
       <ListEnseignants/>
      
      </div>
    );
  }
