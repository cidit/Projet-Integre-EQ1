package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EvaluationStagiaireRepository;
import com.equipe1.repository.QuestionRepository;
import com.equipe1.repository.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
class EvaluationStagiaireServiceTest {

    @MockBean
    private EvaluationStagiaireRepository evaluationStagiaireRepository;
    @MockBean
    private EtudiantService etudiantService;
    @MockBean
    private CandidatureService candidatureService;
    @MockBean
    private EmployeurRepository employeurRepository;
    @MockBean
    private SessionRepository sessionRepository;
    @MockBean
    private QuestionRepository questionRepository;
    @MockBean
    private CommentaireService commentaireService;
    @MockBean
    private QuestionService questionService;

    @Autowired
    private EvaluationStagiaireService evaluationStagiaireService;
    private EvaluationStagiaire e;
    private Question q1;
    private Question q2;
    private Commentaire commentaire;
    private RecepteurDonneesEvaluation receptorDonnesEvaluation;
    private Etudiant etudiant;
    private Candidature candidature;
    private Stage stage;
    private Employeur employeur;
    private Session session;

    @BeforeEach
    public void setUp() {
        e = new EvaluationStagiaire();
        q1 = new Question();
        e.setDateCreation(LocalDate.now());

        q1.setQuestion("enonce 1");
        q1.setReponse("reponse question 1");
        q1.setEvaluation(e);

        q2 = new Question();
        q2.setQuestion("enonce 2");
        q2.setReponse("reponse question 2");
        q2.setEvaluation(e);

        commentaire = new Commentaire();
        commentaire.setEnnonce("commentaire a la question");
        commentaire.setSection("Productivite");

        employeur = new Employeur();
        stage = new Stage();
        candidature = new Candidature();

        receptorDonnesEvaluation = new RecepteurDonneesEvaluation(Arrays.asList(q1,q2),commentaire);
        etudiant = new Etudiant();
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .dateDebut(LocalDate.now())
                .build();
        sessionRepository.save(session);
    }

    @Test
    void getEvaluationById() {
        when(evaluationStagiaireRepository.findById(1L)).thenReturn(Optional.of(e));
        EvaluationStagiaire evaluation = evaluationStagiaireService.getEvaluationById(1L);
        assertEquals(evaluation, e);
        assertNotNull(evaluation);
    }

    @Test
    void save() {
        when(evaluationStagiaireRepository.save(e)).thenReturn(e);
        EvaluationStagiaire evaluation = evaluationStagiaireService.save(e);
        assertEquals(evaluation, e);
        assertNotNull(evaluation);
    }

    @Test
    void saveEvaluation() {
        etudiant.setEvaluationStagiaire(e);
        stage.setEmployeur(employeur);
        candidature.setStage(stage);
        candidature.setEtudiant(etudiant);
        when(evaluationStagiaireRepository.findByEtudiant(etudiant)).thenReturn(e);
        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature));
        when(etudiantService.findEtudiantById(1L)).thenReturn(Optional.of(etudiant));
        EvaluationStagiaire evaluation = evaluationStagiaireService.saveEvaluation(receptorDonnesEvaluation,1L);
        assertEquals(evaluation, e);
        assertNotNull(evaluation);
    }

    @Test
    void getByEmployeur() {
        Session session = sessionRepository.findCurrentSession().get();
        when(employeurRepository.findById(1L)).thenReturn(Optional.of(employeur));
        when(evaluationStagiaireRepository.findByEmployeur(employeur)).thenReturn(Arrays.asList(e));
        List<EvaluationStagiaire> evaluations = evaluationStagiaireService.getByEmployeurId(1l, session.getId());

        Assertions.assertNotNull(evaluations);
        Assertions.assertEquals(evaluations.size(), 1);

    }
}