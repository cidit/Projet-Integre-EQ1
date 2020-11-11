package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Evaluation;
import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.model.Question;
import com.equipe1.repository.QuestionRepository;
import com.equipe1.service.EtudiantService;
import com.equipe1.service.EvaluationStagiaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("findById/{idEvaluation}")
    public EvaluationStagiaire getEvaluationStagiaireByid (Long idEvaluation){
        return evaluationStagiaireService.getEvaluationById(idEvaluation);
    }

    @PutMapping("/newEvaluation/{id}")
    public EvaluationStagiaire updateEtudiant(@RequestBody List<Question> questions, @PathVariable Long id){
        Optional<Etudiant> etudiant = etudiantService.findEtudiantById(id);
        EvaluationStagiaire evaluationStagiaire = etudiant.get().getEvaluationStagiaire();



        if(evaluationStagiaire  == null){
            evaluationStagiaire = new EvaluationStagiaire();
            evaluationStagiaireService.save(evaluationStagiaire);
            etudiant.get().setEvaluationStagiaire(evaluationStagiaire);
            etudiantService.saveEtudiant(etudiant.get());

            System.out.println(etudiant.get().getId() + " id " + evaluationStagiaire.getId() + " id evaluation inside if");
        }

        System.out.println( evaluationStagiaire.getId() + " id evaluation fuera");

        for (Question q: questions) {
            q.setEvaluation(evaluationStagiaire);
            questionRepository.save(q);
            System.out.println(q);
        }

        return evaluationStagiaire;
    }


    private EvaluationStagiaire checkEvaluation (Long id) {
        Optional<Etudiant> etudiant = etudiantService.findEtudiantById(id);
        EvaluationStagiaire evaluationStagiaire;
        if (etudiant.isPresent()) {
            evaluationStagiaire = etudiant.get().getEvaluationStagiaire();

            if (evaluationStagiaire == null) {
                evaluationStagiaire = new EvaluationStagiaire();
                evaluationStagiaireService.save(evaluationStagiaire);
                etudiant.get().setEvaluationStagiaire(evaluationStagiaire);
            }
        }
        return null;
    }


    private void setEvaluationToQuestions(List<Question> questions, EvaluationStagiaire evaluationStagiaire) {
        for (Question q: questions) {
            q.setEvaluation(evaluationStagiaire);
            questionRepository.save(q);
            System.out.println(q);
        }
    }


}
