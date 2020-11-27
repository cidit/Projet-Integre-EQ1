import React, {useEffect, useState} from 'react';
import {Container, List, ListItem} from "@material-ui/core";
import UserService from "../service/UserService";
import Rappel from "./utils/Rappel";

export default function Home(props) {
    if (props.location.search === "?refresh") {
        props.history.replace("/")
        window.location.reload(false);
    }

    const [userId, userDesc] = [localStorage.getItem("id"), localStorage.getItem("desc")];
    const [reminders, setReminders] = useState([])

    useEffect(() => {
        if (userId != null || userId != undefined)
            UserService.getReminders(userId)
                .then(value => {
                    setReminders(value)
                })
                .catch(reason => console.log(reason))
    }, [userId])

    let k = 0;
    return (
        <Container>
            {/*<Button onClick={() => setReminders(UserService.getReminders(userId))}>Refresh</Button>*/}
            {reminders.map(reminder => {
                let [title, message, redirect] = define(reminder)
                return <Rappel title={title} message={message} redirect={redirect} key={k++}/>
            })}
        </Container>
    )
}

function define(reminderType) {
    switch (reminderType) {
        case "PAS_DE_CV":
            return ["Pas de CV", "Vous n'avez pas de CV a votre nom.",
                ""]
        case "PAS_DE_CANDIDATURE_SUR_UN_STAGE":
            return ["Pas de candidature", "Vous n'avez pas posé de candidature sur un stage.",
                ""]
        case "SIGNATURE_MANQUANTE_SUR_UN_CONTRAT":
            return ["Pas de signature", "Votre signature est manquante sur un contrat.",
                ""]
        case "PAS_ENREGISTRE_CETTE_SESSION":
            return ["Pas enregistré", "Vous n'êtes pas enregistré cette session.",
                ""]
        case "FREQUENTATION_DE_STAGE_PAS_CONFIRMEE":
            return ["Confirmer votre fréquenatation", "Vous n'avez pas confirmé votre fréquentation à un stage",
                ""]
        case "UN_STAGE_ENCORS_OUVERT_A_DES_CANDIDATURES":
            return ["Candidatures sur un stage ouvert", "Un stage encore ouvert à encore des candidatures.",
                ""]
        case "PAS_DE_STAGE_OUVERT_CETTE_SESSION":
            return ["Pas de stage cette session", "Vous n'avez pas soumis de stage ouvert cette session.",
                ""]
        case "CV_SANS_VETO":
            return ["CVs sans veto", "Votre veto n'a pas été appliqué sur un ou plusieurs CVs.",
                ""]
        case "STAGE_SANS_VETO":
            return ["Stages sans veto", "Votre veto n'a pas été appliqué sur un ou plusieurs stages.",
                ""]
        case "CONTRAT_PRET_A_ETRE_GENERE":
            return ["Contrats a générer", "Un contrat est prêt à être générer.",
                ""]
        case "NOUVELLE_SESSION_IMINENTE":
            return ["Nouvelle Session", "Une nouvelle session arrive bientot!",
                ""]
        default:
            return ["", "", ""]
    }
}