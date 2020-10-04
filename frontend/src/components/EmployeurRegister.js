import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import Employeur from "../model/Employeur";
import EmployeurService from "../service/EmployeurService";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, withFormik } from "formik";
import * as Yup from 'yup';

let redirectStr = "";
export default class EmployeurRegister extends Component {
    constructor(props) {
        super(props);
        this.state = new Employeur();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
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
    }

    render() {
         const formSchema = Yup.object().shape({
            nomEntreprise: Yup.string().required('Not empty'),
            email: Yup.string().required('Not empty'),
            password: Yup.string().required('Not empty'),
            telephone: Yup.string().required('Not empty'),
            adresse: Yup.string().required('Not empty'),

         });
        if (redirectStr == "HOME") {
            return <Redirect to={"/"} />
        } else {
            return (

                <div className="card p-3">

                    <Formik
                        initialValues={{
                            nomEntreprise: "",
                            email: "",
                            password: "",
                            telephone: "",
                            adresse: "",

                        }}
                        validationSchema={formSchema}

                        onSubmit={values => {
                            // same shape as initial values
                            console.log(values);
                        }}

                    >


                    </Formik>


                    <h5 className="breadcrumb ">Enregistrement Employeur</h5>

                    <Form >
                        <div className="container">
                            <div className="row">
                                <div className="form-group col">
                                    <label className="control-label">Nom </label>
                                    <Field type="text" name="nom" className="form-control" required value={this.state.nom} onChange={this.handleChange} />
                                </div>
                            </div>
                            <label>
                                Email:
                            <Field type="email" name="email" required value={this.state.email} onChange={this.handleChange} />
                            </label>
                            <label>
                                Telephone:
                            <Field type="tel" name="telephone" required value={this.state.telephone} onChange={this.handleChange} />
                            </label>
                            <label>
                                Addresse:
                            <Field type="text" name="adresse" required value={this.state.adresse} onChange={this.handleChange} />
                            </label>
                            <label>
                                Mot de passe:
                            <Field type="password" name="password" required value={this.state.password} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Register" />

                        </div>

                    </Form>

                </div>
            );
        }
    }
}