import React from 'react'
import ListeContrats, {ListeContratsGestionnaire} from '../contrat/ListeContrats'
import { useState, useEffect } from "react";
import EmployeurService from '../../service/EmployeurService'
import useListeContrats from '../contrat/useListeContrats'
import ContratService from '../../service/ContratService'

export default function ContratsGestionnaire() {
    const id = localStorage.getItem("desc") === "Gestionnaire" ? localStorage.getItem("id") : '';
    const [contratsGestionnaire, setContratsGestionnaire] = useState(null);
    const [employeur, setEmployeur] = useState(null);

    //get contrats by employeur
    const getContrats = async () => {
        const response = await ContratService.getContrats();
        setContratsGestionnaire(response.data);
    }

    //monter et demonter le composant (equivaut -> ComponentDidMOunt + componentWillUnmount)
    //https://fr.reactjs.org/docs/hooks-effect.html

    useEffect(() => {
        getContrats();
        return () => {
            setContratsGestionnaire([]);
        }
    }, [])

    return (
        <div>{contratsGestionnaire != null &&
        <ListeContratsGestionnaire contrats={contratsGestionnaire} />
        }
        </div>
    )
}
