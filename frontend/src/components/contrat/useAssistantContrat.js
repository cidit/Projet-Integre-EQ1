import React from 'react'
import { useState, useEffect } from "react";
import ContratService from "../../service/ContratService";

export default function useAssistantContrat(candidature) {
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState('');
    const [candidatureToContrat, setCandidatureToContrat] = useState('');

    useEffect(() => {
        setCandidatureToContrat(candidature);
        return () => {
            candidatureToContrat = null;
        }
    }, [])

        return {
            isLoading,
            error,
            candidatureToContrat
        };
    

   
}
