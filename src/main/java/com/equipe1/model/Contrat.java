package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne(mappedBy = "contrat")
    private Candidature candidature;

    @JsonIgnore
    @OneToOne(mappedBy = "contrat")
    private Etudiant etudiant;

    @ManyToOne(fetch = FetchType.LAZY)
    private Employeur employeur;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] documentContrat;
    private LocalDate dateGeneration;
    private LocalDate dateFinale;
    private boolean signatureAdmin;
    private boolean signatureEmployeur;
    private boolean signatureEtudiant;

    public Contrat() {
        dateGeneration = LocalDate.now();
    }
}
