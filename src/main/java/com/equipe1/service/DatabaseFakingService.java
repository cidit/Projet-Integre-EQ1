package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Collectors;


@Component
public class DatabaseFakingService {


    private EtudiantRepository etudiantRepository;
    private EmployeurRepository employeurRepository;
    private StageRepository stageRepository;
    private GestionnaireRepository gestionnaireRepository;
    private CandidatureRepository candidatureRepository;
    private SessionRepository sessionRepository;
    private EvaluationStagiaireRepository evaluationStagiaireRepository;
    private EnseignantRepository enseignantRepository;
    private RoleRepository roleRepository;

    @Autowired
    public DatabaseFakingService(EtudiantRepository etudiantRepository, EmployeurRepository employeurRepository, StageRepository stageRepository, GestionnaireRepository gestionnaireRepository, CandidatureRepository candidatureRepository, SessionRepository sessionRepository, EvaluationStagiaireRepository evaluationStagiaireRepository, EnseignantRepository enseignantRepository, RoleRepository roleRepository) {
        this.etudiantRepository = etudiantRepository;
        this.employeurRepository = employeurRepository;
        this.stageRepository = stageRepository;
        this.gestionnaireRepository = gestionnaireRepository;
        this.candidatureRepository = candidatureRepository;
        this.sessionRepository = sessionRepository;
        this.evaluationStagiaireRepository = evaluationStagiaireRepository;
        this.enseignantRepository = enseignantRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public void insertSession() {
        var sessions = new ArrayList<Session>();
        sessions.add(Session.builder()
                .nom("ETE-2020")
                .isCurrent(false)
                .dateDebut(LocalDate.of(2020, 6, 1))
                .dateFin(LocalDate.of(2020, 8, 31))
                .build());
        sessions.add(Session.builder()
                .nom("AUT-2020")
                .isCurrent(false)
                .dateDebut(LocalDate.of(2020, 9, 1))
                .dateFin(LocalDate.of(2020, 12, 31))
                .build());
        sessions.add(Session.builder()
                .nom("HIV-2021")
                .isCurrent(true)
                .dateDebut(LocalDate.of(2021, 1, 1))
                .dateFin(LocalDate.of(2021, 5, 31)).build());
        sessionRepository.saveAll(sessions);

    }

    @Transactional
    public void insertEtudiant() {
        var role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT).orElseThrow();
        var sessions = sessionRepository.findAll();
        var etudiants = new ArrayList<Etudiant>();

        etudiants.add(Etudiant.builder()
                .roles(new HashSet<>(Collections.singletonList(role)))
                .email("richard@email.com")
                .password("123456")
                .nom("Truong")
                .prenom("Richard")
                .telephone("555-555-5555")
                .adresse("234 Rue Begodin")
                .matricule("1772397")
                .programme("Techniques de l’informatique")
                .sessions(sessions)
                .build());

        etudiants.add(Etudiant.builder()
                .roles(new HashSet<>(Collections.singletonList(role)))
                .email("felix@email.com")
                .password("123456")
                .nom("St-Gelais")
                .prenom("Felix")
                .telephone("666-666-6666")
                .adresse("666 Avenue Sanretour")
                .matricule("1872046")
                .programme("Techniques de l’informatique")
                .sessions(sessions.stream()
                        .filter(session -> !session.equals(sessionRepository.findCurrentSession().orElseThrow()))
                        .collect(Collectors.toList()))
                .build());

        etudiants.add(Etudiant.builder()
                .roles(new HashSet<>(Collections.singletonList(role)))
                .email("isa@email.com")
                .password("123456")
                .nom("Tremblay")
                .prenom("Isadora")
                .telephone("777-777-7777")
                .adresse("420 Rue Blazitt")
                .matricule("000000")
                .programme("Techniques de l’informatique")
                .sessions(sessions)
                .build());

        etudiantRepository.saveAll(etudiants);
    }

