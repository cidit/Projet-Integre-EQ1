import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import UserService from "../service/UserService";
import Rappel from "./utils/Rappel";
import {useHistory} from "react-router-dom";

export default function Home(props) {
    const [userId, userDesc] = [localStorage.getItem("id"), localStorage.getItem("desc")]
    const [reminders, setReminders] = useState([])
    const history = useHistory()

    if (userDesc === null) {
        history.push('/login');
    }

    if (props.location.search === "?refresh") {
        props.history.replace("/")
        window.location.reload(false);
    }

    useEffect(() => {
        if (userId != null)
            UserService.getReminders(userId)
                .then(value => {
                    setReminders(value)
                })
    }, [userId])

    function getRouteSignature() {
        switch (userDesc) {
            case "etudiant":
                return "/contratsEtudiant"
            case "employeur":
                return "/contratsEmployeur"
            default:
                return "/none"
        }
    }

    const values = {
        "PAS_DE_CV": [
            "Pas de CV",
            "Vous n'avez pas de CV a votre nom.",
            "/profilEtudiant",
        ],
        "PAS_DE_CANDIDATURE_SUR_UN_STAGE": [
            "Pas de candidature",
            "Vous n'avez pas posé de candidature sur un stage.",
            "/offrestage",
        ],
        "SIGNATURE_MANQUANTE_SUR_UN_CONTRAT": [
            "Pas de signature",
            "Votre signature est manquante sur un contrat.",
            getRouteSignature(),
        ], // TODO
        "PAS_ENREGISTRE_CETTE_SESSION": [
            "Pas enregistré",
            "Vous n'êtes pas enregistré cette session.",
            "/profilEtudiant",
        ],
        "FREQUENTATION_DE_STAGE_PAS_CONFIRMEE": [
            "Confirmer votre fréquentation",
            "Vous n'avez pas confirmé votre fréquentation à un stage.",
            "/listecandidatures",
        ],
        "PAS_DE_STAGE_OUVERT_CETTE_SESSION": [
            "Pas de stage cette session",
            "Vous n'avez pas soumis de stage ouvert cette session.",
            "/createStage",
        ],
        "CV_SANS_VETO": [
            "CVs sans veto",
            "Un ou plusieurs CVs ont besoin de votre veto.",
            "/rapportEtudiant"
        ], // TODO verify if its the right route when refactoring
        "STAGE_SANS_VETO": [
            "Stages sans veto",
            "Votre veto n'a pas été appliqué sur un ou plusieurs stages.",
            "/rapportStage",
        ], // TODO verify if its the right route when refactoring
        "CONTRAT_PRET_A_ETRE_GENERE": [
            "Contrats a générer",
            "Un contrat est prêt à être générer.",
            "/rapportContrat"
        ], // TODO verify if its the right route when refactoring
    }

    return (
        <Container>
            {
                reminders.map(reminder => {
                    let [title, message, redirect] = values[reminder]
                    return <Rappel title={title} message={message} redirect={redirect} key={reminder}/>
                })
            }
        </Container>
    )
}
