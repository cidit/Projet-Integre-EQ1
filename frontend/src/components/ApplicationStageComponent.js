import React, { Component } from 'react';
import StageService from '../service/StageService';


export default class ApplicationStageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
            employeurId: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.addStage = this.addStage.bind(this);
    }

    addStage() {

        this.props.history.push('/createStage')
    }


    componentDidMount() {
        /*
        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");
        */
        StageService.getAllStages().then((res) => { this.setState({ stage: res.data }) })
    }
    handleSubmit(event) {
        event.preventDefault()
        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");

        this.setState({hasUploadedCV: true});
    }
    render() {
        return (

            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Offres de stage</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr >
                                    <th> Titre </th>
                                    <th> Programme </th>
                                    <th> Description </th>
                                    <th> Date de début </th>
                                    <th> Date finale </th>
                                    <th> Ville </th>
                                    <th> Nombre d'heures par semaine </th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.stage.map(
                                    stage =>
                                        <tr key={stage.id}>
                                            <td>{stage.titre}</td>
                                            <td>{stage.programme}</td>
                                            <td>{stage.description}</td>
                                            <td>{stage.dateDebut}</td>
                                            <td>{stage.dateFin}</td>
                                            <td>{stage.ville}</td>
                                            <td>{stage.nbHeuresParSemaine}</td>
                                            <td><button type="submit" className="btn btn-primary" value={stage.id}>Postuler</button></td>
                                        </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

