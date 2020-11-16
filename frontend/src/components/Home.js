import React, {useState} from 'react';
import {Container, List, Button, Typography} from "@material-ui/core";
import UserService from "../service/UserService";

export default async function Home(props) {
    if (props.location.search === "?refresh") {
        props.history.replace("/")
        window.location.reload(false);
    }
    const [userId, userDesc] = [localStorage.getItem("id"), localStorage.getItem("desc")];
    // const [reminders, setReminders] = useState(UserService.getReminders(userId))
    let reminders = await UserService.getReminders(userId)

    // UserService.getReminders(userId)
    //     .then(value => reminders = value)
    //     .catch(reason => console.log("nope"))

    console.log(typeof reminders)
    // let cards = reminders.map(reminder => <Typography>{reminder}</Typography>)
    console.log(reminders)
    return (
        <Container>
            {/*<Button onClick={() => setReminders(UserService.getReminders(userId))}>Refresh</Button>*/}
            <List>
                {reminders}
            </List>
        </Container>
    )
}

