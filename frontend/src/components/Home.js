import React, { Component } from 'react';

import CreateQuestions from './evaluations/createQuestions'
import EvaluationStagiaire from '../components/evaluations/EvaluationStagiaire'
import EvaluationMilieuStage from './evaluations/evaluationMilieuStage/EvaluationMilieuStage'
import EvaluationMilieuHome from './enseignant/EvaluationMilieuHome'
import ApreciationGlobaleStagiaire from '../components/evaluations/evaluationStagiaire/ApreciationGlobaleStagiaire'
import EvaluationsHome from './employeur/evaluations/EvaluationsHome'
import SimpleTabs from './gestionnaire/RapportComponent'

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
          {/* <EvaluationStagiaire/>  */}
          {/* <CreateQuestions/> */}
          {/* <EvaluationStagiaire/> */}

          {/* <EvaluationStagiaire/> */}

          {/* <EvaluationMilieuStage/> */}

          {/* <EvaluationMilieuHome/> */}

         
         
          {/* pending */}

          {/* <ApreciationGlobaleStagiaire/> */}

       {/* <EvaluationsHome/>  */}

           {/* <SimpleTabs/>  */}



           </div>
        );
    }
}