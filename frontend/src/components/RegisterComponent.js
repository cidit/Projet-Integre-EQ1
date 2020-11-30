import React, {Component} from 'react';
import * as FormsLibrary from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import UserService from "../service/UserService";
import EmployeurService from "../service/EmployeurService";
import EtudiantService from "../service/EtudiantService";
import * as PropTypes from "prop-types";
import {Box, Tab, Tabs} from "@material-ui/core";


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{2,4}?[ \\-]*[0-9]{2,4}?$/;



export default class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			key: 'etudiant',
		};
	}

	render() {

		return (

			<div className="container">
				<div className="container">
					<MyTabs/>
					<div className="row">

						<div className="col-sm-4 offset-sm-4 text-center">
							<span className="font-weight-light">Vous avez déjà un compte? </span>
							<a href="/login" className="stretched-link"
							>Se connecter </a>
						</div>
					</div>
				</div>
			</div>

		);
	}
}


function MyTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Tabs
				value={value}
				onChange={handleChange}
			>
				<Tab
					key={0}
					label="Etudiant"
				/>
				<Tab
					key={1}
					label="Employeur"
				/>

			</Tabs>

			<TabPanel key={0} index={0} value={value}>
				<EtudiantInscription/>
			</TabPanel>
			<TabPanel key={1} index={1} value={value}>
				<EmployeurInscription/>
			</TabPanel>
		</>
	);


}


export function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};


function EtudiantInscription() {
	const formSchema = FormsLibrary.object().shape({

		email: FormsLibrary.string()
			.required('Veuillez saisir un email valide')
			.email("Courriel inavalide"),

		password: FormsLibrary.string()
			.required("Veuillez saisir un password valide")
			.min(6, "doivent comprendre au moins 6 caractères."),

		nom: FormsLibrary.string().required('Veuillez saisir un nom valide'),

		prenom: FormsLibrary.string().required('Veuillez saisir un prenom valide'),

		matricule: FormsLibrary.string().required('Veuillez saisir votre matricule'),

		programme: FormsLibrary.string().required('Veuillez saisir un programme valide'),

		telephone: FormsLibrary.string().required('Veuillez saisir un telephone valide').min(10, "doit comprendre au moins 10 caractères."),

		adresse: FormsLibrary.string().required('Veuillez saisir un adresse valide')
	})

	return (

		<div className="container">
			<div className="col">
				<div className="card p-3 m-3">
					<h5 className="card-title text-center p-3" style={{background: '#E3F9F0 '}}>Nouvel Étudiant</h5>
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
												actions.setStatus({message: "Utilisateur crée avec succès"});
												setTimeout(() => {
													actions.setStatus({message: ''});
												}, 3000);

												actions.setSubmitting(false);
											}
										})
										.catch(function (reason) {
										}));

									actions.setSubmitting(false);
								}, 1000);

							})
						}}>
						{({status, isSubmitting, isValid, isValidating}) => (
							<Form>
								<div className="container text-left justify-content-center">

									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<label className="control-label">Nom</label>
												<Field type="text"
													   name="nom"
													   className="form-control"
													   placeholder=""
													   maxLength="255"
												/>
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
													   placeholder=""
													   maxLength="255"
												/>
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
													   placeholder="example@email.com"
													   maxLength="255"
												/>
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
													   placeholder=""
													   maxLength="255"
												/>
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
													   placeholder=""
													   maxLength="255"
												/>
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
													   placeholder=""
													   maxLength="255"
												/>
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
													   placeholder=""
													   maxLength="255"
												/>
												<ErrorMessage name="adresse">{msg => <div
													className="badge alert-danger">{msg}</div>}</ErrorMessage>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<label className="control-label">Programme</label>
												<Field as="select"
													   name="programme"
													   className="form-control"
												>
													<option value="">Choisir un programme</option>
													<option value="Gestion de commerces">Gestion de commerces
													</option>
													<option value="Soins infirmiers">Soins infirmiers</option>
													<option value="Soins infirmiers pour auxiliaires">Soins
														infirmiers pour auxiliaires
													</option>
													<option value="Techniques d’éducation à l’enfance">Techniques
														d’éducation à l’enfance
													</option>
													<option value="Techniques de bureautique">Techniques de
														bureautique
													</option>
													<option
														value="Techniques de comptabilité et de gestion">Techniques
														de comptabilité et de gestion
													</option>
													<option value="Techniques de l’informatique">Techniques de
														l’informatique
													</option>
													<option
														value="Techniques de la logistique du transport">Techniques
														de la logistique du transport
													</option>
													<option value="Technologie de l’architecture">Technologie de
														l’architecture
													</option>
													<option
														value="Technologie de l’électronique industrielle">Technologie
														de l’électronique industrielle
													</option>
													<option
														value="Technologie de l’estimation et de l’évaluation en bâtiment">Technologie
														de l’estimation et de l’évaluation en bâtiment
													</option>
													<option value="Technologie du génie civil">Technologie du génie
														civil
													</option>
													<option
														value="Techniques de la logistique du transport">Techniques
														de la logistique du transport
													</option>
													<option value="Technologie du génie physique">Technologie du
														génie physique
													</option>
												</Field>


												<ErrorMessage name="programme">{msg => <div
													className="badge alert-danger">{msg}</div>}</ErrorMessage>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<button
													type="submit"
													className={`submit ${isSubmitting || !isValid ? 'disabled' : ' '} btn btn-primary`}
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
									{/*<div className="row">*/}
									{/*	<div className="col-sm-4 offset-sm-4 text-center">*/}
									{/*		<span className="font-weight-light">Vous avez déjà un compte? </span>*/}
									{/*		<a href="/login" className="stretched-link"*/}
									{/*		>Se connecter </a>*/}
									{/*	</div>*/}
									{/*</div>*/}
								</div>
							</Form>
						)}

					</Formik>
				</div>
			</div>


		</div>
	);
}

