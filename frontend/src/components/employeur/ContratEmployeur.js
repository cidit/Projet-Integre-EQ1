import React from 'react'
import ListeContrats from '../contrat/ListeContrats'
import { useState, useEffect } from "react";
import EmployeurService from '../../service/EmployeurService'
import useListeContrats from '../contrat/useListeContrats'

export default function ContratsEmployeur() {
    const [id , setId] = useState(0);
    const [employeur , setEmployeur] = useState(null);

   const getEmployeur= async ()=>{
        var id;
        if (localStorage.getItem("desc") == "Employeur"){
            id = localStorage.getItem("id");
            setId(id);
        }

        const response = await EmployeurService.getById(id);
        setEmployeur(response.data);
    };


    const { contratsEmployeur, error, isLoading, isEmployeur, isEtudiant } = useListeContrats(id);

    useEffect(() => {
        getEmployeur();
        return () => {
           
        }
    }, [])

    return (
        <div>
            <ListeContrats contrat={contratsEmployeur}/>
        </div>
    )
}
