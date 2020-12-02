package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.*;


@Component
public class DatabaseFakingService {


    private EtudiantRepository etudiantRepository;
    private EmployeurRepository employeurRepository;
    private StageService stageService;
    private StageRepository stageRepository;
    private GestionnaireService gestionnaireService;
    private CandidatureRepository candidatureRepository;
    private SessionRepository sessionRepository;
    private CandidatureService candidatureService;
    private ContratService contratService;
    private GenerateurPdfService generateurPdfService;
    private EvaluationStagiaireService evaluationStagiaireService;
    private QuestionService questionService;
    private EnseignantRepository enseignantRepository;
    private RoleRepository roleRepository;

    PasswordEncoder encoder;

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
                .roles(new HashSet<>(Arrays.asList(role)))
                .email("richard@email.com")
                .password("123456")
                .nom("Truong")
                .prenom("Richard")
                .telephone("555-555-5555")
                .matricule("1772397")
                .programme("Techniques de l’informatique")
                .build());

        etudiantRepository.saveAll(etudiants);
    }

    @Transactional
    public void insertEmployeur() {
        var role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR);
    }

    @Transactional
    public void insertGestionnaire() {
        var role = roleRepository.findByName(Role.ERole.ROLE_GESTIONNAIRE);
    }

    @Transactional
    public void insertStage() {
    }

    @Transactional
    public void insertCandidature() {
    }

    @Transactional
    public void insertContrat() throws Exception {
    }

    @Transactional
    public void insertEvaluationStagiaire() throws Exception {
    }

    @Transactional
    public void insertEnseignants() {
    }
}



