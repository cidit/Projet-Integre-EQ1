package com.equipe1.controller;

import com.equipe1.model.*;
import com.equipe1.repository.QuestionRepository;
import com.equipe1.service.CommentaireService;
import com.equipe1.service.EtudiantService;
import com.equipe1.service.EvaluationStagiaireService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationStagiaire")
public class EvaluationStagiaireController {

    @Autowired
    private EvaluationStagiaireService evaluationStagiaireService;

    @Autowired
    private EtudiantService etudiantService;

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private CommentaireService commentaireService;

    @GetMapping("findById/{idEvaluation}")
    public EvaluationStagiaire getEvaluationStagiaireByid (Long idEvaluation){
        return evaluationStagiaireService.getEvaluationById(idEvaluation);
    }

    @PutMapping("/newEvaluation/{id}")
    public EvaluationStagiaire updateEtudiant(@RequestBody List<DonnesToEvaluation> evaluation,
                                              @PathVariable Long id){

        Optional<Etudiant> etudiant = etudiantService.findEtudiantById(id);
       EvaluationStagiaire evaluationStagiaire = etudiant.get().getEvaluationStagiaire();


        if(evaluationStagiaire  == null){
            evaluationStagiaire = new EvaluationStagiaire();
            evaluationStagiaireService.save(evaluationStagiaire);
            etudiant.get().setEvaluationStagiaire(evaluationStagiaire);
            etudiantService.saveEtudiant(etudiant.get());

            System.out.println(etudiant.get().getId() + " id " + evaluationStagiaire.getId() + " id evaluation inside if");
        }

       /* for (Question q: questions) {
            q.setEvaluation(evaluationStagiaire);
            questionRepository.save(q);
            System.out.println(q);
        }

        for (Commentaire c: commentaires) {
            c.setEvaluation(evaluationStagiaire);
            commentaireService.saveCommentaire(c);
        }*/
//seter commentaires
        //reformater optional
        return evaluationStagiaire;
    }


   @Data
   @AllArgsConstructor
    private static class DonnesToEvaluation{
        List<Question> questions;
        String commentaires;
    }

}
