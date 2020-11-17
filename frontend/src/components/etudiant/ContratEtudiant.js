import {ListeContratsEtudiant} from '../contrat/ListeContrats'
import React, { useEffect, useState } from 'react';
import ContratService from '../../service/ContratService';

import EtudiantService from "../../service/EtudiantService";
import { Redirect } from 'react-router-dom';

export default function ContratEtudiant() {
    const id = localStorage.getItem("desc") === "Etudiant" ? localStorage.getItem("id") : '';
    const [contratEtudiant, setContratEtudiant] = useState(null);

    const [readyToRedirect, setIsRegsiteredSessionEtudiant] = useState(false);

    const getByContratEtudiantId = async () => {
        const response = await ContratService.getContratByEtudiantId(id);
        setContratEtudiant(response.data);
    }

    const IsRegsiteredSessionEtudiant = async () => {
        const response = await EtudiantService.isRegistered(id);
        setIsRegsiteredSessionEtudiant(!response.data);
    }

    useEffect(() => {
        getByContratEtudiantId();
        IsRegsiteredSessionEtudiant();
        return () => {
            setContratEtudiant([])
        }
    },[])

    
    if (readyToRedirect) return <Redirect to="/etudiant" />

    return (
        <div>{contratEtudiant != null &&
            <ListeContratsEtudiant contrats={contratEtudiant} />
        }
        </div>
    )

}
