import React, {useState} from 'react';
import {IconButton} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ContratService from '../../service/ContratService';
import {Redirect} from 'react-router-dom'


export default function Telecharger(props) {
    const [redirect, setRedirect] = useState(false)

    const clickHandle = () => {
        ContratService.telechargerDocument(props.path).then((response) => {
            sauvegarderEtMontrerDoc(response)
        });
        if (window.localStorage.getItem("desc") !== "Gestionnaire")
            setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={`/televerserContrats/${props.path}`}/>
    } else
        return (
            <td>
                <IconButton color="primary" component="span" onClick={clickHandle}>
                    <GetAppIcon/>
                </IconButton>
            </td>

        )
}

function sauvegarderEtMontrerDoc(response) {
    const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
}
