import React, { Component } from 'react';
import Stage from "../model/Stage"


class ListStagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {stage:[],};
    }
    
    render() {
        return (
            <div>
                <h2 className= "text-center">Stage list</h2>
                <div className= "row">
                    <table className= "table table-striped table-bordered">
                       <thead>
                           <tr>
                               <th> Titre </th>
                               <th> Description </th>
                               <th> exigences </th>
                               <th> dateDebut </th>
                              <th> dateFin </th> */
                             
                            

                               <tbody>
                                   {this.state.stage.map(
                                       stage => 
                                       <tr key = {stage.id}>
                                           <td>{stage.description}</td>
                                           <td>{stage.exigences}</td>
                                           <td>{stage.dateDebut}</td>
                                           <td>{stage.dateFin}</td>
                                    
                                       </tr>
                                   )}
                               </tbody>
                           </tr>
                       </thead>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListStagesComponent;