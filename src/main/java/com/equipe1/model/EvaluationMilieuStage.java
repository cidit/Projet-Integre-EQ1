package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
public class EvaluationMilieuStage extends Evaluation {

    {
        this.type = "EvaluationMilieuStage";
    }

   // @OneToOne
    //private Etudiant etudiant;

   // @OneToOne
   // private Employeur employeur;


}
