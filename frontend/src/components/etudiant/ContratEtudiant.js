import React, { useEffect, useState } from 'react';
import ContratService from '../../service/ContratService';
import ListeContrats from '../contrat/ListeContrats';

export default function ContratEtudiant() {
    const id = localStorage.getItem("desc") === "Etudiant" ? localStorage.getItem("id") : '';
    const [contratEtudiant, setContratEtudiant] = useState(null);

    const getByContratEtudaintId = async () => {
        const response = await ContratService.getContratByEtudiantId(id);
        setContratEtudiant(response.data);
    }

    useEffect(() => {
        getByContratEtudaintId();
        return () => {
            setContratEtudiant([])
        }
    },[])

    return (
        <div>{contratEtudiant != null &&
            <ListeContrats contrat={contratEtudiant} />
        }
        </div>
    )

}
