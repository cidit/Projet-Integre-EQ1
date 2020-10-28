import React, { useState, useEffect } from "react";
import useDocuments from './useDocuments'
import CircularUnderLoad from '../utils/IsLoading'
import Contrat from '../../model/Contrat'
import ContratService from "../../service/ContratService";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Telecharger from '../utils/telecharger'

function CreationContrat() {
  const [contrats, setContrat] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const doFetch = async ()=>{
   ContratService.getContrats().then((res) => setContrat(res.data) );
   // setIsloading(false);
  }




  const doThat = ()=> {
    console.log("inside")
  };

useEffect(() => {
    doFetch();
   
    return () => {
    }
}, [])



console.log(contrats)



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
                                        stage =>
                                            <tr key={stage.id}>
                                              <td>{stage.id}</td>
                                                <td>{stage.dateGeneration}</td>

                                                   <Telecharger path={'http://localhost:8080/contrats/getContatFile/1'}/>                                             
                                            </tr>
                                    )}
                                
         
        </tbody>
      </table>
    </div>
  )



};
export default CreationContrat; 