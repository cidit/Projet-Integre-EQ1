package com.equipe1.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@EqualsAndHashCode(exclude="etudiant")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class EvaluationStagiaire extends Evaluation{

    {
        this.type = "EvaluationStagiaire";
    }

    @OneToOne
    private Etudiant etudiant;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "employeur_id")
    private Employeur employeur;

}
