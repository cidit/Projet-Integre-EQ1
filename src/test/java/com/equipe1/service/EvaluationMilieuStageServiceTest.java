package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EvaluationMilieuStageRepository;
import com.equipe1.repository.QuestionRepository;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EvaluationMilieuStageServiceTest {

    @MockBean
    private EvaluationMilieuStageRepository milieuStageRepository;
    @MockBean
    private EtudiantService etudiantService;
    @MockBean
    private QuestionRepository questionRepository;
    @MockBean
    private CommentaireService commentaireService;
    @MockBean
    private QuestionService questionService;
    @MockBean
    private CandidatureService candidatureService;
    @MockBean
    private CandidatureRepository candidatureRepository;

    @Autowired
    private EvaluationMilieuStageService evaluationMilieuStageService;

    private EvaluationMilieuStage e;
    private Question q1;
    private Question q2;
    private Commentaire commentaire;
    private RecepteurDonneesEvaluation receptorDonnesEvaluation;
    private Candidature candidature;
    private Stage stage;
    private Employeur employeur;

    @BeforeEach
    public void setUp() {
        e = new EvaluationMilieuStage();
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

        receptorDonnesEvaluation = new RecepteurDonneesEvaluation(Arrays.asList(q1,q2),commentaire);
        employeur = new Employeur();
        stage = new Stage();
        candidature = new Candidature();

    }

    @Test
    void save() {
        when(milieuStageRepository.save(e)).thenReturn(e);
        EvaluationMilieuStage evaluation = evaluationMilieuStageService.save(e);
        assertEquals(evaluation, e);
        assertNotNull(evaluation);
    }

    @Test
    void saveEvaluation() {
        stage.setEmployeur(employeur);
        candidature.setStage(stage);
        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature));
        EvaluationMilieuStage evaluation = evaluationMilieuStageService.saveEvaluation(receptorDonnesEvaluation,1L);

        assertEquals(evaluation.getEmployeur(), employeur);
        assertNotNull(evaluation);
    }
}