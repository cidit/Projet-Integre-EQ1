import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import { withStyles } from '@material-ui/styles';




export default class TeleverserContrat extends Component {
    constructor(props) {
        super(props);
    }


    render() {

  
        return (
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
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Téléverser
                         </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PublishIcon />
                        </IconButton>
                    </label>
                </div>


            </div>
        )
    }
}
