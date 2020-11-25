import {Card, CardActions, CardHeader, IconButton} from "material-ui";
import React, {useState} from "react";
import {CardContent, Typography} from "@material-ui/core";

// import {ArrowForward} from "@material-ui/icons/ArrowForward";
// import {Redirect} from "react-router-dom";

export default function Rappel(props) {
    const [redirect, setRedirect] = useState(false)

    function handleClick() {
        setRedirect(false)
    }

    // if (redirect)
    //     return <Redirect to={props.redirect}/>

    return (
        <Card>
            <CardContent>
                <Typography>
                    {props.title}
                </Typography>
                <Typography>
                    {props.message}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={handleClick}>
                    {/*<ArrowForward/>*/}
                </IconButton>
            </CardActions>
        </Card>
    )

}