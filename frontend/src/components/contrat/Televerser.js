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
import { Alert } from '@material-ui/lab';

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
    const [fileInfos, setFileInfos] = useState('');
    const classes = useStyles();

    const { params } = useRouteMatch();
    const [displayInvalidFileMessage, setDisplayInvalidFileMessage] = useState(false)





    const saveContrat = async (e) => {

        setFile(e.target.files[0])
        let files = e.target.files;

        const types = ['application/pdf']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                setDisplayInvalidFileMessage(true);
                console.log(files.type)
                return;
            } else {
                setDisplayInvalidFileMessage(false);
                setFile(files[0])
            }
        }

        if (file) {
            var desc = window.localStorage.getItem("desc");
            const formData = new FormData();
            formData.append('file', e.target.files[0])
            formData.append('name', e.target.files[0].name);
            ContratService.createContrat(params.id, formData, desc).then((res) => setMessageResponse(res.data));

        }

    };

    return (
        <div>
            <div className={classes.root}>
                <input
                    //accept="application/pdf"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={saveContrat}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Téléverser
        </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PublishIcon />
                    </IconButton>
                </label>




            </div>
            {displayInvalidFileMessage &&
                AlertFormatInvalide("Seuls les fichiers en format pdf sont acceptés", "warning")
            }
            {messageResponse &&
            AlertFormatInvalide( messageResponse,"warning")
            }

        </div>

    )
}

export default Televerser;

function AlertFormatInvalide(message, type) {

    return <div className="container">
        <div className="row justify-content-md-center">
            <div className="col">
                <Alert severity={type} variant="filled" className="m-3 text-center">{message}</Alert>
            </div>
        </div>
    </div>;
}
