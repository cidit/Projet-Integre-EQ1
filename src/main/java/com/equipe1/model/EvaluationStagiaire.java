package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class EvaluationStagiaire extends Evaluation{

    {
        this.type = "EvaluationStagiaire";
    }

    @ToString.Exclude
    @JsonIgnore
    @OneToOne(mappedBy = "evaluationStagiaire")
    private Etudiant etudiant;


}
