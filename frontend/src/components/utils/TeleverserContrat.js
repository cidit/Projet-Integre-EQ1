import React, {Component, useState} from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import { withStyles } from '@material-ui/styles';
import CVService from "../../service/CVService";
import {useRouteMatch} from "react-router-dom";
import ContratService from "../../service/ContratService";

export default class TeleverserContrat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }

        this.handleClick = this.handleClick.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }


    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['application/pdf']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n'
            }
        }
        ;
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
        var desc = window.localStorage.getItem("desc");
        console.log(desc)
        var id = this.props.match.params.id;
        const formData = new FormData();
        formData.append('file', this.state.file)
        formData.append('name', this.state.file.name)
        ContratService.createContrat(id, formData, desc);
    }


    render() {

  
        return (
            <form>
            <div>
                <p>instrictions a suivre</p>
                <p>id du contrat</p>
                <div>{this.props.match.params.id}</div>
               

                <div >
                    <input
                        //accept="application/pdf"
                      
                        id="contained-button-file"
                        type="file"
                        display = "none"
                    //onChange={function to update contrat}
                        onChange={this.onChangeHandler}
                    />
                    <label htmlFor="contained-button-file">
                        <Button onClick={this.handleClick} variant="contained" color="primary" component="span" >
                            Téléverser
                        </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" >
                            <PublishIcon />
                        </IconButton>
                    </label>
                </div>


            </div>
            </form>
        )
    }
}
