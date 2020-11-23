import React from 'react'

import { useState, useEffect } from "react";

import ContratService from '../../service/ContratService'
import {ListeContratsGestionnaire} from "../contrat/ListeContrats";

export default function ContratsGestionnaire() {
    const [contratsGestionnaire, setContratsGestionnaire] = useState(null);
    const getContrats = async () => {
        var idSession = localStorage.getItem("session");
        const response = await ContratService.getContrats(idSession);
        setContratsGestionnaire(response.data);
    }

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
