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
import java.util.Set;
import java.util.Optional;
import java.util.*;


@Component
public class InsertDataService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EmployeurRepository employeurRepository;

    @Autowired
    private StageService stageService;

    @Autowired
    StageRepository stageRepository;

    @Autowired
    private  GestionnaireService gestionnaireService;

    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    private ContratService contratService;

    @Autowired
    GenerateurPdfService generateurPdfService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private EvaluationStagiaireService evaluationStagiaireService;

    @Autowired
    private QuestionService questionService;


    @Autowired
    private EnseignantRepository enseignantRepository;

    private Session sessionActuelle;


    private List<Session> sessionList;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public void insertSession() {
        sessionList = new ArrayList<>();
        Session session;

        session = Session.builder().nom("ETE-2020").isCurrent(false).build();
        sessionRepository.save(session);
        sessionList.add(session);

        session = Session.builder().nom("AUT-2020").isCurrent(false).build();
        sessionRepository.save(session);
        sessionList.add(session);

        session = Session.builder().nom("HIV-2021").isCurrent(true).build();
        sessionRepository.save(session);
        sessionList.add(session);
    }

    @Transactional
    public void insertEtudiant(){
        Session session = sessionRepository.findCurrentSession().get();
        List<Session> sessions = new ArrayList<>();
        sessions.add(session);

        Etudiant e1 = new Etudiant();
        e1.setAdresse("123456");
        e1.setEmail("richard@email.com");
        e1.setMatricule("1772397");
        e1.setPassword("123456");
        //e1.setPassword(encoder.encode("123456"));
        e1.setPrenom("richard");
        e1.setNom("truong");
        e1.setStatutStage("possede stage");
        e1.setTelephone("555-555-5555");
        e1.setProgramme("Techniques de l’informatique");
        e1.setSessions(sessions);
        e1.setEnregistre(true);
        e1.setSessions(sessionList);

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);

        etudiantRepository.save(e1);

        Etudiant e2 = new Etudiant();
        e2.setAdresse("123456");
        e2.setEmail("alex@email.com");
        e2.setMatricule("1501279");
        e2.setPassword("123456");
        //e2.setPassword(encoder.encode("123456"));
        e2.setPrenom("alex");
        e2.setNom("truong");
        e2.setStatutStage("aucun stage");
        e2.setTelephone("555-444-4444");
        e2.setProgramme("Techniques de l’informatique");
        e2.setEnregistre(true);
        e2.setSessions(sessionList);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e2.setRoles(roles);

        etudiantRepository.save(e2);

        Etudiant e3 = new Etudiant();
        e3.setAdresse("123456");
        e3.setEmail("olingamedjoloic@gmail.com");
        e3.setMatricule("1998277");
        e3.setPassword("123456");
        //e3.setPassword(encoder.encode("123456"));
        e3.setPrenom("Loic");
        e3.setNom("Olinga");
        e3.setStatutStage("possede stage");
        e3.setTelephone("555-444-4444");
        e3.setProgramme("Techniques de l’informatique");
        e3.setSessions(sessionList);
        e3.setEnregistre(true);

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e3.setRoles(roles);

        etudiantRepository.save(e3);
    }

    @Transactional
    public void insertEmployeur(){
        Employeur e1 = new Employeur();
        e1.setEmail("carlos.test@gmail.com");
        e1.setPassword("123456");
        //e1.setPassword(encoder.encode("123456"));
        e1.setAdresse("12345");
        e1.setNom("Banque1");
        e1.setTelephone("888-888-8888");

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);

        employeurRepository.save(e1);

        e1 = new Employeur();
        e1.setEmail("employeur@email.com");
        e1.setPassword("123456");
        //e1.setPassword(encoder.encode("123456"));
        e1.setAdresse("12345");
        e1.setNom("Hopital Général");
        e1.setTelephone("888-888-8888");

        roles = new HashSet<>();
        role = roleRepository.findByName(Role.ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);
        
        employeurRepository.save(e1);
    }

    @Transactional
    public void insertStage(){
        Employeur e2 = employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");
        Session session = sessionRepository.findCurrentSession().get();

        Stage stage1 = new Stage();
        stage1.setTitre("Stage_1");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(2);
        stage1.setDateDebut(LocalDate.of(2020,10,12));
        stage1.setDateFin(LocalDate.of(2020,12,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,9,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(35);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setSalaire(15);

        stage1.setOuvert(true);
        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.APPROUVÉ);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_2");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(5);
        stage1.setDateDebut(LocalDate.now());
        stage1.setDateFin(LocalDate.of(2020,12,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(37);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setSalaire(15);

        stage1.setOuvert(true);
        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.APPROUVÉ);

        stageService.saveStage(stage1);

        Stage stage2 = new Stage();
        stage2.setTitre("Stage_2");
        stage2.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate. Faucibus in ornare quam viverra orci sagittis eu volutpat. ");
        stage2.setNbAdmis(5);
        stage2.setDateDebut(LocalDate.of(2021,4,7));
        stage2.setDateFin(LocalDate.of(2021,12,23));
        stage2.setDateLimiteCandidature(LocalDate.of(2020,12,6));
        stage2.setExigences("Travail d'equipe, Java, Python");
        stage2.setProgramme("Techniques de l’informatique");
        stage2.setNbHeuresParSemaine(40);
        stage2.setVille("Laval");
        stage2.setEmployeur(e2);
        stage2.setSalaire(18);
        stage2.setSession(session);

        e2 = employeurRepository.findEmployeurByEmail("employeur@email.com");

        stage2 = new Stage();
        stage2.setTitre("Stage en hémodialise");
        stage2.setDescription("Odio euismod lacinia at quis risus sed vulputate. Faucibus in ornare quam viverra orci sagittis eu volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
        stage2.setNbAdmis(14);
        stage2.setDateDebut(LocalDate.of(2021,1,9));
        stage2.setDateFin(LocalDate.of(2021,11,30));
        stage2.setDateLimiteCandidature(LocalDate.of(2020,12,5));
        stage2.setExigences("Travail d'equipe, compassion");
        stage2.setProgramme("Soins infirmiers");
        stage2.setNbHeuresParSemaine(38);
        stage2.setVille("Lasalle");
        stage2.setEmployeur(e2);
        stage2.setSalaire(20);
        stage2.setSession(session);
        stageService.saveStage(stage2);

    }

    @Transactional
    public void insertGestionnaire(){
        Gestionnaire g1 = new Gestionnaire();
        g1.setNom("admin01");
        g1.setPrenom("admin01");
        g1.setEmail("gestionnaire01@email.com");
        g1.setPassword("123456");
        //g1.setPassword(encoder.encode("123456"));
        g1.setTelephone("555-555-5555");

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(Role.ERole.ROLE_GESTIONNAIRE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        g1.setRoles(roles);

        gestionnaireService.saveGestionnaire(g1);
    }

    @Transactional
    public void insertCandidature(){
        Session session = sessionRepository.findCurrentSession().get();
        Employeur e2 = employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");
        Stage stage1 = new Stage();
        stage1.setTitre("stage_dummy1");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(5);
        stage1.setDateDebut(LocalDate.of(2019,12,12));
        stage1.setDateFin(LocalDate.of(2020,11,10));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(37);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setOuvert(true);

        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.APPROUVÉ);

        Etudiant etudiant = etudiantRepository.findByEmail("olingamedjoloic@gmail.com");
        Set<Etudiant> set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_dummy2");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(5);
        stage1.setDateDebut(LocalDate.of(2019,12,12));
        stage1.setDateFin(LocalDate.of(2020,10,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(37);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setOuvert(true);

        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.APPROUVÉ);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_dummy3");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(5);
        stage1.setDateDebut(LocalDate.of(2019,12,12));
        stage1.setDateFin(LocalDate.of(2020,10,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(37);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setOuvert(true);

        stage1.setSession(session);
        stage1.setStatut(Stage.StageStatus.REFUSÉ);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_dummy4");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(5);
        stage1.setDateDebut(LocalDate.of(2019,12,12));
        stage1.setDateFin(LocalDate.of(2020,10,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("Techniques de l’informatique");
        stage1.setNbHeuresParSemaine(37);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e2);
        stage1.setOuvert(true);

        //stage1.setStatut(Stage.StageStatus.APPROVED);
        stage1.setSession(session);
        //stage1.setStatut(Stage.StageStatus.REFUSÉ);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        etudiant = etudiantRepository.findByEmail("olingamedjoloic@gmail.com");
        Candidature candidature = candidatureService.createCandidature(etudiant.getId(), (long) 11);
        candidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        candidatureRepository.save(candidature);

        etudiant = etudiantRepository.findByEmail("richard@email.com");

        candidature = candidatureService.createCandidature(etudiant.getId(), (long) 11);
        candidature.setStatut(Candidature.CandidatureStatut.APPROUVE);
        candidatureRepository.save(candidature);

        etudiant = etudiantRepository.findByEmail("richard@email.com");

        candidature = candidatureService.createCandidature(etudiant.getId(), (long) 13);
        candidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        candidatureRepository.save(candidature);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        candidature = candidatureService.createCandidature(etudiant.getId(), (long) 9);
        candidature.setStatut(Candidature.CandidatureStatut.EN_ATTENTE);
        candidatureRepository.save(candidature);
    }

    @Transactional
    public void insertContrat() throws Exception {
        Employeur employeurTest= employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");
        Optional<Stage> stageTest = stageRepository.findById(6L);
        Optional <Candidature> candidature = candidatureRepository.findById(15L);
        Optional <Candidature> candidature2 = candidatureRepository.findById(16L);

        Contrat contrat = new Contrat();
        contrat.setEmployeur(employeurTest);
        contrat.setSignatureEmployeur(Contrat.SignatureEtat.SIGNE);
        contrat.setCandidature(candidature2.get());
        contrat.setDocumentContrat(generateurPdfService.createPdf(candidature2.get().getStage(),
                employeurTest,candidature2.get().getEtudiant()).toByteArray());

        contratService.saveContrat(contrat);

        //deuxieme pour test
        Contrat contrat2 = new Contrat();
        contrat2.setEmployeur(employeurTest);
        contrat2.setCandidature(candidature.get());

        contrat2.setDocumentContrat(generateurPdfService.createPdf(candidature.get().getStage(),
                employeurTest,candidature.get().getEtudiant()).toByteArray());

        contratService.saveContrat(contrat2);
    }

    @Transactional
    public void insertEvaluationStagiaire() throws Exception {

        Optional<Employeur> employeur = employeurRepository.findById(5L);
       Etudiant etudiant = new Etudiant();
       etudiant.setPrenom("Zoy");
       etudiant.setNom("laComadreja");
       etudiant.setEmail("zoyLaComadreja@email.com");
       etudiant.setProgramme("Technique de l'informatique");
       etudiantRepository.save(etudiant);
        EvaluationStagiaire e = new EvaluationStagiaire();
        Question q1 = new Question();
        e.setDateCreation(LocalDate.now());
        e.setEmployeur(employeur.orElse(new Employeur()));
        e.setEtudiant(etudiant);
        evaluationStagiaireService.save(e);

        q1.setQuestion("enonce 1");
        q1.setReponse("reposnse question 1");
        q1.setEvaluation(e);

        Question q2 = new Question();
        q2.setQuestion("enonce 2");
        q2.setReponse("reposnse question 2");
        q2.setEvaluation(e);
        questionService.saveAllQuestions(Arrays.asList(q1,q2));


    }


    @Transactional
    public void insertEnseinants() {
        Enseignant enseignant1 = new Enseignant();
        enseignant1.setNom("Laure");
        enseignant1.setPrenom("Gaudreault ");
        enseignant1.setPassword("123456");
        enseignant1.setProgramme("Gestion de commerces");
        enseignant1.setEmail("laure@email.com");
        enseignant1.setTelephone("438956254");
        enseignantRepository.save(enseignant1);

        Enseignant enseignant2 = new Enseignant();
        enseignant2.setNom("Leonie");
        enseignant2.setPrenom("Aguilar ");
        enseignant2.setPassword("123456");
        enseignant2.setProgramme("Gestion de commerces");
        enseignant2.setEmail("Leonie@email.com");
        enseignant2.setTelephone("438950000");
        enseignantRepository.save(enseignant2);

        Enseignant enseignant3 = new Enseignant();
        enseignant3.setNom("Jia ");
        enseignant3.setPrenom("Haworth ");
        enseignant3.setPassword("123456");
        enseignant3.setProgramme("Gestion de commerces");
        enseignant3.setEmail("Jia@email.com");
        enseignant3.setTelephone("43895111111");
        enseignantRepository.save(enseignant3);

        Enseignant enseignant4 = new Enseignant();
        enseignant4.setNom("Freja ");
        enseignant4.setPrenom("Vickers ");
        enseignant4.setPassword("123456");
        enseignant4.setProgramme("Techniques de l’informatique");
        enseignant4.setEmail("Freja@email.com");
        enseignant4.setTelephone("4389522222");
        enseignantRepository.save(enseignant4);

        Enseignant enseignant5 = new Enseignant();
        enseignant5.setNom("Kristian ");
        enseignant5.setPrenom("Redman ");
        enseignant5.setPassword("123456");
        enseignant5.setProgramme("Techniques de l’informatique");
        enseignant5.setEmail("Kristian@email.com");
        enseignant5.setTelephone("4389522222");
        enseignantRepository.save(enseignant5);

        for (int i = 0; i <30 ; i++) {
            enseignant5 = new Enseignant();
            enseignant5.setNom("Kristian "+ i);
            enseignant5.setPrenom("Redman " + i);
            enseignant5.setPassword("123456" + i);
            enseignant5.setProgramme("Techniques de l’informatique");
            enseignant5.setEmail("Kristian@email.com" +i);
            enseignant5.setTelephone("4389522222");
            enseignantRepository.save(enseignant5);
        }

    }
}



