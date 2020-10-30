package com.equipe1.model;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;
    @ManyToOne
    private Etudiant etudiant;
    @OneToOne
    private Stage stage;
    private String statut;

    public Candidature(Etudiant etudiant, Stage stage, String statut) {
        this.etudiant = etudiant;
        this.stage = stage;
        this.statut = statut;
    }
}
