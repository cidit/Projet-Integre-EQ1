import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";
import PublishIcon from '@material-ui/icons/Publish';
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component } from 'react';
import ContratService from "../../service/ContratService";
import {ListeContrat} from "../contrat/ListeContrats";


export default class TeleverserContrat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            showSnackbarValid: false,
            showSnackbarInvalid: false

        }

        this.telecharger = this.telecharger.bind(this)

        this.handleClick = this.handleClick.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    handleCloseSnackbarValid = () => this.setState({showSnackbarValid: false});
    handleShowSnackbarValid = () => this.setState({showSnackbarValid: true});

    handleCloseSnackbarInvalid = () => this.setState({showSnackbarInvalid: false});
    handleShowSnackbarInvalid = () => this.setState({showSnackbarInvalid: true});

    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['application/pdf']
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n'
            }
        }

        if (err !== '') {
            event.target.value = null
            return false;
        }
        return true;

    }
    onChangeHandler = event => {
        if (this.checkMimeType(event)) {
            this.setState({
                file: event.target.files[0]
            });

        }
    }

    handleClick(event) {
        event.preventDefault();
        const desc = window.localStorage.getItem("desc");
        console.log(desc)
        const id = this.props.match.params.id;
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('desc', desc);
        ContratService.updateContrat(id, formData);
        if (this.state.file !== undefined) {
            this.handleShowSnackbarValid()
        } else {
            this.handleShowSnackbarInvalid();
        }
    }

    telecharger(props){
        let id = parseInt(this.props.match.params.id);
        ContratService.telechargerDocument(id).then((response) => {
            sauvegarderEtMontrerDoc(response)
        });
    }


    render() {
        return (
            <form>
                <div>
                    <h3>Signature du contrat</h3>
                    <p>Veuillez télécharger le contrat, le lire attentivement, le signer et le dater, puis le téléverser</p>

                    <Button onClick={this.telecharger}>Télécharger</Button>

                    <div>
                        <input
                            id="contained-button-file"
                            type="file"
                            display="none"
                            onChange={this.onChangeHandler}
                        />
                        <label htmlFor="contained-button-file">
                            <Button onClick={this.handleClick} variant="contained" color="primary" component="span">
                                Téléverser
                            </Button>
                        </label>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PublishIcon/>
                            </IconButton>
                        </label>
                    </div>


                </div>
                <Snackbar
                    open={this.state.showSnackbarValid} autoHideDuration={6000}
                      onClose={this.handleCloseSnackbarValid}>
                    <Alert
                        onClose={this.handleCloseSnackbarValid}
                        severity="success"
                    >
                        Le contrat a été téléversé.
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.showSnackbarInvalid}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackbarInvalid}
                >
                    <Alert
                        onClose={this.handleCloseSnackbarInvalid}
                        severity="error"
                    >
                        Il n'y a pas de contrat a téléverser.
                    </Alert>
                </Snackbar>

            </form>

        )
    }
}

function sauvegarderEtMontrerDoc(response) {
    const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
