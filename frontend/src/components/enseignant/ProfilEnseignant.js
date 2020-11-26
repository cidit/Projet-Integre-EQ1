import { Avatar, makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import React, { useEffect, useState } from "react";
import photo from '../../images/photo-avatar-profil.png';
import EnseignantService from '../../service/EnseignantService'


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

export default function ProfilEnseignant() {
    const classes = useStyles();
    const [enseignant, setEtudiant] = useState('');
    const id = localStorage.getItem("desc") === "Enseignant" ? localStorage.getItem("id") : '';

    const getEnseignant = async () => {
        const response = await EnseignantService.getEnseignantById(id)
        console.log(response)
        setEtudiant(response.data);
    }

    useEffect(() => {
        getEnseignant()
        return () => {
            setEtudiant('')
        }
    }, [])

    return (
        <div className='container'>
            <div className='row justify-content-md-center p-4'>
                <Avatar alt={enseignant.nom} src={photo} className={classes.large} />
            </div>

            <Typography variant="h4" align='center'>{enseignant.prenom} {enseignant.nom}</Typography>
            <Typography variant="subtitle2" align='center'>{enseignant.programme} </Typography>
            <br></br>

            <Typography variant="subtitle2" align='center'>
                <PersonIcon /> <strong>Information</strong>
            </Typography>
            <br></br>

            <div className='container text-left justify-content-center'>
                <div className='row justify-content-center '>
                    <div className='col-sm-2  '>
                        <Typography variant="subtitle2" align='left'><strong>Téléphone: </strong></Typography>
                    </div>
                    <div className='col-sm-3 '>
                        <Typography variant="subtitle2" align='left'>{enseignant.telephone}</Typography>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-sm-2 '>
                        <Typography variant="subtitle2" align='left'><strong>Email:</strong></Typography>
                    </div>
                    <div className='col-sm-3 '>
                        <Typography variant="subtitle2" align='left'>{enseignant.email}</Typography>
                    </div>
                </div>


            </div>



        </div>
    )
}

