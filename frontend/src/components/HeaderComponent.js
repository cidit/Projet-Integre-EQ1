import React, { Component } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CandidatureService from "../service/CandidatureService";
import SessionService from "../service/SessionService";

function NotLoggedInNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
    );
}

function GestionnaireNav(props) {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profileGestionnaire">Votre profil</Nav.Link>
            <Nav.Link href="/etudiants">Approbation de CV</Nav.Link>
            <Nav.Link href="/listestages">Liste des stages</Nav.Link>
            <Nav.Link href="/contratsGestionnaire">Gérer contrats</Nav.Link>
            <Nav.Link href="/listCandidatureChoisi">Contrats à générer</Nav.Link>
            <Nav.Link href="/stages">Choix stagiaires</Nav.Link>

            <Nav.Link href="/rapport">Rapports</Nav.Link>
             <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    );
}


function EmployeurNav(props) {

    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profileEmployeur">Votre profil</Nav.Link>
            <Nav.Link href="/createStage">Créer un stage</Nav.Link>
            {/*<Nav.Link href="/stages">Voir toutes les offres de stage</Nav.Link>*/}
            <Nav.Link href="/listestages">Voir toutes les offres de stage</Nav.Link>
            <Nav.Link href="/contratsEmployeur">Contrats</Nav.Link>
            <Nav.Link href="/evaluationsEmployeur">Évaluations</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    );
}


function EtudiantNav(props) {

    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profileEtudiant">Votre profil</Nav.Link>
            <Nav.Link href="/offrestage">Offres de stage</Nav.Link>
            <Nav.Link href="/listecandidatures">Vos candidatures</Nav.Link>
            <Nav.Link href="/contratEtudiant">Contrats</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
    );
}
function ChangeSessionNavDropdown(props) {
    var nomSession = window.localStorage.getItem("nomSession");
    return (
        <NavDropdown title={nomSession} id="nav-dropdown">
            {props.sessions.map(
                data =>
                    <NavDropdown.Item key={data.id} eventKey="4.1" onClick={() => changeSession(data.id, data.nom)}>{data.nom}</NavDropdown.Item>
            )}
        </NavDropdown>
    );
}

async function changeSession(id, nom) {
    await SessionService.changeSession(id, nom);
    setTimeout(function() {
        window.location.reload();
    }, 200);
}

function NavType(props) {
    if (props.desc.toUpperCase() === "ETUDIANT")
        return <EtudiantNav sessions={props.sessions}/>
    else if (props.desc.toUpperCase() === "EMPLOYEUR")
        return <EmployeurNav sessions={props.sessions}/>
    else if (props.desc.toUpperCase() === "GESTIONNAIRE")
        return <GestionnaireNav sessions={props.sessions}/>
    else
        return <NotLoggedInNav />
}

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {desc: localStorage.getItem("desc") === null ? "" : localStorage.getItem("desc"), sessions: []}
    }

    async componentDidMount() {
        const { data: sessions } = await SessionService.getAllSessions();
        this.setState({ sessions });
    }

    render() {
        return (

            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">
                    Projet intégré équipe 1
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavType desc={this.state.desc} sessions={this.state.sessions}/>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default HeaderComponent;