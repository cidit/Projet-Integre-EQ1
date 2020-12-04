package com.equipe1.controller;

import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.service.EvaluationStagiaireService;
import com.equipe1.model.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationStagiaire")
public class EvaluationStagiaireController {

    @Autowired
    private EvaluationStagiaireService evaluationStagiaireService;

    @PutMapping("/newEvaluation/{id}")
    public EvaluationStagiaire updateEtudiant(@RequestBody RecepteurDonneesEvaluation evaluation,
                                              @PathVariable  Long id){
        return evaluationStagiaireService.saveEvaluation(evaluation,id);
    }

    @GetMapping("getByEmployeur/{id}")
    public List<EvaluationStagiaire> getEvaluationStagiaireByEmployeurId(@PathVariable Long id, @RequestParam("idSession") Long idSession){
        return evaluationStagiaireService.getByEmployeurId(id, idSession);
    }

}
