import React, {useState,useEffect} from 'react';
import StageService from '../../service/StageService';
import UseCreerContrat from '../contrat2.js/useCreerContrat';

export default function SelectionDutemplate (){

    const[stage, setStage ] = useState(null);


    useEffect(() => {
        StageService.getStagesByEmployeurId
        return () => {
            cleanup
        }
    }, [input])


        return (
            <div><UseCreerContrat stage={stage} /></div>
        );
  
};

