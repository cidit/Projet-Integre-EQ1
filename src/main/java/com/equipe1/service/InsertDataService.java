package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
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
    private CandidatureService candidatureService;

    @Autowired
    private ContratService contratService;

    @Autowired
    GenerateurPdfService generateurPdfService;

    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private SessionRepository sessionRepository;

    private Session sessionActuelle;

    private List<Session> sessionList;

    @Transactional
    public void insertSession() {
        Session session = new Session();
        session.setNom("AUT-2020");
        //session.setDateDebut(LocalDate.now());
        session.setDateDebut(LocalDate.of(2017, 7, 24));
        sessionRepository.save(session);

        sessionActuelle = sessionRepository.findCurrentSession().get();

        sessionList = new ArrayList<>();
        sessionList.add(sessionActuelle);
    }

    @Transactional
    public void insertEtudiant(){

        Etudiant e1 = new Etudiant();
        e1.setAdresse("123456");
        e1.setEmail("richard@email.com");
        e1.setMatricule("1772397");
        e1.setPassword("123456");
        e1.setPrenom("richard");
        e1.setNom("truong");
        e1.setStatutStage("possede stage");
        e1.setTelephone("555-555-5555");
        e1.setProgramme("Techniques de l’informatique");
        e1.setSession(sessionList);
        etudiantRepository.save(e1);

        Etudiant e2 = new Etudiant();
        e2.setAdresse("123456");
        e2.setEmail("alex@email.com");
        e2.setMatricule("1501279");
        e2.setPassword("123456");
        e2.setPrenom("alex");
        e2.setNom("truong");
        e2.setStatutStage("aucun stage");
        e2.setTelephone("555-444-4444");
        e2.setProgramme("Techniques de l’informatique");
        e2.setSession(sessionList);
        etudiantRepository.save(e2);

        Etudiant e3 = new Etudiant();
        e3.setAdresse("123456");
        e3.setEmail("olingamedjoloic@gmail.com");
        e3.setMatricule("1998277");
        e3.setPassword("123456");
        e3.setPrenom("Loic");
        e3.setNom("Olinga");
        e3.setStatutStage("aucun stage");
        e3.setTelephone("555-444-4444");
        e3.setProgramme("Techniques de l’informatique");
        //e3.setSession(sessionList);
        etudiantRepository.save(e3);

    }

    @Transactional
    public void insertEmployeur(){
        Employeur e1 = new Employeur();
        e1.setEmail("carlos.test@gmail.com");
        e1.setPassword("12345");
        e1.setAdresse("12345");
        e1.setNom("Banque1");
        e1.setTelephone("888-888-8888");
        employeurRepository.save(e1);

        e1 = new Employeur();
        e1.setEmail("employeur@email.com");
        e1.setPassword("12345");
        e1.setAdresse("12345");
        e1.setNom("Hopital Général");
        e1.setTelephone("888-888-8888");
        employeurRepository.save(e1);
    }

    @Transactional
    public void insertStage(){
        Employeur e2 = employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");

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
        stage1.setStatut(Stage.StageStatus.APPROVED);
        stageService.saveStage(stage1);
        stage1.setSession(sessionActuelle);

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
        stage1.setOuvert(true);
        stage1.setStatut(Stage.StageStatus.APPROVED);
        stage1.setSession(sessionActuelle);

        Etudiant etudiant = etudiantRepository.findByEmail("richard@email.com");
        Set<Etudiant> set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

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
        stage2.setSession(sessionActuelle);
        stageService.saveStage(stage2);

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
        stage2.setSession(sessionActuelle);
        stageService.saveStage(stage2);


//        Candidature c = new Candidature();
//        candidatureService.createCandidature((long) 1, (long) 6);
//        candidatureService.createCandidature((long) 2, (long) 6);
//        candidatureService.createCandidature((long) 3, (long) 6);

    }

    @Transactional
    public void insertGestionnaire(){
        Gestionnaire g1 = new Gestionnaire();
        g1.setNom("toto");
        g1.setPrenom("toto");
        g1.setEmail("gestionnaire01@email.com");
        g1.setPassword("123456");
        g1.setTelephone("555-555-5555");
        gestionnaireService.saveGestionnaire(g1);
    }

    @Transactional
    public void insertCandidature(){
        Employeur e2 = employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");
        Stage stage1 = new Stage();
        stage1.setTitre("stage_dummy1");
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
        stage1.setOuvert(true);
        stage1.setStatut(Stage.StageStatus.APPROVED);
        stage1.setSession(sessionActuelle);

        Etudiant etudiant = etudiantRepository.findByEmail("olingamedjoloic@gmail.com");
        Set<Etudiant> set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_dummy2");
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
        stage1.setOuvert(true);
        stage1.setStatut(Stage.StageStatus.APPROVED);
        stage1.setSession(sessionActuelle);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_dummy3");
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
        stage1.setOuvert(true);
        stage1.setStatut(Stage.StageStatus.APPROVED);
        stage1.setSession(sessionActuelle);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        set = new HashSet<>();
        set.add(etudiant);
        stage1.setEtudiantsAdmits(set);

        stageService.saveStage(stage1);

        stage1 = new Stage();
        stage1.setTitre("stage_dummy4");
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
        stage1.setOuvert(true);
        stage1.setStatut(Stage.StageStatus.APPROVED);
        stage1.setSession(sessionActuelle);

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
        candidature = candidatureService.createCandidature(etudiant.getId(), (long) 12);
        candidature.setStatut(Candidature.CandidatureStatut.APPROUVE);
        candidatureRepository.save(candidature);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        candidature = candidatureService.createCandidature(etudiant.getId(), (long) 13);
        candidature.setStatut(Candidature.CandidatureStatut.APPROUVE);
        candidatureRepository.save(candidature);

        etudiant = etudiantRepository.findByEmail("richard@email.com");
        candidature = candidatureService.createCandidature(etudiant.getId(), (long) 14);
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
}
