import React, { useEffect, useState } from "react";
import EtudiantService from '../../service/EtudiantService';


const optionsReponses = ['Totalement en accord', 
                        'Plutôt en accord', 
                        'Plutôt en désaccord', 
                        'Totalement en désaccord', 
                        'Non Applicable']

const productiviteQuestionsList = [
    { id: "0", question: 'Planifier et organiser son travail de façon efficace' },
    { id: "1", question: 'Comprendre rapidement les directives relatives à son travail' },
    { id: "2", question: 'Maintenir un rythme de travail soutenu' },
    { id: "3", question: 'Établir ses priorités' },
    { id: "4", question: 'Respecter ses échéanciers' },
];

const qualiteTravailQuestionsList = [
    { id: "0", question: 'respecter les mandats qui lui ont été confiés' },
    { id: "1", question: 'porter attention aux détails dans la réalisation de ses tâches' },
    { id: "2", question: 'vérifier son travail, s’assurer que rien n’a été oublié' },
    { id: "3", question: 'rechercher des occasions de se perfectionner' },
    { id: "4", question: 'faire une bonne analyse des problèmes rencontrés' },
];

const relationsQuestionsList = [
    { id: "0", question: 'établir facilement des contacts avec les gens' },
    { id: "1", question: 'contribuer activement au travail d’équipe' },
    { id: "2", question: 's’adapter facilement à la culture de l’entreprise' },
    { id: "3", question: 'accepter les critiques constructives' },
    { id: "4", question: 'être respectueux envers les gens' },
    { id: "5", question: 'faire preuve d’écoute active en essayant de comprendre le point de vue de l’autre' },
];

const habilitesPersoQuestionsList = [
    { id: "0", question: 'Démontrer de l’intérêt et de la motivation au travail' },
    { id: "1", question: 'Exprimer clairement ses idées' },
    { id: "2", question: 'Faire preuve d’initiative' },
    { id: "3", question: 'Accepter les critiques constructives' },
    { id: "4", question: 'Travailler de façon sécuritaire' },
    { id: "5", question: 'Démontrer un bon sens des responsabilités ne requérant qu’un minimum de supervision' },
    { id: "6", question: 'Être ponctuel et assidu à son travail' },
];

const _choixResponses = ['Totalement en accord', 'Plutôt en accord', 'Plutôt en désaccord', 'Totalement en désaccord', 'Non Applicable']


export default function useSetQuestions(id) {
    const [etudiant, setEtudiant] = useState('');
    const [optionsReponse, setOptionsReponse] = useState(optionsReponses)
    const [productiviteQuestions, setProductiviteQuestions] = useState(productiviteQuestionsList);
    const [qualiteTravailQuestions, setQualiteTravailQuestions] = useState(qualiteTravailQuestionsList);
    const [relationsQuestions, setRelationsQuestions] = useState(relationsQuestionsList);
    const [habilitesQuestions, setHabilitesQuestions] = useState(habilitesPersoQuestionsList);


    console.log("render")
    
    return {
        etudiant,
        productiviteQuestions,
        qualiteTravailQuestions,
        relationsQuestions,
        habilitesQuestions,
        optionsReponse,
    
    }
}
