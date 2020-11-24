import React, { Component } from 'react';
import RegisterTabs from './register/RegisterTabs';
import EvaluationMilieuHome from './evaluations/evaluationMilieuStage/ListEvaluationMilieuStage'


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


           {/* <RegisterTabs/> */}
           <EvaluationMilieuHome/>



           </div>
        );
    }
}