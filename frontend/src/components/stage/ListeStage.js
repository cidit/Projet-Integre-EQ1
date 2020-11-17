import React, {Component} from 'react';

import '../../css/StageVeto.css';
import { Table, TableBody, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import StageService from "../../service/StageService";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {makeStyles} from "@material-ui/core/styles";

export default class ListStagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
            showSnackbar: false
        };

        handleClick = handleClick.bind(this);
    }


    componentDidMount() {
        StageService.getStages().then((res) => {
            this.setState({stage: res.data})
        });
    }

    findStage(id) {
        for (let i = 0; i < this.state.stage.length; i++) {
            if (this.state.stage[i].id === id) {
                return this.state.stage[i]
            }
        }
    }

    handleCloseSnackbar = () => this.setState({showSnackbar: false});
    handleShowSnackbar = () => this.setState({showSnackbar: true});

    render() {


        return (

            <div>
                <Test stages={this.state.stage}/>

            </div>

        );
    }


}

function handleClick (event, id)  {
    this.props.history.push('/stage/' +id);
    console.log("OK")
}

function Test(props){
    const classes= useStyles();
    const headCells = [
        { id: 'titre', numeric: false, disablePadding: true, label: 'Titre', align: 'left' },
        { id: 'statut', numeric: false, disablePadding: false, label: 'Statut', align: 'left' },
        { id: 'programme', numeric: true, disablePadding: false, label: 'Programme', align: 'left' },
        { id: 'ville', numeric: true, disablePadding: false, label: 'Ville', align: 'left' },
    ];
    return(
        <>
            <h5 className="card-title text-center p-3" style={{background: '#E3F9F0 '}}>Stages</h5>

            <TableContainer  >
                <Table
                    // stickyHeader
                    size="small"
                    className={classes.root}
                >
                    <TableHead >
                        <TableRow className={classes.header}>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.align}
                                    // padding={headCell.disablePadding ? 'none' : 'default'}
                                    // sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        // active={orderBy === headCell.id}
                                        // direction={orderBy === headCell.id ? order : 'asc'}
                                        // onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                        {/*                            {orderBy === headCell.id ? (*/}
                                        {/*                                <span className={classes.visuallyHidden}>*/}
                                        {/*  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}*/}
                                        {/*</span>*/}
                                        {/*                            ) : null}*/}
                                    </TableSortLabel>
                                </TableCell>
                            ))}

                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {props.stages.map(
                            stage =>
                                <TableRow
                                    key={stage.id}
                                    hover
                                    onClick={(event) => handleClick(event, stage.id)}>
                                    <TableCell component="th" scope="row">
                                        {stage.titre}
                                    </TableCell>
                                    {
                                        stage.statut === "EN_ATTENTE"
                                            ?
                                            <TableCell className={stage.statut} align="left">EN ATTENTE</TableCell>
                                            :
                                            <TableCell className={stage.statut} align="left">{stage.statut}</TableCell>
                                    }
                                    <TableCell align="left">{stage.programme}</TableCell>
                                    <TableCell align="left">{stage.ville}</TableCell>
                                </TableRow>

                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.table,
    },
    header:{
        fontWeight: "bold",
        // backgroundColor: theme.palette.primary.dark,


    }
}));


// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }