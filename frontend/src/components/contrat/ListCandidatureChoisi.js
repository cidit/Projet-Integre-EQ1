import React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CandidatureService from '../../service/CandidatureService'
import { Button, Container } from '@material-ui/core';
import ChoisirTemplateContrat from './ChoisirTemplateContrat';
import useDocuments from './useDocuments';
import useAssistantContrat from './useAssistantContrat';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
            backgroundColor:'#E2E4E3',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [candidature, setCandidature] = useState(null);
    const [isCandidatureValide, setIsCandidatureValide] = useState(false);
    const classes = useRowStyles();

const handleSelectCandidature = (_row) => {
    setCandidature(_row);

    setCandidature(_row);
    

    

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
                <TableCell ><button className="btn btn-primary" onClick={() => handleSelectCandidature(row)}>generer contrat</button></TableCell>
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
                            <Table size="big" aria-label="purchases">
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



export default function ListCandidatureChoisi() {
    const [candidaturesChoisis, setCandidaturesChoisis] = useState([]);

    const getCandidaturesChoisis = async () => {
        const response = await CandidatureService.getCandidaturesChoisis();
        setCandidaturesChoisis(response.data);
    }

    useEffect(() => {
        getCandidaturesChoisis();
        return () => {
            setCandidaturesChoisis([]);
        }
    }, []);


    //return <ChoisirTemplateContrat parametre={} />

    return (
        <Container>
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
                               generer contrat
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
        </Container>

    )
}
