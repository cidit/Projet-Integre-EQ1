import React, { useEffect, useState } from 'react';
import ContratService from '../../service/ContratService';
import { ListeContratsEmployeur } from '../contrat/ListeContrats';

import AuthService from "../../service/security/auth.service";

export default function ContratsEmployeur() {
    const id = AuthService.getTokenDESC().toUpperCase() === "ROLE_EMPLOYEUR" ? AuthService.getTokenId() : '';
    const [contratsEmployeur, setContratsEmployeur] = useState(null);

    const getContratsByEmployeurId = async () => {
        const response = await ContratService.getContratByEmployeurId(id);
        setContratsEmployeur(response.data);
    }

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
