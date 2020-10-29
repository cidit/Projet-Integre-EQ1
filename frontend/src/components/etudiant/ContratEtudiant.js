import React from 'react'
import ListeContrats from '../contrat/ListeContrats'
import { useState, useEffect } from "react";
import EmployeurService from '../../service/EmployeurService'
import useListeContrats from '../contrat/useListeContrats'
import ContratService from '../../service/ContratService'

export default function ContratEtudiant() {
    const id  = localStorage.getItem("desc") === "Etudiant" ? localStorage.getItem("id") : '';
    const [contratEtudiant, setContratEtudiant] = useState([]);
    const [etudiant , setEtudiant] = useState(null);

    const getByContratEtudaintId = async () => {
        const response = await ContratService.getContratByEtudiantId(id);
        setContratEtudiant(response.data);
        console.log("inside useEffect Etudiant")
    }

    useEffect(() => {
        getByContratEtudaintId();
        return () => {
        }
    }, [])

    return (
        <div>
            <ListeContrats contrat={contratEtudiant}/>
        </div>
    )
}
