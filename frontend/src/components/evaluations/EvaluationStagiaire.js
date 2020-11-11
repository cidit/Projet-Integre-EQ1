
import { Avatar, Button, Grid, makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import React, { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import photo from '../../images/photo-avatar-profil.png';
import EtudiantService from '../../service/EtudiantService';


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
    const [etudiant, setEtudiant] = useState('')

    //defini origin du id
    


    const goToEvaluation=()=>{
        setRedirect(true);
    }

    const getEtudiant = async () => {
        const response = await EtudiantService.getEtudiantById(1);
        setEtudiant(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        getEtudiant()
        return () => {
            setEtudiant('')
        }
    }, [])


    if(redirect) {
        return <Redirect to={`/questionProductivite/${etudiant.id}`} />
    } 
    return (
        <div>
            <Paper className={classes.paper} width="75%">
                <Typography className={classes.heading} align='center'>
                    FICHE D’ÉVALUATION DU STAGIAIRE
              </Typography>
                <Avatar alt={etudiant.nom} src={photo} className={classes.large} />
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
