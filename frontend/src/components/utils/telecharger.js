import React from 'react';
import { ArrowDownwardIcon, } from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ContratService from '../../service/ContratService';
import axios from "axios";
import { string } from 'yup';

export default function Telecharger(props) {

    const clickHandle = () => {
       ContratService.getDocumentContrat(props.path).then((response) => {
            sauvegarderEtMontrerDoc(response)
        });
    }

    return (
        <label htmlFor="icon-button-file">
            <IconButton color="primary" component="span" onClick={clickHandle}>
                <GetAppIcon />
            </IconButton>
        </label>
    )
}

function sauvegarderEtMontrerDoc(response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
}
