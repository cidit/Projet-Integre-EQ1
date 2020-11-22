package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;
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
    private StageStatus statut;
    private int salaire;
    @ManyToOne(fetch = FetchType.LAZY)
    private Session session;

    @ManyToMany
    private Set<Etudiant> etudiantsAdmits;

    //@OneToMany(mappedBy = "stage")
    //private Set<Etudiant> etudiant;

    public Stage() {
        this.isOuvert = false;
        this.statut = StageStatus.EN_ATTENTE;
    }

    public enum StageStatus {
        EN_ATTENTE, APPROUVÉ, REFUSÉ
    }

    @Override
    public String toString() {
        return "Stage{" +
                "id=" + id +
                ", titre='" + titre + '\'' +
                ", description='" + description + '\'' +
                ", exigences='" + exigences + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", dateLimiteCandidature=" + dateLimiteCandidature +
                ", nbHeuresParSemaine=" + nbHeuresParSemaine +
                ", nbAdmis=" + nbAdmis +
                ", isOuvert=" + isOuvert +
                ", programme='" + programme + '\'' +
                ", ville='" + ville + '\'' +
                ", statut=" + statut +
                ", salaire=" + salaire +
                '}';
    }
}
