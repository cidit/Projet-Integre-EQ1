import {ListeContrat, ListeContratsEtudiant} from '../contrat/ListeContrats'
import React, {useEffect, useState} from 'react';
import ContratService from '../../service/ContratService';

import EtudiantService from "../../service/EtudiantService";

import { useHistory } from "react-router-dom";


export default function ContratEtudiant() {
    
    const history = useHistory();
    
    const id = localStorage.getItem("desc") === "Etudiant" ? localStorage.getItem("id") : '';
    const [contratEtudiant, setContratEtudiant] = useState(null);

    const getByContratEtudiantId = async () => {
        const response = await ContratService.getContratByEtudiantId(id);
        setContratEtudiant(response.data);
    }

    const IsRegsiteredSessionEtudiant = async () => {
        const response = await EtudiantService.isRegistered(id);
        if(!response.data){
            history.push("/profilEtudiant");
        }
    }

    useEffect(() => {
        getByContratEtudiantId();
        IsRegsiteredSessionEtudiant();
        return () => {
            setContratEtudiant([])
        }
    }, [])

    return (
        <div>
            {contratEtudiant !=
                null &&
                // <ListeContratsEtudiant contrats={contratEtudiant}/>
            <ListeContrat  />
            }
        </div>
    )

}
