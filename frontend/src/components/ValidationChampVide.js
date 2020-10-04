import React, { Component } from 'react';

class ValidationChamp extends Component {
    
    render() {
        const { field} = this.props;
        return (
            <div>
                <div className="badge alert-danger">Veuillez saissir { field } valide</div>
            </div>
        );
    }
}

export default ValidationChamp;