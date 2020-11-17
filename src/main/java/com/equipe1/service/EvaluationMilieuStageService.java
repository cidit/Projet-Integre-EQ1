package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EvaluationMilieuStageRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvaluationMilieuStageService {

    @Autowired
    private EvaluationMilieuStageRepository evaluationMilieuStageRepository;

    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private CommentaireService commentaireService;



    public EvaluationMilieuStage save(EvaluationMilieuStage evaluation) {
        return evaluationMilieuStageRepository.save(evaluation);
    }

    public EvaluationMilieuStage saveEvaluation(RecepteurDonneesEvaluation receptorDonnesEvaluation, Long idCandidature) {
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        Employeur employeur;
        EvaluationMilieuStage evaluationMilieuStage = new EvaluationMilieuStage();
        Commentaire commentaire =receptorDonnesEvaluation.getCommentaires();

        if (candidature.isPresent()) {
            employeur = candidature.get().getStage().getEmployeur();
            evaluationMilieuStage.setEmployeur(employeur);
        }
        evaluationMilieuStageRepository.save(evaluationMilieuStage);

        for (Question q : receptorDonnesEvaluation.getQuestions()) {
            q.setEvaluation(evaluationMilieuStage);
            questionService.saveQuestion(q);
        }
        commentaire.setEvaluation(evaluationMilieuStage);
        commentaireService.saveCommentaire(receptorDonnesEvaluation.getCommentaires());

        return evaluationMilieuStage;
    }

}
