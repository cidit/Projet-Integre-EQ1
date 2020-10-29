import React, { useState, useEffect } from "react";
import useDocuments from './useDocuments'
import CircularUnderLoad from '../utils/IsLoading'
import Contrat from '../../model/Contrat'
import ContratService from "../../service/ContratService";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Telecharger from '../utils/telecharger'
import Paper from '@material-ui/core'

import SauvegarderContrat from './Testdeq'

function CreationContrat() {
  const [contrats, setContrat] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {

    return () => {
    }
  }, [])


  return ( 
    <div>
      
      <Paper elevation={3} variant="outlined"><SauvegarderContrat/></Paper ></div>
  )



};
export default CreationContrat; 