
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from "react";
import EtudiantService from '../../service/EtudiantService';
import { makeStyles, Avatar, Grid, Paper, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useRouteMatch } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import useSetQuestions from './useSetQuestions';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '70%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function EvaluationStagiaire() {
    const classes = useStyles();
    const { params } = useRouteMatch();
    const [redirect, setRedirect] = useState(false)

    //defini origin du id
    const{etudiant} = useSetQuestions(1);


    const goToEvaluation=()=>{
        setRedirect(true);
    }


    if(redirect) {
        return <Redirect to={`/createEvaluation/${etudiant.id}`} />
    } 
    return (
        <div>
            <Paper className={classes.paper} width="75%">
                <Typography className={classes.heading} align='center'>
                    FICHE D’ÉVALUATION DU STAGIAIRE
              </Typography>
                <Avatar alt={etudiant.nom} src="/static/images/avatar/1.jpg" className={classes.large} />
                <Typography variant="h4" align='center'>{etudiant.prenom} {etudiant.nom}</Typography>
                <Typography variant="subtitle2" align='center'>{etudiant.programme} </Typography>
                <br></br>

                <Typography variant="subtitle2" align='center'>
                    <PersonIcon /> Information
                 </Typography>
                <br></br>

                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>Téléphone</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>{etudiant.telephone}</Paper>
                    </Grid>
                </Grid>
                <Grid container justify="center" >
                <Button variant="contained" color="primary" className='m-3' onClick={goToEvaluation}>
                    Commmencer l'evaluation
                </Button>
            </Grid>
            </Paper>


           
        </div>


    )
}
