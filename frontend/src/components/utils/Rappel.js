import React, {useState} from "react";
import {Card, CardContent, Typography, CardActions, IconButton} from "@material-ui/core";
import {ArrowForward} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

import {Redirect} from "react-router-dom";

const useStyle = makeStyles({
    root: {
        margin: 30,
        borderColor: "black",
        borderWidth: "thin",
        backgroundColor: "whitesmoke",
        minWidth: 450,
        maxWidth: 550,
    },
    content: {
        float: "left"
    },
    actions: {
        // margin: "auto",
        float: "right"
    },
    icon: {
        color: "black"
    }
})


export default function Rappel(props) {
    const [redirect, setRedirect] = useState(false)
    const classes = useStyle()

    function handleClick() {
        setRedirect(false)
    }

    if (redirect)
        return <Redirect to={props.redirect}/>

    return (
        <Card className={classes.root} variant={"outlined"} onClick={handleClick}>
            <CardContent className={classes.content}>
                <Typography variant={"h5"}>
                    {props.title}
                </Typography>
                <Typography variant={"subtitle1"}>
                    {props.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <ArrowForward className={classes.icon}/>
            </CardActions>
        </Card>
    )

}