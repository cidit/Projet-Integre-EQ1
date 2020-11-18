import React, {Component} from "react";
import CandidatureService from "../../service/CandidatureService";
import CVService from "../../service/CVService";
import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import {makeStyles} from "@material-ui/core/styles";


export default class SelectionnerStagiaireComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {candidatures: []};
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        // const { data: candidatures } = await CandidatureService.getByStage(this.props.match.params.id);
        const {data: candidatures} = await CandidatureService.getByStage(this.props.id);
        this.setState({candidatures});
        // console.log(this.state.candidatures)
    }

    handleClick(candidature) {
        CandidatureService.putCandidatureApprouve(candidature.id);
        this.setState({});
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }


    render() {

        return (
            <div>
                <h5 className="card-title text-center">Liste des candidats</h5>
                <CustomTable
                    candidatures={this.state.candidatures}
                    alreadySelect={this.state.candidatures.filter(c => c.statut.includes("APPROUVE")).map((c) => c.id)}
                />

            </div>
        );
    }


}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        color: "#000000"
    },
    table: {
        color: "#ffffff",
        // backgroundColor: "#000000"
    }
}));

function CustomTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);


    // const [selected, setSelected] = React.useState(props.candidatures.filter(c => c.statut.includes("APPROUVE")).map((c) => c.id));
    const isSelected = (id) => selected.indexOf(id) !== -1;


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.candidatures.map((c) => c.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClickSelect = (event, candidature) => {
        const selectedIndex = selected.indexOf(candidature);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, candidature);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    function handleConfirmation(event) {
        event.preventDefault();
        if (selected.length === 0) {
            return;
        }
        for (let i = 0; i < selected.length; i++) {
            CandidatureService.putCandidatureApprouve(selected[i]);

        }
        setTimeout(function () {
            window.location.reload();
        }, 500);
    }

    function downloadCV(etudiant) {
        CVService.getCVByEtudiant(etudiant).then((response) => {
            console.log(etudiant)
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "CV_" + etudiant.prenom + "_" + etudiant.nom + ".pdf");
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={props.candidatures.length > 0 && selected.length === props.candidatures.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Programme</TableCell>
                            <TableCell>CV</TableCell>
                            <TableCell>Téléphone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Adresse</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {props.candidatures
                            .map(
                                candidature => {

                                    const isItemSelected = isSelected(candidature.id);
                                    return (

                                        <TableRow
                                            key={candidature.id}
                                            hover
                                            onClick={(event) => handleClickSelect(event, candidature.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                            <TableCell>{candidature.etudiant.prenom}</TableCell>
                                            <TableCell>{candidature.etudiant.nom}</TableCell>
                                            <TableCell>{candidature.etudiant.programme}</TableCell>
                                            <TableCell>
                                                <button onClick={() => downloadCV(candidature.etudiant)}
                                                        className="btn "><GetAppIcon/></button>
                                            </TableCell>
                                            <TableCell>{candidature.etudiant.telephone}</TableCell>
                                            <TableCell>{candidature.etudiant.email}</TableCell>
                                            <TableCell>{candidature.etudiant.adresse}</TableCell>
                                        </TableRow>

                                    );
                                }
                            )}
                    </TableBody>

                </Table>
            </TableContainer>
            <button onClick={handleConfirmation}>Confirmer</button>

        </>
    );

}
