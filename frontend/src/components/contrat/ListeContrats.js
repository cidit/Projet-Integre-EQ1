import React, { useState, useEffect } from "react";
import useDocuments from './useDocuments'
import CircularUnderLoad from '../utils/IsLoading'
import Contrat from '../../model/Contrat'
import ContratService from "../../service/ContratService";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Telecharger from '../utils/telecharger'
import IsLoading from '../utils/IsLoading'
import useListeContrats from "./useListeContrats";


const url = 'http://localhost:8080/contrats/getContatFile/';

function ListeContrats() {
  const [contrats, setContrat] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const doFetch = async () => {
    ContratService.getContrats().then((res) => setContrat(res.data));
    setIsloading(false);
  }

  useEffect(() => {
    doFetch();
    return () => {
    }
  }, [contrats])


  if(isLoading){
    return <IsLoading/>
  }


  const {contratsList, error, isLoading,isEmployeur, isEtudiant }= useListeContrats();

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr >
            <th> id </th>
            <th> date finale </th>
            <th>File </th>
          </tr>
        </thead >
        <tbody>

          {contrats.map(
            data =>
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.dateGeneration}</td>
                <Telecharger path={data.id} />
              </tr>
          )}
        </tbody>
      </table>
    </div>
  )
};
export default ListeContrats; 