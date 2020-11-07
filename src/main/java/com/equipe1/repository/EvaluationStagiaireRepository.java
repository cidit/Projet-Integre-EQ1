package com.equipe1.repository;

import com.equipe1.model.Evaluation;
import com.equipe1.model.EvaluationStagiaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EvaluationStagiaireRepository extends JpaRepository<EvaluationStagiaire, Long> {

}
