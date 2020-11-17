package com.equipe1.repository;

import com.equipe1.model.EvaluationMilieuStage;
import com.equipe1.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvaluationMilieuStageRepository extends JpaRepository<EvaluationMilieuStage, Long> {

}
