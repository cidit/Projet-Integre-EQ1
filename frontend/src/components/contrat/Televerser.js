import React, { useState, useEffect } from "react";
import { DropzoneArea } from 'material-ui-dropzone';
import { DropzoneDialog } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';
import ContratService from '../../service/ContratService'
import { useRouteMatch } from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function Televerser(idCandidature) {
    const [file, setFile] = useState([]);
    const [preogres, setProgres] = useState(0);
    const [messageResponse, setMessageResponse] = useState('');
    const [isButtonDisable, setIsButtonDisable] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const classes = useStyles();

    const { params } = useRouteMatch();
    const [displayInvalidFileMessage, setDisplayInvalidFileMessage] = useState(false)





    const saveContrat = async (e) => {
            console.log(file)
            var response = await ContratService.createContrat(params.id, file);
            setMessageResponse(response.data);
            setIsButtonDisable(true)
            console.log(response.data.status)
            setIsSubmit(true)
    }

    const selectFile = (e) => {
        let files = e.target.files;
        const types = "application/pdf"
        for (var x = 0; x < files.length; x++) {
            if (files[x].type !== types) {
                setDisplayInvalidFileMessage(true);
                setIsButtonDisable(false);
                setFile("")
            } else {
                setDisplayInvalidFileMessage(false);
                setFile(files[0])
                setIsButtonDisable(true);
            }
        }

    };


    const deleteFile = () => {
        setFile([]);
        setIsButtonDisable(false);
    }


    useEffect(() => {
        return () => {
            setFile([]);
            setIsSubmit(false);
            setDisplayInvalidFileMessage(false);
            setIsButtonDisable(false);

        }
    }, [])

    console.log("set file")
    console.log(file.name)

    return (
        <div>
            <div className={classes.root}>
                <input
                    //accept="application/pdf"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={selectFile}
                    disabled={isButtonDisable}
                />

                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" disabled={isButtonDisable}>
                        Selectionner un fichier
                            </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" disabled={isButtonDisable} />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" disabled={isButtonDisable}>
                        <PublishIcon />
                    </IconButton>
                </label>

                {file.name &&
                <>
                    <div className="row">
                        <div className="col">
                            <Alert severity="success" variant="filled"> {file.name}</Alert>
                        </div>
                        <div className="col">
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={deleteFile}>
                                <HighlightOffIcon style={{ color: "red" }} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-md-auto">
                        <Button variant="contained" color="primary" component="span" className="mt-4"
                        onClick={saveContrat}
                        disabled={isSubmit}
                        >
                        Confirmer et envoyer au employeur
                            </Button>
                        </div>
                    </div>
                   </>
                }


            </div>
            {displayInvalidFileMessage &&
                AlertFormatInvalide("Seuls les fichiers en format pdf sont acceptés", "warning")
            }
            {messageResponse &&
                AlertFormatInvalide(messageResponse, "info")
            }

        </div>

    )
}

export default Televerser;

function AlertFormatInvalide(message, type) {

    return <div className="container-fluid">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity={type} variant="filled" className="text-center">{message}</Alert>
            </div>
        </div>
    </div>;
}