    @Transactional
    public void insertEmployeur() {
        var role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR).orElseThrow();
        var employeurs = new ArrayList<Employeur>();

        employeurs.add(Employeur.builder()
                .roles(new HashSet<>(Collections.singletonList(role)))
                .email("carlos@email.com")
                .password("123456")
                .nom("Banque Nationale")
                .telephone("444-444-4444")
                .adresse("300 Rue du Patroneur")
                .build());

        employeurs.add(Employeur.builder()
                .roles(new HashSet<>(Collections.singletonList(role)))
                .email("loic@email.com")
                .password("123456")
                .nom("Hopital General")
                .telephone("333-333-3333")
                .adresse("400 Rue du Contour")
                .build());

        employeurRepository.saveAll(employeurs);
    }

    @Transactional
    public void insertEnseignants() {
        var enseignants = new ArrayList<Enseignant>();

        enseignants.add(Enseignant.builder()
                .email("francois@email.com")
                .password("123456")
                .nom("Lacoursiere")
                .prenom("Francois")
                .telephone("888-888-8888")
                .programme("Techniques de l’informatique")
                .build());

        enseignants.add(Enseignant.builder()
                .email("reda@email.com")
                .password("123456")
                .nom("Hamza")
                .prenom("Reda")
                .telephone("999-999-9999")
                .programme("Techniques de l’informatique")
                .build());

        enseignantRepository.saveAll(enseignants);
    }

    @Transactional
    public void insertGestionnaire() {
        var role = roleRepository.findByName(Role.ERole.ROLE_GESTIONNAIRE).orElseThrow();
        var gestionnaires = new ArrayList<Gestionnaire>();

        gestionnaires.add(Gestionnaire.builder()
                .roles(new HashSet<>(Collections.singletonList(role)))
                .email("gestionaire@email.com")
                .password("123456")
                .nom("Doe")
                .prenom("John")
                .telephone("000-000-0000")
                .build());

        gestionnaireRepository.saveAll(gestionnaires);
    }

    @Transactional
    public void insertStage() {
        var employeurs = employeurRepository.findAll();
        var sessions = sessionRepository.findAll();
        var stages = new ArrayList<Stage>();

        stages.add(Stage.builder()
                .titre("stage 1")
                .description("stage informatique")
                .programme("Techniques de l’informatique")
                .exigences("aucunes")
                .ville("Montreal")
                .nbHeuresParSemaine(35)
                .salaire(15)
                .nbAdmis(2)
                .employeur(employeurs.get(0))
                .dateDebut(LocalDate.of(2020, 10, 12))
                .dateFin(LocalDate.of(2020, 12, 12))
                .dateLimiteCandidature(LocalDate.of(2020, 9, 11))
                .session(sessions.get(0))
                .statut(Stage.StageStatus.EN_ATTENTE)
                .build());

        stages.add(Stage.builder()
                .titre("stage 2")
                .description("stage informatique")
                .programme("Techniques de l’informatique")
                .exigences("SQL, Java")
                .ville("Longueuil")
                .nbHeuresParSemaine(35)
                .salaire(17)
                .nbAdmis(4)
                .employeur(employeurs.get(0))
                .dateDebut(LocalDate.of(2020, 10, 12))
                .dateFin(LocalDate.of(2020, 12, 12))
                .dateLimiteCandidature(LocalDate.of(2020, 9, 11))
                .session(sessions.get(1))
                .statut(Stage.StageStatus.APPROUVÉ)
                .build());

        stages.add(Stage.builder()
                .titre("stage 3")
                .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ")
                .programme("Soins infirmiers")
                .exigences("aucunes")
                .ville("Montreal")
                .nbHeuresParSemaine(35)
                .salaire(12)
                .nbAdmis(2)
                .employeur(employeurs.get(1))
                .dateDebut(LocalDate.of(2020, 10, 12))
                .dateFin(LocalDate.of(2020, 12, 12))
                .dateLimiteCandidature(LocalDate.of(2020, 9, 11))
                .session(sessions.get(0))
                .statut(Stage.StageStatus.EN_ATTENTE)
                .build());

        stages.add(Stage.builder()
                .titre("stage 4")
                .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ")
                .programme("Soins infirmiers")
                .exigences("aucunes")
                .ville("Montreal")
                .nbHeuresParSemaine(20)
                .salaire(20)
                .nbAdmis(5)
                .employeur(employeurs.get(1))
                .dateDebut(LocalDate.of(2020, 10, 12))
                .dateFin(LocalDate.of(2020, 12, 12))
                .dateLimiteCandidature(LocalDate.of(2020, 9, 11))
                .session(sessions.get(2))
                .statut(Stage.StageStatus.APPROUVÉ)
                .build());

        stages.add(Stage.builder()
                .titre("stage 5")
                .description("stage informatique")
                .programme("Techniques de l’informatique")
                .exigences("aucunes")
                .ville("Montreal")
                .nbHeuresParSemaine(20)
                .salaire(18)
                .nbAdmis(4)
                .employeur(employeurs.get(0))
                .dateDebut(LocalDate.of(2020, 10, 12))
                .dateFin(LocalDate.of(2020, 12, 12))
                .dateLimiteCandidature(LocalDate.of(2020, 9, 11))
                .session(sessions.get(1))
                .statut(Stage.StageStatus.EN_ATTENTE)
                .build());

        stageRepository.saveAll(stages);
    }

    @Transactional
    public void insertCandidature() {
        var stages = stageRepository.findAll();
        var etudiants = etudiantRepository.findAll();
        var candidatures = new ArrayList<Candidature>();

        candidatures.add(Candidature.builder()
                .etudiant(etudiants.get(0))
                .stage(stages.get(0))
                .statut(Candidature.CandidatureStatut.EN_ATTENTE)
                .isEvaluee(false)
                .build());

        candidatures.add(Candidature.builder()
                .etudiant(etudiants.get(0))
                .stage(stages.get(1))
                .statut(Candidature.CandidatureStatut.EN_ATTENTE)
                .isEvaluee(false)
                .build());

        candidatures.add(Candidature.builder()
                .etudiant(etudiants.get(1))
                .stage(stages.get(1))
                .statut(Candidature.CandidatureStatut.REFUSE)
                .isEvaluee(false)
                .build());

        candidatures.add(Candidature.builder()
                .etudiant(etudiants.get(1))
                .stage(stages.get(2))
                .statut(Candidature.CandidatureStatut.EN_ATTENTE)
                .isEvaluee(false)
                .build());

        candidatures.add(Candidature.builder()
                .etudiant(etudiants.get(2))
                .stage(stages.get(3))
                .statut(Candidature.CandidatureStatut.APPROUVE)
                .isEvaluee(false)
                .build());

        candidatures.add(Candidature.builder()
                .etudiant(etudiants.get(2))
                .stage(stages.get(4))
                .statut(Candidature.CandidatureStatut.EN_ATTENTE)
                .isEvaluee(false)
                .build());

        candidatureRepository.saveAll(candidatures);
    }

//    @Transactional
//    public void insertContrat() throws Exception {
//    }

    @Transactional
    public void insertEvaluationStagiaire() throws Exception {
        var enseignants = enseignantRepository.findAll();
        var employeurs = employeurRepository.findAll();
        var etudiants = etudiantRepository.findAll();
        var evaluations = new ArrayList<EvaluationStagiaire>();

        evaluations.add(EvaluationStagiaire.builder()
                .dateCreation(LocalDate.now())
                .employeur(employeurs.get(0))
                .etudiant(etudiants.get(0))
                .build());

        evaluations.add(EvaluationStagiaire.builder()
                .dateCreation(LocalDate.now())
                .employeur(employeurs.get(1))
                .etudiant(etudiants.get(0))
                .build());

        evaluationStagiaireRepository.saveAll(evaluations);
    }
}


