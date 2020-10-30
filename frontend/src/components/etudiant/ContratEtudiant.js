import React from 'react'
import ListeContrats from '../contrat/ListeContrats'
import { useState, useEffect } from "react";
import EmployeurService from '../../service/EmployeurService'
import useListeContrats from '../contrat/useListeContrats'
import ContratService from '../../service/ContratService'
import { Alert } from '@material-ui/lab';
import IsLoading from '../../components/utils/IsLoading'

export default function ContratEtudiant() {
    const id = localStorage.getItem("desc") === "Etudiant" ? localStorage.getItem("id") : '';
    const [contratEtudiant, setContratEtudiant] = useState(null);
    const [etudiant, setEtudiant] = useState(null);

    const getByContratEtudaintId = async () => {
        const response = await ContratService.getContratByEtudiantId(id);
        setContratEtudiant(response.data);
    }

    useEffect(() => {
        getByContratEtudaintId();
        return () => {
            setContratEtudiant([])
        }
    }, [])

    return (
        <div>{contratEtudiant != null &&
            <ListeContrats contrat={contratEtudiant} />
        }
        </div>
    )

}
