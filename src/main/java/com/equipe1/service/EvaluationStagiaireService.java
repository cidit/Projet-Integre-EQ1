package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EvaluationStagiaireRepository;
import com.equipe1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Arrays;
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



    public EvaluationStagiaire getEvaluationById(Long idEvaluation) {
        return (EvaluationStagiaire) evaluationStagiaireRepository.findById(idEvaluation)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid evaluation id %s",idEvaluation)));
    }

    public EvaluationStagiaire save(EvaluationStagiaire e) {
        return evaluationStagiaireRepository.save(e);
    }


    public EvaluationStagiaire saveEvaluation(RecepteurDonneesEvaluation receptorDonnesEvaluation, Long idEtudiant) {
        Optional<Etudiant> etudiant = etudiantService.findEtudiantById(idEtudiant);
        EvaluationStagiaire evaluationStagiaire = etudiant.get().getEvaluationStagiaire();
        Commentaire commentaire =receptorDonnesEvaluation.getCommentaires();


        if(evaluationStagiaire  == null){
            evaluationStagiaire = new EvaluationStagiaire();
            evaluationStagiaireRepository.save(evaluationStagiaire);
            etudiant.get().setEvaluationStagiaire(evaluationStagiaire);
            etudiantService.saveEtudiant(etudiant.get());

            System.out.println(etudiant.get().getId() + " id " + evaluationStagiaire.getId() + " id evaluation inside if");
        }

        for (Question q: receptorDonnesEvaluation.getQuestions()) {
            q.setEvaluation(evaluationStagiaire);
            questionRepository.save(q);
            System.out.println(q);
        }

        commentaire.setEvaluation(evaluationStagiaire);
        commentaireService.saveCommentaire(receptorDonnesEvaluation.getCommentaires());


//seter commentaires
        //reformater optional
        return evaluationStagiaire;

    }



}
