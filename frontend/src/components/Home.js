import React from 'react';
import {Container, List} from "@material-ui/core";

export default function Home(props) {
    if (props.location.search === "?refresh") {
        props.history.replace("/")
        window.location.reload(false);
    }
    const [userId, userDesc] = [localStorage.getItem("id"), localStorage.getItem("desc")];
    // const [reminders, setReminders] = useState(UserService.getReminders(userId))

    //let cards = []

    return (
        <Container>
            {/*<Button onClick={setReminders(UserService.getReminders(userId))}>Refresh</Button>*/}
            <List>
                {/*{reminders}*/}
            </List>
        </Container>
    )
}

