import React, { Component } from 'react';
import Stage from '../model/Stage'
import StageService from '../service/StageService';
import { Formik, Field, Form, ErrorMessage, withFormik } from "formik";
import Employeur from '../model/Employeur';
import * as Yup from 'yup';
import '../css/Forms.css';
import FieldEmptyValidate from './FieldEmptyValidate'


const isRequired = (message) => (value) => (!!value ? undefined : message);

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
    const { handleSubmit, isSubmitting, errors, isValid, values } = this.props;

    return (
      <div className="card p-3">
        <h5 className="breadcrumb ">Nouvelle offre de stage</h5>
        <Form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="form-group col">
                <label className="control-label">Titre</label>
                <Field placeholder="Titre" name="titre" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Titre est"} />)} />
                <ErrorMessage name="titre">{msg => <div>{msg}</div>}</ErrorMessage >
              </div>

              <div className="form-group col">
                <label className="control-label">Programme</label>
                <Field placeholder="Programme" name="programme" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Programme est"} />)} />

                <ErrorMessage name="programme">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label className="control-label">Date Début de Stage</label>
                <Field type="date" name="dateDebut" className="form-control" className="form-control" />
                <ErrorMessage name="dateDebut">{msg => <FieldEmptyValidate field={msg} />}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label">Date finale de Stage</label>
                <Field type="date" name="dateFinale" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Date finale est"} />)} />
                <ErrorMessage name="dateFinale">{msg => <FieldEmptyValidate field={msg} />}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label" >Date limite pour appliquer</label>
                <Field type="date" name="dateLimite" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Date Limite est"} />)} />
                <ErrorMessage name="dateLimite">{msg => <FieldEmptyValidate field={msg} />}</ErrorMessage>
              </div>


            </div>

            <div className="row">
              <div className="form-group col">
                <label className="control-label">Nombre de places</label>
                <Field type="number" name="nbAdmis" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Nombre de places est"} />)} min="0" />
                <ErrorMessage name="nbAdmis">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label>Heures par semaine</label>
                <Field type="number" name="nbHeuresParSemaine" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Nombre d'heures par semaine est "} />)} />
                <ErrorMessage name="nbHeuresParSemaine">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label>Salaire</label>
                <Field type="number" name="salaire" className="form-control" />
              </div>

            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className="control-label">Description</label>
                <Field component="textarea" placeholder="Description" name="description" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Description"} />)} />
                <ErrorMessage name="description">{msg => <FieldEmptyValidate field={msg} />}</ErrorMessage>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className="control-label">Exigences</label>
                <Field component="textarea" placeholder="Exigences" name="exigences" className="form-control" validate={isRequired(<FieldEmptyValidate field={"Exigences"} />)} />
                <ErrorMessage name="exigences">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            <button type="submit"
              className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
              className="btn btn-outline-primary"
              disabled={isSubmitting || !isValid}>Enregistrer</button>
            <button type="button" className="btn btn-warning" onClick={this.cancel.bind(this)}>Cancel</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withFormik({
  //propirte formik pour initialiser les initials values => eviter warning form controller to form incontroller 
  mapPropsToValues(props) {
    return new Stage();
  },


  //propiete de Fomik 
  validate(values) {
    var today = new Date();
    var startDate = new Date(values.dateDebut);
    var finalDate = new Date(values.dateFinale);
    var limitApplicationDate = new Date(values.dateLimite);
    const errors = {}

    if (startDate < today) {
      errors.dateDebut = 'date invalide'
    }

    if (finalDate <= startDate) {
      errors.dateFinale = 'La date finale ne doit pas être inférieure à la date initiale. '
    }

    if (limitApplicationDate < startDate || limitApplicationDate > finalDate) {
      errors.dateLimite = 'Date Invalide'
    }

    return errors;

  },

  handleSubmit(values, formikBag) {
    console.log(values)
    formikBag.setSubmitting(false);
  }
})(CreateStageComponent);