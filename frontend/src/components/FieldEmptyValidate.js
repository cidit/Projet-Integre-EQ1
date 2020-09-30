import React, { Component } from 'react';

class FieldEmptyValidate extends Component {
    
    render() {
        const { field} = this.props;
        return (
            <div>
                <div className="badge alert-danger">{ field } obligatoire</div>
            </div>
        );
    }
}

export default FieldEmptyValidate;