package com.equipe1.controller;

import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.service.EvaluationStagiaireService;
import com.equipe1.model.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("getByEmployeur/{id}")
    public List<EvaluationStagiaire> getEvaluationStagiaireByEmployeurid (@PathVariable Long id){
        return evaluationStagiaireService.getByEmployeurId(id);
    }

}
