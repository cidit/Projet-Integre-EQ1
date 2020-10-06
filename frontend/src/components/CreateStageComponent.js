import React, { Component } from 'react';
import Stage from '../model/Stage'
import StageService from '../service/StageService';
import { Field, Form, ErrorMessage, withFormik } from "formik";
import Employeur from '../model/Employeur';
import '../css/Forms.css';
import ValidationChamp from './ValidationChampVide'
import ValidationDate from './ValidationDate'

const isRequired = (message) => (value) => (!!value ? undefined : message);

class CreateStageComponent extends Component {
  constructor(props) {
    super(props);
    this.state ={sended : false}
   
  }

  feedBack() {

    this.setState({ sended: true });
  }

  cancel() {
    this.state.history.push('/stages');
  }
  render() {
    const { handleSubmit, isSubmitting, isValid, isValidating, status } = this.props;

    return (
      <div className="card p-3">
        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0' }}>Nouvel stage</h5>
        <Form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="form-group col">
                <label className="control-label">Titre</label>
                <Field placeholder="Titre" name="titre" className="form-control" validate={isRequired(<ValidationChamp field={"un Titre "} />)} />
                <ErrorMessage name="titre">{msg => <div>{msg}</div>}</ErrorMessage >
              </div>

              <div className=" form-group col" >
                <label className="control-label">Programme</label>
                <Field placeholder="Programme" name="programme" className="form-control" validate={isRequired(<ValidationChamp field={" un Programme "} />)} />
                <ErrorMessage name="programme">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>

              <div className=" form-group col" >
                <label className="control-label">Ville</label>
                <Field placeholder="Ville" name="ville" className="form-control" validate={isRequired(<ValidationChamp field={" une ville "} />)} />
                <ErrorMessage name="ville">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            {/* Dates */}
            <div className="row">
              <div className="form-group col">
                <label className="control-label">Date Début de Stage</label>
                <Field type="date" name="dateDebut" className="form-control" validate={isRequired(<ValidationChamp field={"une Date "} />)} />
                <ErrorMessage name="dateDebut">{msg => <ValidationDate field={msg} />}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label">Date finale de Stage</label>
                <Field type="date" name="dateFin" className="form-control" validate={isRequired(<ValidationChamp field={"une Date "} />)} />
                <ErrorMessage name="dateFin">{msg => <ValidationDate field={msg} />}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label" >Date limite pour appliquer</label>
                <Field type="date" name="dateLimiteCandidature" className="form-control" validate={isRequired(<ValidationChamp field={"une Date "} />)} />
                <ErrorMessage name="dateLimiteCandidature">{msg => <ValidationDate field={msg} />}</ErrorMessage>
              </div>


            </div>

            <div className="row">
              <div className="form-group col">
                <label className="control-label">Nombre de places</label>
                <Field type="number" name="nbAdmis" className="form-control" validate={isRequired(<ValidationChamp field={"un Nombre de places "} />)} min="0" />
                <ErrorMessage name="nbAdmis">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label className="control-label">Heures par semaine</label>
                <Field type="number" name="nbHeuresParSemaine" className="form-control" validate={isRequired(<ValidationChamp field={" un Nombre d'heures par semaine"} min="0" />)} />
                <ErrorMessage name="nbHeuresParSemaine">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
              <div className="form-group col">
                <label>Salaire</label>
                <Field type="number" name="salaire" className="form-control" min="0" />
              </div>

            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className="control-label">Description</label>
                <Field component="textarea" placeholder="Description" name="description" className="form-control" validate={isRequired(<ValidationChamp field={" une Description"} />)} />
                <ErrorMessage name="description">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label className="control-label">Exigences</label>
                <Field component="textarea" placeholder="Exigences" name="exigences" className="form-control" validate={isRequired(<ValidationChamp field={"un exigence"} />)} />
                <ErrorMessage name="exigences">{msg => <div>{msg}</div>}</ErrorMessage>
              </div>
            </div>

            
              <div className="form-group">

                <button type="submit"
                  className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '} btn btn-primary` }
                  disabled={isValidating || isSubmitting || !isValid} onClick={this.feedBack.bind(this)}>Enregistrer</button>

                {status && status.message &&
                  <div className="alert alert-success mt-3" role="alert">
                    {status.message}
                  </div>
                }

                {this.state.sended && isValid &&
                  <div className="alert alert-success mt-3" role="alert">
                    <a className="stretched-link" onClick={this.cancel.bind(this)}> Voir mes offres de Stage</a>
                  </div>
                }

              </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues(props) {
    
    return new Stage;
    
  },

  validate(values) {
    var today = new Date();
    var startDate = new Date(values.dateDebut);
    var finalDate = new Date(values.dateFin);
    var limitApplicationDate = new Date(values.dateLimiteCandidature);
    const errors = {}

    if (startDate < today) {
      errors.dateDebut = 'la Date de début ne doit être inférieure ou égale à la date d\'aujourd\'hui'
    }

    if (finalDate <= startDate) {
      errors.dateFin = 'La date finale ne doit pas être inférieure à la date initiale. '
    }

    if (limitApplicationDate < startDate || limitApplicationDate > finalDate) {
      errors.dateLimiteCandidature = 'la date est inférieure à la date de début ou supérieur à la date finale'
    }

    if (!values) {
      console.log(this.state)
    }

    return errors;
  },

  handleSubmit(values, formikBag) {

    StageService.createStage(values).then(res => {

      formikBag.setStatus({ message: "Stage crée avec succès" });

      setTimeout(() => {
        formikBag.setStatus({ message: '' });
      }, 3000);
    });
    formikBag.resetForm()
    formikBag.setSubmitting(false);
  }

})(CreateStageComponent);