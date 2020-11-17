import { useState } from "react";


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
    { id: "0", question: 'Respecter les mandats qui lui ont été confiés' },
    { id: "1", question: 'Porter attention aux détails dans la réalisation de ses tâches' },
    { id: "2", question: 'Vérifier son travail, s’assurer que rien n’a été oublié' },
    { id: "3", question: 'Rechercher des occasions de se perfectionner' },
    { id: "4", question: 'Faire une bonne analyse des problèmes rencontrés' },
];

const relationsQuestionsList = [
    { id: "0", question: 'Établir facilement des contacts avec les gens' },
    { id: "1", question: 'Contribuer activement au travail d’équipe' },
    { id: "2", question: 'S’adapter facilement à la culture de l’entreprise' },
    { id: "3", question: 'Accepter les critiques constructives' },
    { id: "4", question: 'Être respectueux envers les gens' },
    { id: "5", question: 'Faire preuve d’écoute active en essayant de comprendre le point de vue de l’autre' },
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

//milieu de stage 
const evaluationMilieuStage = [
    { id: "0", question: 'Les tâches confiées au stagiaire sont conformes aux tâches annoncées dans l’entente de stage.' },
    { id: "1", question: 'Des mesures d’accueil facilitent l’intégration du nouveau stagiaire.' },
    { id: "2", question: 'Le temps réel consacré à l’encadrement du stagiaire est suffisant' },
    { id: "3", question: 'L’environnement de travail respecte les normes d’hygiène et de sécurité au travail.' },
    { id: "4", question: 'Le climat de travail est agréable.' },
    { id: "5", question: 'Le milieu de stage est accessible par transport en commun.' },
    { id: "6", question: 'Le salaire offert est intéressant pour le stagiaire' },
    { id: "7", question: 'La communication avec le superviseur de stage facilite le déroulement du stage.' },
    { id: "8", question: 'L’équipement fourni est adéquat pour réaliser les tâches confiées.' },
    { id: "9", question: 'Le volume de travail est acceptable.' },
];



export default function useSetQuestions(id) {
    const [etudiant, setEtudiant] = useState('');
    const [optionsReponse, setOptionsReponse] = useState(optionsReponses)
    const [productiviteQuestions, setProductiviteQuestions] = useState(productiviteQuestionsList);
    const [qualiteTravailQuestions, setQualiteTravailQuestions] = useState(qualiteTravailQuestionsList);
    const [relationsQuestions, setRelationsQuestions] = useState(relationsQuestionsList);
    const [habilitesQuestions, setHabilitesQuestions] = useState(habilitesPersoQuestionsList);
    const [evaluationMilieuStageQuestions, setEvaluationMilieuStageQuestions] = useState(evaluationMilieuStage)


    console.log("render")
    
    return {
        etudiant,
        productiviteQuestions,
        qualiteTravailQuestions,
        relationsQuestions,
        habilitesQuestions,
        optionsReponse,
        evaluationMilieuStageQuestions
    }
}
