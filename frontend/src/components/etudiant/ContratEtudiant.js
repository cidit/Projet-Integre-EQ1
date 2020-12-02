import {ListeContratsEtudiant} from '../contrat/ListeContrats'
import React, {useEffect, useState} from 'react';
import ContratService from '../../service/ContratService';

import EtudiantService from "../../service/EtudiantService";

import { useHistory } from "react-router-dom";

import AuthService from "../../service/security/auth.service";

export default function ContratEtudiant() {
    
    const history = useHistory();
    
    const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_ETUDIANT" ? AuthService.getTokenId() : '';
    
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
        <div>{contratEtudiant != null &&
        <ListeContratsEtudiant contrats={contratEtudiant}/>
        }
        </div>
    )

}
