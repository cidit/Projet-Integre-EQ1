import React, {useEffect, useState} from 'react';
import {Container, List, ListItem} from "@material-ui/core";
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
        if (userId !== null)
            UserService.getReminders(userId)
                .then(value => {
                    console.log(value)
                    setReminders(value)
                })
                .catch(reason => console.log(reason))
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


    function define(reminderType) {
        switch (reminderType) {
            case "PAS_DE_CV":
                return ["Pas de CV", "Vous n'avez pas de CV a votre nom.",
                    "/profilEtudiant"]
            case "PAS_DE_CANDIDATURE_SUR_UN_STAGE":
                return ["Pas de candidature", "Vous n'avez pas posé de candidature sur un stage.",
                    "/offrestage"]
            case "SIGNATURE_MANQUANTE_SUR_UN_CONTRAT":
                return ["Pas de signature", "Votre signature est manquante sur un contrat.",
                    getRouteSignature()] // TODO
            case "PAS_ENREGISTRE_CETTE_SESSION":
                return ["Pas enregistré", "Vous n'êtes pas enregistré cette session.",
                    "/profilEtudiant"]
            case "FREQUENTATION_DE_STAGE_PAS_CONFIRMEE":
                return ["Confirmer votre fréquentation", "Vous n'avez pas confirmé votre fréquentation à un stage.",
                    "/listecandidatures"]
            case "PAS_DE_STAGE_OUVERT_CETTE_SESSION":
                return ["Pas de stage cette session", "Vous n'avez pas soumis de stage ouvert cette session.",
                    "/createStage"]
            case "CV_SANS_VETO":
                return ["CVs sans veto", "Un ou plusieurs CVs ont besoin de votre veto.",
                    "/rapportEtudiants"] // TODO verify if its the right route when refactoring
            case "STAGE_SANS_VETO":
                return ["Stages sans veto", "Votre veto n'a pas été appliqué sur un ou plusieurs stages.",
                    "/rapportStages"] // TODO verify if its the right route when refactoring
            case "CONTRAT_PRET_A_ETRE_GENERE":
                return ["Contrats a générer", "Un contrat est prêt à être générer.",
                    "/rapportContrats"] // TODO verify if its the right route when refactoring
            default:
                return ["", "", ""]
        }
    }

    let k = 0;
    return (
        <Container>
            {
                reminders.map(reminder => {
                    let [title, message, redirect] = define(reminder)
                    return <Rappel title={title} message={message} redirect={redirect} key={k++}/>
                })
            }
        </Container>
    )
}
