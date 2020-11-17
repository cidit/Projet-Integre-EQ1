package com.equipe1.controller;

import com.equipe1.model.EvaluationMilieuStage;
import com.equipe1.service.EvaluationMilieuStageService;
import com.equipe1.service.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationMilieuStage")
public class EvaluationMilieuStageController {

    @Autowired
    EvaluationMilieuStageService evaluationMilieuStageService;

    @PutMapping("/newEvaluation/{idCandidature}")
    public EvaluationMilieuStage putEvaluation(@RequestBody RecepteurDonneesEvaluation evaluation,
                                               @PathVariable Long idCandidature){
        return evaluationMilieuStageService.saveEvaluation(evaluation,idCandidature);

    }

}
