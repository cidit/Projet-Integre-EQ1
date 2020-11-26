package com.equipe1.controller;

import com.equipe1.model.EvaluationMilieuStage;
import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.service.EvaluationMilieuStageService;
import com.equipe1.model.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationMilieuStage")
public class EvaluationMilieuStageController {

    @Autowired
    EvaluationMilieuStageService evaluationMilieuStageService;

    @GetMapping("getByEnseignant/{id}")
    public List<EvaluationMilieuStage> getEvaluationStagiaireByEmployeurid (@PathVariable Long id){
        return evaluationMilieuStageService.getAllByEnseignant(id);
    }

    @PutMapping("/newEvaluation/{idCandidature}/{idEnseignant}")
    public EvaluationMilieuStage putEvaluation(@RequestBody RecepteurDonneesEvaluation evaluation,
                                               @PathVariable Long idCandidature, @PathVariable Long idEnseignant){
        return evaluationMilieuStageService.saveEvaluation(evaluation,idCandidature, idEnseignant);

    }

}
