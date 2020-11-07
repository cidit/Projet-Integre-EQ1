package com.equipe1.service;

import com.equipe1.model.Evaluation;
import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.model.Question;
import com.equipe1.repository.EvaluationStagiaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Arrays;

@Service
public class EvaluationStagiaireService {

    @Autowired
    private EvaluationStagiaireRepository evaluationStagiaireRepository;

    public EvaluationStagiaire getEvaluationById(Long idEvaluation) {
        return (EvaluationStagiaire) evaluationStagiaireRepository.findById(idEvaluation)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid evaluation id %s",idEvaluation)));
    }

    public EvaluationStagiaire save(EvaluationStagiaire e) {
        return evaluationStagiaireRepository.save(e);
    }
}
