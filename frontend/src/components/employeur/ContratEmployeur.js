import React from 'react'
import ListeContrats from '../contrat/ListeContrats'
import { useState, useEffect } from "react";
import EmployeurService from '../../service/EmployeurService'
import useListeContrats from '../contrat/useListeContrats'
import ContratService from '../../service/ContratService'

export default function ContratsEmployeur() {
    const id = localStorage.getItem("desc") === "Employeur" ? localStorage.getItem("id") : '';
    const [contratsEmployeur, setContratsEmployeur] = useState([]);
    const [employeur, setEmployeur] = useState(null);

    //get contrats by employeur
    const getContratsByEmployeurId = async () => {

        const response = await ContratService.getContratByEmployeurId(id);
        setContratsEmployeur(response.data);
        console.log("inside useEffect employeur")
    }

    //monter et demonter le composant (equivaut -> ComponentDidMOunt + componentWillUnmount)
    //https://fr.reactjs.org/docs/hooks-effect.html

    useEffect(() => {
        getContratsByEmployeurId();
        return () => {
        }
    }, [])

    return (
        <div>
            <ListeContrats contrat={contratsEmployeur} />
        </div>
    )
}
