import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ContratService from '../../service/ContratService';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            backgroundColor: '#E9E9E9  ',
        },
    },
});

export default function ListCandidatureChoisi() {
    const [candidaturesChoisis, setCandidaturesChoisis] = useState([]);

    const getCandidaturesChoisis = async () => {
        var idSession = localStorage.getItem("session");
        const response = await ContratService.getCandidaturesSansContrat(idSession);
        setCandidaturesChoisis(response.data);
    }

    useEffect(() => {
        getCandidaturesChoisis();
        return () => {
            setCandidaturesChoisis([]);
        }
    }, []);

    if (candidaturesChoisis.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <Container>
                {candidaturesChoisis &&
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Détails</TableCell>
                                    <TableCell >Employeur</TableCell>
                                    <TableCell >Étudiant prenom</TableCell>
                                    <TableCell >Étudiant nom</TableCell>
                                    <TableCell >Stage</TableCell>
                                    <TableCell >
                                        Générer un contrat
                                </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidaturesChoisis.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Container>
        )
    }
};



function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [candidature, setCandidature] = useState(null);
    const [isCandidatureValide, setIsCandidatureValide] = useState(false);
    const classes = useRowStyles();
    const [redirect, setRedirect] = useState(false);


    const handleSelectCandidature = (_row) => {
        setCandidature(_row);
        setRedirect(true);
    }



    if (redirect) {
        //CreationContrat(candidature)

        return <Redirect to={`/CreationContrat/${candidature.id}`} />
    }
    return (

        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton align="right" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell >{row.stage.employeur.nom}</TableCell>
                <TableCell >{row.etudiant.prenom}</TableCell>
                <TableCell>{row.etudiant.nom}</TableCell>
                <TableCell >{row.stage.titre}</TableCell>
                <TableCell ><button className="btn btn-primary" onClick={() => handleSelectCandidature(row)}>Générer contrat</button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1} >

                            {/* Employeur */}
                            <Typography variant="h6" gutterBottom component="div" className="pt-3 text-info">
                                Employeur
                </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Adresse</TableCell>
                                        <TableCell align="right">Téléphone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            {row.stage.employeur.email}
                                        </TableCell>
                                        <TableCell>{row.stage.employeur.adresse}</TableCell>
                                        <TableCell align="right">{row.stage.employeur.telephone}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Etudiant */}

                            <Typography variant="h6" gutterBottom component="div" className="pt-3 text-info">
                                Étudiant(e)
                </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow className="border-bottom-0">
                                        <TableCell>Programme</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Matricule</TableCell>
                                        <TableCell>Adresse</TableCell>
                                        <TableCell align="right">Téléphone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            {row.etudiant.programme}
                                        </TableCell>
                                        <TableCell>{row.etudiant.email}</TableCell>
                                        <TableCell>{row.etudiant.matricule}</TableCell>
                                        <TableCell>{row.etudiant.adresse}</TableCell>
                                        <TableCell align="right">{row.etudiant.telephone}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {/* Stage */}

                            <Typography variant="h6" gutterBottom component="div" className="pt-3 text-info">
                                Stage
                </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date début</TableCell>
                                        <TableCell>Date fin</TableCell>
                                        <TableCell>Ville</TableCell>
                                        <TableCell>Salaire</TableCell>
                                        <TableCell>Heures par semaine</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell component="th" scope="row">
                                            {row.stage.dateDebut}
                                        </TableCell>
                                        <TableCell>{row.stage.dateFin}</TableCell>
                                        <TableCell>{row.stage.ville}</TableCell>
                                        <TableCell>{row.stage.salaire}</TableCell>
                                        <TableCell>{row.stage.nbHeuresParSemaine}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}
function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
      <div className="row justify-content-md-center">
        <div className="col">
         <Alert severity="info" variant="filled" className="m-3 text-center">Vous n'avez aucun contrat à signer pour le moment</Alert>
        </div>
      </div>
    </div>;
  }