function EmployeurInscription() {
	const formSchema = FormsLibrary.object().shape({
		nomEntreprise: FormsLibrary.string().required('Veuillez saisir un nom valide'),
		email: FormsLibrary.string()
			.required('Veuillez saisir un email valide')
			.email("Courriel invalide"),
		password: FormsLibrary.string()
			.required("Veuillez saisir un password valide")
			.min(6, "doivent comprendre au moins 6 caractères."),
		telephone: FormsLibrary.string().required('Veuillez saisir un telephone valide')
			.min(8, "doivent comprendre au moins 8 caractères.")
			.max(14, 'Numéro de téléphone invalide')
			.matches(phoneRegExp, 'Numéro de téléphone invalide'),
		adresse: FormsLibrary.string().required('Veuillez saisir un adresse valide'),

	});

	return (

		<div className="container ">
			<div className="col">
				<div className="card p-3 m-3">
					<h5 className="card-title text-center p-3" style={{background: '#E3F9F0 '}}>Nouvel
						employeur</h5>
					<Formik
						initialValues={{
							nomEntreprise: "",
							email: "",
							password: "",
							telephone: "",
							adresse: "",
							rol: "Employeur"
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
												EmployeurService.post(values);
												actions.resetForm();
												actions.setStatus({message: "Utilisateur crée avec succès"});

												setTimeout(() => {
													actions.setStatus({message: ''});
												}, 3000);

												actions.setSubmitting(false);

											}

										}));

									actions.setSubmitting(false);
								}, 1000);

							})
						}}
					>

						{({status, isSubmitting, isValid, isValidating}) => (
							<Form>
								<div className="container text-left justify-content-center">

									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<label className="control-label">Nom de l'entreprise</label>
												<Field type="text"
													   name="nomEntreprise"
													   className="form-control"
													   maxLength="255"
												/>
												<ErrorMessage name="nomEntreprise">{msg => <div
													className="badge alert-danger">{msg}</div>}</ErrorMessage>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<label className="control-label"> Email </label>
												<Field type="email"
													   name="email"
													   className="form-control"
													   placeholder="example@email.com"
													   maxLength="255"
												/>
												<ErrorMessage name="email">{msg => <div
													className="badge alert-danger"> {msg}</div>}</ErrorMessage>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<label className="control-label"> Password </label>
												<Field type="password"
													   name="password"
													   className="form-control"
													   maxLength="255"
												/>
												<ErrorMessage name="password">{msg => <div
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
													   maxLength="255"
												/>
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
													   maxLength="255"
												/>
												<ErrorMessage name="adresse">{msg => <div
													className="badge alert-danger">{msg}</div>}</ErrorMessage>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-4 offset-sm-4 text-center">
											<div className="form-group">
												<button type="submit"
														className={`btn btn-primary submit ${isSubmitting || !isValid ? 'disabled' : ' '}`}
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

									{/*<div className="row">*/}

									{/*	<div className="col-sm-4 offset-sm-4 text-center">*/}
									{/*		<span className="font-weight-light">Vous avez déjà un compte? </span>*/}
									{/*		<a href="/login" className="stretched-link"*/}
									{/*		>Se connecter </a>*/}
									{/*	</div>*/}
									{/*</div>*/}
								</div>
							</Form>
						)}
					</Formik>

				</div>
			</div>
		</div>
	);

}

