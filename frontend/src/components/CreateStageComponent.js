import React, { Component } from 'react';
import ListStagesComponent from './ListStagesComponent';
import Stage from '../model/Stage'

class CreateStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = new Stage();
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default CreateStageComponent;