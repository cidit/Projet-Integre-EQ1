import React, { Component } from 'react';
import EvaluationStagiaire from './evaluations/EvaluationStagiaire'
import CreateQuestions from './evaluations/createQuestions'

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
          {/* <EvaluationStagiaire/> */}
          <CreateQuestions/>



           </div>
        );
    }
}