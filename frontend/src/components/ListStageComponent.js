import React, { Component } from 'react';
import StageService from '../service/StageService';


export default class ListStagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { stage: [], };

        this.addStage = this.addStage.bind(this);
    }

    addStage(){
        this.props.history.push('/createStage')
    }

    componentDidMount() {
        StageService.getStages().then((res) => { this.setState({ stage: res.data }) })
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Stage list</h2>
                <div className= "row">
                    <button type="button" className="btn btn-success" onClick={this.addStage}>Create Stage</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Titre </th>
                                <th> Description </th>
                                <th> dateDebut </th>
                                <th> dateFin </th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stage.map(
                                stage =>
                                    <tr key={stage.id}>
                                        <td>{stage.id}</td>
                                        <td>{stage.titre}</td>
                                        <td>{stage.description}</td>
                                        <td>{stage.dateDebut}</td>
                                        <td>{stage.dateFin}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

