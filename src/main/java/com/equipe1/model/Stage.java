package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Data
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String titre;



    @ManyToOne
    @JoinColumn(name = "employeur")
    @JsonBackReference
    private Employeur employeur;


    private String description;
    private String exigences;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private LocalDate dateLimiteCandidature;
    private float nbHeuresParSemaine;
    private int nbAdmis;
    private boolean isOuvert;
    private String programme;
    private String ville;

    public Stage() {
        this.isOuvert = true;

    }
  }
