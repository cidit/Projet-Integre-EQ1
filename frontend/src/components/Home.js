import React, { Component } from 'react';

import CreateQuestions from './evaluations/createQuestions'
import EvaluationStagiaire from '../components/evaluations/EvaluationStagiaire'

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
          {/* <CreateQuestions/> */}
          {/* <EvaluationStagiaire/> */}

          <EvaluationStagiaire/>



           </div>
        );
    }
}