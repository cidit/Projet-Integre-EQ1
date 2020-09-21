package com.equipe1.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

    private boolean statutStage;

    //private Stage stage;

}
