import React, { useState, useEffect } from "react";
import useDocuments from './useDocuments'
import CircularUnderLoad from '../utils/IsLoading'
import Contrat from '../../model/Contrat'
import ContratService from "../../service/ContratService";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Telecharger from '../utils/telecharger'
import CandidatureService from '../../service/CandidatureService'
import ApercuContrat from './ApercuContrat'
import Televerser from './Televerser'

import SauvegarderContrat from './Testdeq'

function CreationContrat() {
  const [candidatures, setCandidatures] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const getAllCandidature = async () => {
    const response = CandidatureService.getAll();
    setCandidatures(response.data);
  }

  useEffect(() => {
    getAllCandidature();

    return () => {
    }
  }, [])


  return (
    <div className="container-fluid">
      <div className="row aling-items-center">
        <div className="col-sm-6">

          <ApercuContrat />

        </div>

        <div className="col-sm-6">

          <Televerser />

        </div>
      </div>



    </div>
  )



};
export default CreationContrat; 