import {ListeContratsEtudiant} from '../contrat/ListeContrats'
import React, { useEffect, useState } from 'react';
import ContratService from '../../service/ContratService';

export default function ContratEtudiant() {
    const id = localStorage.getItem("desc") === "Etudiant" ? localStorage.getItem("id") : '';
    const [contratEtudiant, setContratEtudiant] = useState(null);

    const getByContratEtudiantId = async () => {
        const response = await ContratService.getContratByEtudiantId(id);
        setContratEtudiant(response.data);
    }

    useEffect(() => {
        getByContratEtudiantId();
        return () => {
            setContratEtudiant([])
        }
    },[])

    return (
        <div>{contratEtudiant != null &&
            <ListeContratsEtudiant contrats={contratEtudiant} />
        }
        </div>
    )

}
