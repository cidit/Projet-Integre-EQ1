import React, { Component } from 'react';
import Stage from '../model/Stage'
import StageService from '../service/StageService';
import { Formik, Field, Form, ErrorMessage, withFormik } from "formik";
import Employeur from '../model/Employeur';
import * as Yup from 'yup';

class CreateStageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = new Stage();

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }


  /* handleChange(event) {
       this.setState({ [event.target.name]: event.target.value })
   }*/
   cancel() {
       this.props.history.push('/stages');
   }
/*
   handleSubmit(values, formikBag) {
       console.log(values)

       formikBag.setSubmitting(false);
   }

   /*handleSubmit(event) {
       event.preventDefault();
       this.setState({ employeur: new Employeur() })
       StageService.createStage(this.state).then(res => {
           this.props.history.push('/stages');
       });
   }*/


  render() {
    const { handleSubmit, isSubmitting, errors, isValid } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
        <div className="container">
                        <div className="row">
                            <div className="form-group col">
                                Title :
                                <Field placeholder="Title" name="titre" className="form-control"/>
                            </div>
                            <div className="form-group col">
                                Programme :
                                <Field placeholder="Programme" name="programme" className="form-control" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col">
                                <label>Date Début de Stage :</label>
                                <Field type="date" name="dateDebut" className="form-control"/>
                            </div>
                            <div className="form-group col">
                                <label>Date Fin de Stage :</label>
                                <Field type="date" name="dateFin" className="form-control" />
                            </div>
                            <div className="form-group col">
                                <label>Date Limit de dépôt :</label>
                                <Field type="date" name="dateLimite" className="form-control" />
                            </div>

                            <div className="form-group col">
                                <label>Nombre de places :</label>
                                <Field type="number" name="nbAdmis" className="form-control" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col">
                               Description :
                                <Field component="textarea" placeholder="Description" name="description" className="form-control" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col">
                                Exigences :
                                <Field component="textarea"placeholder="Exigences" name="exigences" className="form-control" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success" >Enregistrer</button>
                        <button type="button" className="btn btn-warning" onClick={this.cancel.bind(this)}>Cancel</button>

                    </div>




<div>
<Field type="email" name="email" type="text" className="input"/>
          <ErrorMessage name="email">{msg => <div>{msg}</div>}</ErrorMessage>


</div>

<div>
<Field type="password" name="password" type="text" className="input"/>
          <ErrorMessage name="password">{msg => <div>{msg}</div>}</ErrorMessage>

</div>
          
          
         
          
        
          <button type="submit"     
                  className={`submit ${isSubmitting || !isValid ? 'disabled' : ' ' }`} 
                  className="btn btn-success"
                  disabled={isSubmitting || !isValid}>submit</button>
        </form>

      </div>

    );
  }
}

export default withFormik({
//propirte formik pour initialiser les initials values => eviter warning form controller to form incontroller 
mapPropsToValues(props){
return new Stage();
},
  //propiete de Fomik 
  validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "not empty required "
    } else if (values.password.length < 8) {
      errors.password = 'password tre court';
    }

    return errors;
  },
  handleSubmit(values, formikBag) {
    console.log(values)
    formikBag.setSubmitting(false);
  }
})(CreateStageComponent);