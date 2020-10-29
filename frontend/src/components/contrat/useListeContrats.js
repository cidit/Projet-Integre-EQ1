import React from 'react'
import { useState, useEffect } from "react";
import ContratService from '../../service/ContratService'

export default function useListeContrats(props) {
    const [contrats, setContrats] = useState(null);
    const [contratsEmployeur, setContratsEmployeur] = useState(null);
    const [contratEtudiant, setContratEtudiant] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEmployeur, setIsEmployeur] = useState(false);
    const [isEtudiant, setIsEtudiant] = useState(false);


    //get All contrats
    const getAllContrats = async () => {
        const response = await ContratService.getContrats();
        setContrats(response.data)
        setIsLoading(false);
    }

    useEffect(() => {
        getAllContrats();
        return () => {
        }
    }, [])


    //get contrats by employeur
    const getByEmployeurId = async () => {
        await ContratService.getByEmployeurId(props.id).then((res) => {
            setContratsEmployeur(res.data);
        });
        setIsEmployeur(true)
        setIsLoading(false);
        console.log("inside useEffect employeur")
    }

    //monter et demonter le composant (equivaut -> ComponentDidMOunt + componentWillUnmount)
    //https://fr.reactjs.org/docs/hooks-effect.html

    useEffect(() => {
        getByEmployeurId();
        return () => {
        }
    }, [])

/*
    //get contrats by etudiant
    const getByEtudaintId = async (_id) => {
        ContratService.getByEtudaintId(id).then((res) => {
            setContratEtudiant(res.data);
        });
        setIsLoading(false);
        setIsEtudiant(true);
        console.log("inside useEffect Etudiant")
    }

    useEffect(() => {
        getByEtudaintId();
        return () => {
        }
    }, [contratEtudiant])*/


    return {
        contrats,
        contratsEmployeur,
        contratEtudiant,
        error,
        isLoading,
        isEmployeur,
        isEtudiant
    }
}
