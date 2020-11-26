import React, { Component } from 'react';
import RegisterTabs from './register/RegisterTabs';
import EvaluationMilieuHome from './evaluations/evaluationMilieuStage/ListEvaluationMilieuStage'
import SelectionnerStagiaireComponent from './employeur/SelectionnerStagiaireComponent'
import ListEnseignants from './gestionnaire/ListEnseignants'


export default class Home extends Component {
    componentDidMount() {
        if (this.props.location.search === "?refresh") {
            this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render(){
        return(
           <div>


         {/* <RegisterTabs/>   */}
  {/* <EvaluationMilieuHome/>    */}

     {/* <SelectionnerStagiaireComponent/>  */}

   {/* <ListEnseignants/>  */}



           </div>
        );
    }
}