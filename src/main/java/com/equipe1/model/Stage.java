package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    @ManyToOne(fetch = FetchType.LAZY)
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
    private boolean isApprouve;

    @OneToOne(mappedBy = "stage")
    private Contrat contrat;

    @OneToMany
    private Set<Etudiant> etudiantsAdmits;

}
