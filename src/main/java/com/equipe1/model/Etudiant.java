package com.equipe1.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends User {

    {
        this.role = "Etudiant";
    }

    @NotBlank
    private String prenom;

    @NotBlank
    private String matricule;

    @NotBlank
    private String programme;

    @NotBlank
    private String adresse;

    private String statutStage;

    @OneToOne
    private CV cv;

    @ToString.Exclude
    @OneToOne
    private EvaluationStagiaire evaluationStagiaire;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Session> session;

    private boolean isEnregistre;

}
