import {
    makeStyles, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import EnseignantService from '../../service/EnseignantService';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '70%',
        backgroundColor: '',
        fontWeight: 'bold'
    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
        maxWidth: '50%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15
    }
}));

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            padding: theme.spacing(1),
            borderBottom: 'unset',
            //backgroundColor: '#E9E9E9  ',
        },
    },
}));
export default function ListEnseignants() {
    const [enseignants, setEnseignants] = useState([])
    const classes = useStyles();

    const getEnseignants = async () => {
        const response = await EnseignantService.getEnseignantsInscrits();
        setEnseignants(response.data);
    }

    useEffect(() => {
        getEnseignants()
        return () => {
            setEnseignants([])
        }
    }, [])


    if (enseignants.length === 0) {
        return (
            AlertAucunContrat(true)
        )
    } else {
        return (
            <div className='container-fluid'>
                {enseignants &&
                    <>
                        <TableContainer >
                        <h4 align='center' className='m-2 sticky-top' ><strong>List enseignants </strong></h4>
                       
                            <Table className="table table-striped">
                                <TableHead className={classes.root}>
                                    <TableRow >
                                        <TableCell className={classes.textTitle} >Nom de l'enseignant</TableCell>
                                        <TableCell className={classes.textTitle}>Programme</TableCell>
                                        <TableCell className={classes.textTitle}>Courriel</TableCell>
                                        <TableCell className={classes.textTitle}>Téléphone</TableCell>
                                       
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {enseignants.map((row) => (
                                        <Row key={row.id} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
            </div>
        )
    }
};


function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
    const [arrow, setArrow] = useState(false);
    const history = useHistory();

    const handleClickRow = (_row) => {
        history.push("etudiantsAuEnseignant/" +_row.nom + "/" +_row.prenom + "/" + _row.id+ "/" +_row.programme );
    }

    const showArrow = () => {
        setArrow(true)
    }

    const hideArrow = () => {
        setArrow(false)
    }

    return (
        <React.Fragment>
            <Tooltip open={arrow} placement="left" onClose={hideArrow} onOpen={showArrow} title="Assigner">
                <TableRow className={classes.root} onClick={() => handleClickRow(row)} style={{ cursor: 'pointer' }} hover>
                    <TableCell >{row.prenom} {row.nom}</TableCell>
                    <TableCell >{row.programme}</TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell>{row.telephone}</TableCell>
                    {/* {arrow &&

                        <TableCell style={{ backgroundColor: "#E9E9E9 " }} >
                            <ArrowForwardIcon color='disabled' fontSize='small' />
                        </TableCell>

                    } */}
                </TableRow>
            </Tooltip>
        </React.Fragment>
    );

};
function AlertAucunContrat(isGestionnaire) {
    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity="info" variant="filled" className="m-3 text-center">Il n'y a pas d'enseignant inscrit</Alert>
            </div>
        </div>
    </div>;
}


