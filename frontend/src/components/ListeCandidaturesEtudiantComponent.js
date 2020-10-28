import React, { Component } from 'react';
import CandidatureService from "../service/CandidatureService";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Demo from './demo';

export default class ListeCandidaturesEtudiantComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidatures: [],
            employeurId: "",
            idCandidature: "",
            selected: false,
            disabledButtons: [],
            disableSubmit: true,
        };
        AlertDialog = AlertDialog.bind(this);
    }

    async componentDidMount() {
        var id;
        if (localStorage.getItem("desc") === "Etudiant")
            id = localStorage.getItem("id");
        const { data: candidatures } = await CandidatureService.getByEtudiant(id);
        this.setState({ candidatures });
        this.setState({ disabledButtons: new Array(this.state.candidatures.length).fill(false)});
    }

    select(index) {

        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = true;
            return {
                disabledButtons: newDisabledButtons,
            }
        });
        this.setState({ selected: true });
        this.setState({ disableSubmit: false });
        this.setState({ idCandidature: index });
    }

    deselect(index) {
        
        this.setState(oldState => {
            const newDisabledButtons = [...oldState.disabledButtons];
            newDisabledButtons[index] = false;
            return {
                disabledButtons: newDisabledButtons,
            }
        });
        this.setState({ selected: false });
        this.setState({ disableSubmit: true });
        this.setState({ idCandidature: "" });
    }

    submit(){
        if (this.state.idCandidature === "") {
            this.setState({ disableSubmit: true });
        }
        else{
            this.setState({ disableSubmit: false });
            //CandidatureService.putCandidatureChoisi(this.state.idCandidature);
            if (window.confirm("Assurez-vous d'avoir bien sélectionné votre stage afin de pouvoir générer le contrat d'ici aux prochains jours!")) {
                console.log("BOP!");
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Vos candidatures</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr >
                                    <th> Titre </th>
                                    <th> Programme </th>
                                    <th> Description </th>
                                    <th> Date de début </th>
                                    <th> Date de fin </th>
                                    <th> Ville </th>
                                    <th> Nombre d'heures par semaine </th>
                                    <th> Statut</th>
                                    <th> Confirmer choix </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.candidatures.map(
                                    candidature =>
                                        <tr key={candidature.id}>
                                            <td>{candidature.stage.titre}</td>
                                            <td>{candidature.stage.programme}</td>
                                            <td>{candidature.stage.description}</td>
                                            <td>{candidature.stage.dateDebut}</td>
                                            <td>{candidature.stage.dateFin}</td>
                                            <td>{candidature.stage.ville}</td>
                                            <td>{candidature.stage.nbHeuresParSemaine}</td>
                                            <td>{candidature.statut}</td>
                                            <td> 
                                                <button className="btn btn-primary" onClick={() => this.select(candidature.id)}
                                                    disabled={candidature.statut !== "APPROUVE" || this.state.selected}
                                                    hidden={this.state.disabledButtons[candidature.id]}> 
                                                    Confirmer
                                                </button>
                                                <button className="btn btn-danger" onClick={() => this.deselect(candidature.id)}
                                                    disabled={candidature.statut !== "APPROUVE"}
                                                    hidden={!this.state.disabledButtons[candidature.id]}> 
                                                    Annuler
                                                </button>
                                            </td>
                                        </tr>
                                )}
                                </tbody>
                            </table>

                            
                            <button className="btn btn-primary" onClick={() => this.submit()}
                                disabled={this.state.disableSubmit}>
                                Confirmer
                            </button>
                            
                            <Demo/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function AlertDialog() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Confirmer
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmer votre stage?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Assurez-vous d'avoir bien sélectionné votre stage afin de pouvoir générer le contrat d'ici aux prochains jours!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
