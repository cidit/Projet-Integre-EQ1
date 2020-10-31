import React, { useState, useEffect } from "react";
import { DropzoneArea } from 'material-ui-dropzone';
import { DropzoneDialog } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';
import ContratService from '../../service/ContratService'

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
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [file, setFile] = useState([]);
    const [preogres, setProgres] = useState(0);
    const [message, setMessage] = useState('');
    const [fileInfos, setFileInfos] = useState('');
    const classes = useStyles();
    const [open, setOpen] = useState(false);





    const saveContrat = async (e) => {

        setFile(e.target.files[0])

        const formData = new FormData();
        formData.append('file', e.target.files[0])
        formData.append('name', e.target.files[0].name);

        console.log("desde save contrat")
        //console.log(e.target.files[0])
      ContratService.createContratV2(idCandidature, formData);
       
       
        //console.log(response)

    };

    return (
        <div className={classes.root}>
            <input
                //accept="application/pdf"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={saveContrat}
            //ref={this.inputRef}
            //defaultValue= {this.state.file}



            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
        </Button>
            </label>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PublishIcon />
                </IconButton>
            </label>
        </div>
    )
}

export default Televerser
