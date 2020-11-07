package com.equipe1.controller;

import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.service.EvaluationStagiaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
