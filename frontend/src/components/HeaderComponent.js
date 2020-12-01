import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CandidatureService from "../service/CandidatureService";
import SessionService from "../service/SessionService";
import LoginService from "../service/LoginService";

function Logout(){
    function handleSelect(){
        LoginService.logout();
    }
    return (
        <Nav.Link href="/?refresh" onSelect={handleSelect}>Logout</Nav.Link>
    );
}

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
            <Nav.Link href="/profilGestionnaire">Votre profil</Nav.Link>
            <Nav.Link href="/listestages">Liste des stages</Nav.Link>
            <Nav.Link href="/rapportEnseignant">Rapports enseignants</Nav.Link>
            <Nav.Link href="/rapportEtudiant">Rapports étudiants</Nav.Link>
            <Nav.Link href="/rapportStage">Rapports stages</Nav.Link>
            <Nav.Link href="/rapportContrat">Rapports contrats</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Logout/>
        </Nav>
    );
}

function EmployeurNav(props) {

    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profilEmployeur">Votre profil</Nav.Link>
            <Nav.Link href="/createStage">Créer un stage</Nav.Link>
            <Nav.Link href="/rapportStageEmployeur">Voir toutes les offres de stage</Nav.Link>
            {/*<Nav.Link href="/listestages">Voir toutes les offres de stage</Nav.Link>*/}
            <Nav.Link href="/contratsEmployeur">Contrats</Nav.Link>
            <Nav.Link href="/evaluationsEmployeur">Évaluations</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Logout/>
        </Nav>
    );
}

function EtudiantNav(props) {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profilEtudiant">Votre profil</Nav.Link>
            <Nav.Link href="/offrestage">Offres de stage</Nav.Link>
            <Nav.Link href="/listecandidatures">Vos candidatures</Nav.Link>
            <Nav.Link href="/contratEtudiant">Contrats</Nav.Link>
            <ChangeSessionNavDropdown sessions={props.sessions}/>
            <Logout/>

        </Nav>
    );
}

function ChangeSessionNavDropdown(props) {
    let nomSession = window.localStorage.getItem("nomSession");

    return (
        <NavDropdown title={nomSession} id="nav-dropdown">
         {props.sessions.map(
                data =>
                    <NavDropdown.Item key={data.id} eventKey="4.1" onClick={() => changeSession(data.id, data.nom)}>{data.nom}</NavDropdown.Item>
            )}
        </NavDropdown>
    );
}


function EnseignantNav() {

    return (
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profilEnseignant">Votre profil</Nav.Link>
            <Nav.Link href="/etudiantsEnCharge">Étudiants en charge</Nav.Link>
            <Nav.Link href="/evaluationMilieuStageHome">Évaluations</Nav.Link>
            <Logout/>
        </Nav>
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
    else if (props.desc.toUpperCase() === "ENSEIGNANT")
        return <EnseignantNav sessions={props.sessions} />
    else
        return <NotLoggedInNav/>
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavType
                        desc={this.state.desc}
                        sessions={this.state.sessions}
                    />

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default HeaderComponent;