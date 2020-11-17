package com.equipe1.controller;

import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.repository.QuestionRepository;
import com.equipe1.service.CommentaireService;
import com.equipe1.service.EtudiantService;
import com.equipe1.service.EvaluationStagiaireService;
import com.equipe1.service.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationStagiaire")
public class EvaluationStagiaireController {

    @Autowired
    private EvaluationStagiaireService evaluationStagiaireService;

    @GetMapping("findById/{idEvaluation}")
    public EvaluationStagiaire getEvaluationStagiaireByid (Long idEvaluation){
        return evaluationStagiaireService.getEvaluationById(idEvaluation);
    }

    @PutMapping("/newEvaluation/{id}")
    public EvaluationStagiaire updateEtudiant(@RequestBody RecepteurDonneesEvaluation evaluation,
                                              @PathVariable  Long id){
        return evaluationStagiaireService.saveEvaluation(evaluation,id);
    }

}
