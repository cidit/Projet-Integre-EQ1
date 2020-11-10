import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from "react";
import EtudiantService from '../../service/EtudiantService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function EvaluationStagiaire() {
    const [etudiant, setetudiant] = useState('')
    const classes = useStyles();


    const getEtudiant = async () => {
        const response = await EtudiantService.getEtudiantById(1);
        setetudiant(response.data);
        console.log(response.data)
    }

    useEffect(() => {
        getEtudiant()
        return () => {
            setetudiant('')
        }
    }, [])


    return (
        <div>
            <div className='container'>
                <Typography className={classes.heading} >
                    FICHE D’ÉVALUATION DU STAGIAIRE
              </Typography>

                <div class="card" >
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cras justo odio</li>
                        <li class="list-group-item">Dapibus ac facilisis in</li>
                        <li class="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
        </div>


    )
}
