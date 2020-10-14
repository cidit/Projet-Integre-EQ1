import React, { Component } from "react";
import Etudiant from "../model/Etudiant";
import { simpleFetch } from "../crud/DataCRUD";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import UserService from "../service/UserService";
import EmployeurService from "../service/EmployeurService";
import EtudiantService from "../service/EtudiantService";


const formSchema = Yup.object().shape({

    email: Yup.string()
        .required('Veuillez saisir un email valide')
        .email("Courriel inavalide"),

    password: Yup.string()
        .required("Veuillez saisir un password valide")
        .min(6, "doivent comprendre au moins 6 caractères."),

    nom: Yup.string().required('Veuillez saisir un nom valide'),

    prenom: Yup.string().required('Veuillez saisir un prenom valide'),

    matricule: Yup.string().required('Veuillez saisir votre matricule'),

    programme: Yup.string().required('Veuillez saisir un programme valide'),

    telephone: Yup.string().required('Veuillez saisir un telephone valide').min(10, "doit comprendre au moins 10 caractères."),

    adresse: Yup.string().required('Veuillez saisir un adresse valide')
})


export default class EtudiantRegister extends Component {

    constructor(props) {
        super(props);
        this.state = new Etudiant()
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (

            <div className="container">
                <div className="col">
                    <div className="card p-3 m-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Nouvel Étudiant</h5>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                nom: "",
                                prenom: "",
                                matricule: "",
                                programme: "",
                                telephone: "",
                                adresse: ""
                            }}
                            validationSchema={formSchema}
                            onSubmit={(values, actions) => {
                                return new Promise(function (resolve) {
                                    setTimeout(() => {
                                        resolve(UserService.getByEmail(values.email)
                                            .then((val) => {
                                                if (val.email === values.email) {
                                                    actions.setFieldError('email', "Adresse électronique déjà utilisée")
                                                } else {
                                                    EtudiantService.post(values);
                                                    actions.resetForm();
                                                    actions.setStatus({ message: "Utilisateur crée avec succès" });
                                                    setTimeout(() => {
                                                        actions.setStatus({ message: '' });
                                                    }, 3000);

                                                    actions.setSubmitting(false);
                                                }
                                            })
                                            .then((val) => console.log(val))
                                            .catch(function (reason) {
                                                console.log(reason + " reason")
                                            }));

                                        actions.setSubmitting(false);
                                    }, 1000);

                                })
                            }}>
                            {({ status, isSubmitting, isValid, isValidating }) => (
                                <Form>
                                    <div className="container text-left justify-content-center">

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Nom</label>
                                                    <Field type="text"
                                                        name="nom"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="nom">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Prenom</label>
                                                    <Field type="text"
                                                        name="prenom"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="prenom">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Email</label>
                                                    <Field type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="example@email.com" />
                                                    <ErrorMessage name="email">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Password</label>
                                                    <Field type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="password">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Matricule</label>
                                                    <Field type="text"
                                                        name="matricule"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="matricule">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> Téléphone </label>
                                                    <Field type="text"
                                                        name="telephone"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="telephone">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label"> adresse </label>
                                                    <Field type="text"
                                                        name="adresse"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="adresse">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <label className="control-label">Programme</label>
                                                    <Field type="text"
                                                        name="programme"
                                                        className="form-control"
                                                        placeholder="" />
                                                    <ErrorMessage name="programme">{msg => <div
                                                        className="badge alert-danger">{msg}</div>}</ErrorMessage>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <div className="form-group">
                                                    <button type="submit"
                                                        className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
                                                        className="btn btn-primary"
                                                        disabled={isValidating || isSubmitting || !isValid}>Enregistrer
                                            </button>

                                                    {status && status.message &&
                                                        <div className="alert alert-success mt-3" role="alert">
                                                            {status.message}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 offset-sm-4 text-center">
                                                <span className="font-weight-light">Vous avez déjà un compte? </span>
                                                <a href="/login" className="stretched-link"
                                                >Se connecter </a>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}

                        </Formik>
                    </div>
                </div>


            </div>
        );
    }
}