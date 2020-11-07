package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
public class EvaluationStagiaire extends Evaluation{

    {
        this.type = "EvaluationStagiaire";
    }


}
