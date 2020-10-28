import React from 'react';
import { ArrowDownwardIcon, } from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import ContratService from '../../service/ContratService';


export default function Telecharger(props) {

    const clickHandle = () => {
       ContratService.getDocumentContrat(props.path).then((response) => {
            sauvegarderEtMontrerDoc(response)
        });
    }

    return (
     <td>
            <IconButton color="primary" component="span" onClick={clickHandle}>
                <GetAppIcon />
           </IconButton>
    </td>
       
    )
}

function sauvegarderEtMontrerDoc(response) {
    const url = window.URL.createObjectURL(new Blob([response.data],{ type:'application/octet-stream' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
}
