package com.equipe1.controller;

import com.equipe1.model.*;
import com.equipe1.repository.QuestionRepository;
import com.equipe1.service.CommentaireService;
import com.equipe1.service.EtudiantService;
import com.equipe1.service.EvaluationStagiaireService;
import com.equipe1.service.RecepteurDonneesEvaluation;
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
    public EvaluationStagiaire updateEtudiant(@RequestBody RecepteurDonneesEvaluation evaluation,
                                              @PathVariable  Long id){
        return evaluationStagiaireService.saveEvaluation(evaluation,id);
    }

}
