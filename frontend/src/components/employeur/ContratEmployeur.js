import React, { useEffect, useState } from 'react';
import ContratService from '../../service/ContratService';
import { ListeContratsEmployeur } from '../contrat/ListeContrats';

export default function ContratsEmployeur() {
    const id = localStorage.getItem("desc") === "Employeur" ? localStorage.getItem("id") : '';
    const [contratsEmployeur, setContratsEmployeur] = useState(null);

    //get contrats by employeur
    const getContratsByEmployeurId = async () => {
        const response = await ContratService.getContratByEmployeurId(id);
        setContratsEmployeur(response.data);
    }

    //monter et demonter le composant (equivaut -> ComponentDidMOunt + componentWillUnmount)
    //https://fr.reactjs.org/docs/hooks-effect.html

    useEffect(() => {
        getContratsByEmployeurId();
        return () => {
            setContratsEmployeur([]);
        }
    }, [])

    return (
        <div>{contratsEmployeur != null &&
            <ListeContratsEmployeur contrats={contratsEmployeur} />
        }
        </div>
    )
}
