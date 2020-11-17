package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EvaluationStagiaireRepository;
import com.equipe1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class EvaluationStagiaireService {

    @Autowired
    private EvaluationStagiaireRepository evaluationStagiaireRepository;
    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private CommentaireService commentaireService;
    @Autowired
    private CandidatureService candidatureService;



    public EvaluationStagiaire getEvaluationById(Long idEvaluation) {
        return (EvaluationStagiaire) evaluationStagiaireRepository.findById(idEvaluation)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid evaluation id %s",idEvaluation)));
    }

    public EvaluationStagiaire save(EvaluationStagiaire e) {
        return evaluationStagiaireRepository.save(e);
    }


    public EvaluationStagiaire saveEvaluation(RecepteurDonneesEvaluation receptorDonnesEvaluation, Long idCandidature) {
        Etudiant etudiant = new Etudiant();
        Employeur employeur = new Employeur();
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);

        if(candidature.isPresent()){
            etudiant = candidature.get().getEtudiant();
            employeur = candidature.get().getStage().getEmployeur();
        }
        EvaluationStagiaire evaluationStagiaire = etudiant.getEvaluationStagiaire();
        Commentaire commentaire =receptorDonnesEvaluation.getCommentaires();

        if(evaluationStagiaire  == null){
            evaluationStagiaire = new EvaluationStagiaire();
            evaluationStagiaire.setEmployeur(employeur);
            evaluationStagiaireRepository.save(evaluationStagiaire);
            etudiant.setEvaluationStagiaire(evaluationStagiaire);
            etudiantService.saveEtudiant(etudiant);

        }

        for (Question q: receptorDonnesEvaluation.getQuestions()) {
            q.setEvaluation(evaluationStagiaire);
            questionRepository.save(q);
            System.out.println(q);
        }
        commentaire.setEvaluation(evaluationStagiaire);
        commentaireService.saveCommentaire(receptorDonnesEvaluation.getCommentaires());

        return evaluationStagiaire;

    }



}
