package com.equipe1.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Etudiant {

    @Id
    @GeneratedValue()
    private Long id;

    private String matricule;

    private String password;

    private String nom;

    private String prenom;

    private String programme;

    private String email;

    private String telephone;

    private String adresse;

    private String statutStage;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] cv;

    //private Stage stage;

}
