import React, {useEffect, useState} from 'react';
import {Container, List, Button, Typography} from "@material-ui/core";
import UserService from "../service/UserService";

export default function Home(props) {
    if (props.location.search === "?refresh") {
        props.history.replace("/")
        window.location.reload(false);
    }
    const [userId, userDesc] = [localStorage.getItem("id"), localStorage.getItem("desc")];
    const [reminders, setReminders] = useState([])

    if (userId != undefined)
        UserService.getReminders(userId)
            .then(value => {
                setReminders(value)
            })
            .catch(reason => console.log(reason))

    function define(reminderType) {
        switch (reminderType) {
            case "NO_CV":
                return <p>Vous n'avez pas de CV a votre nom</p>
            case "NO_CANDIDATURE_ON_STAGE":
                return <p>Vous n'avez pas posé de candidature sur aucun stage</p>
            case "SIGNATURE_MISSING_ON_CONTRAT":
                return <p>Votre signature est manquante sur un contrat</p>
            case "NOT_REGISTERED_THIS_SESSION":
                return <p>Vous n'etes pas enregistré cette session</p>
            case "STAGE_FREQUENTATION_NOT_CONFIRMED":
                return <p>vous n'avez confirmé votre fréquentation à aucun stage</p>
            case "OPEN_STAGE_HAS_CANDIDATURES":
                return <p>un stage encore ouvert a des candidatures</p>
            case "NO_OPEN_STAGE_THIS_SESSION":
                return <p>vous n'avez pas soumis de stage ouvert cette session</p>
            case "UNREVIEWED_CVS":
                return <p>votre veto n'a pas été appliqué sur un ou plusieurs CV</p>
            case "UNREVIEWED_STAGES":
                return <p>votre veto n'a pas été appliqué sur un ou plusieurs stage</p>
            case "CONTRAT_READY_TO_BE_GENERATED":
                return <p>Un contrat est prêt à être généré</p>
            case "NEW_SESSION_SOON":
                return <p>Une nouvelle session arrive bientot!</p>
            default:
                return <></>
        }
    }

    console.log(reminders)
    return (
        <Container>
            {/*<Button onClick={() => setReminders(UserService.getReminders(userId))}>Refresh</Button>*/}
            <List>
                {reminders.map(reminder => define(reminder))}
            </List>
        </Container>
    )
}



