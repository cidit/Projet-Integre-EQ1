package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EvaluationStagiaireRepository;
import com.equipe1.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class EvaluationStagiaireServiceTest {

    @MockBean
    private EvaluationStagiaireRepository evaluationStagiaireRepository;
    @MockBean
    private EtudiantService etudiantService;
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

        receptorDonnesEvaluation = new RecepteurDonneesEvaluation(Arrays.asList(q1,q2),commentaire);
        etudiant = new Etudiant();
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
        when(etudiantService.findEtudiantById(1L)).thenReturn(Optional.of(etudiant));
        EvaluationStagiaire evaluation = evaluationStagiaireService.saveEvaluation(receptorDonnesEvaluation,1L);
        assertEquals(evaluation, e);
        assertNotNull(evaluation);
    }
}