package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;

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

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] cv;
}
