import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import Employeur from "../model/Employeur";
import EmployeurService from "../service/EmployeurService";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, withFormik } from "formik";
import * as Yup from 'yup';

let redirectStr = "";

const formSchema = Yup.object().shape({
    nomEntreprise: Yup.string().required('Not empty'),
    email: Yup.string()
        .required('Not empty')
        .email("Courriel inavalide"),
    password: Yup.string()
        .required("Not empty")
        .min(5, "MInimun 5 caraters"),
    telephone: Yup.string().required('Not empty').min(8, "minimo 8 caracteres"),
    adresse: Yup.string().required('Not empty'),

});

export default class EmployeurRegister extends Component {
    constructor(props) {
        super(props);
        this.state = new Employeur();

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* handleChange(event) {
         this.setState({ [event.target.name]: event.target.value });
         console.log(redirectStr);
     }
 
     async handleSubmit(event) {
         event.preventDefault();
         let x = "email";
         let data = await EmployeurService.getByEmail(this.state[x]);
         if (data[x] != this.state[x]) {
             await EmployeurService.post(this.state);
             redirectStr = "HOME";
             this.forceUpdate();
         } else {
             alert("Ce email est deja utilise");
         }
     }*/

    render() {


        const { handleSubmit, isSubmitting, isValid, isValidating } = this.props;
        if (redirectStr == "HOME") {
            return <Redirect to={"/"} />
        } else {
            return (
                <div className="container">
                    <div className="card-body" >
                        <h5 className="card-title text-center">Enregistrer nouveau employeur</h5>
                        <Formik
                            initialValues={{
                                nomEntreprise: "",
                                email: "",
                                password: "",
                                telephone: "",
                                adresse: "",
                            }}
                            validationSchema={formSchema}

                            onSubmit={({ setSubmitting }) => {
                                alert("Form is validated! Submitting the form...");
                                setSubmitting(false);
                            }}
                        >

                            {({ touched, errors, isSubmitting }) => (
                                <Form>

                                    <div className="row">
                                        <div className="form-label-group">
                                            <label className="control-label">Nom </label>
                                            <Field type="text" name="nomEntreprise" className="form-control" />
                                            <ErrorMessage name="nomEntreprise">{msg => <div>{msg}</div>}</ErrorMessage >
                                        </div>
                                    </div>
                                    <label>
                                        Email:
                            <Field type="email" name="email" />
                                        <ErrorMessage name="email">{msg => <div>{msg}</div>}</ErrorMessage >
                                    </label>
                                    <label>
                                        Telephone:
                            <Field type="tel" name="telephone" />
                                        <ErrorMessage name="telephone">{msg => <div>{msg}</div>}</ErrorMessage >
                                    </label>
                                    <label>
                                        Addresse:
                            <Field type="text" name="adresse" />
                                        <ErrorMessage name="adresse">{msg => <div>{msg}</div>}</ErrorMessage >
                                    </label>
                                    <label>
                                        Mot de passe:
                            <Field type="password" name="password" />
                                        <ErrorMessage name="password">{msg => <div>{msg}</div>}</ErrorMessage >
                                    </label>
                                    <input type="submit" value="Register" />





                                </Form>
                            )}
                        </Formik>







                    </div>
                </div>
            );
        }
    }
}