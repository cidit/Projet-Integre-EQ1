package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    /*@ManyToOne
    @JoinColumn(name = "employeur")
    @JsonBackReference
    private Employeur employeur;*/
    private String description;

    private String exigences;
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    private float nbHeuresParSemaine;
    private int nbAdmis;
    private boolean isOuvert;
    private Date dateLimiteCandidature;
    private String programme;
    public Stage (){

    }
    public Stage (String titre) {
        this.titre = titre;
    }

}
