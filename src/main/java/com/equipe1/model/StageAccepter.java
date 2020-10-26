package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class StageAccepter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    private String description;
    private String exigences;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private float nbHeuresParSemaine;
    private int nbAdmis;
    private String programme;
    private String ville;
    private int salaire;

    private String nomEntreprise;
    private String telephone;
    private String adresse;
}
