package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
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

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Session> session;

    private boolean enregistre;
}
