package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends User {

    {
        this.desc = "Etudiant";
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

    private boolean enregistre;

    //@ManyToOne
   // private Evaluation evaluation;
}
