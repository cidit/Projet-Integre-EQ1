package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Contrat {
    @Id
    private Long id;

    @OneToOne
    private Stage stage;

    @OneToOne
    private Etudiant etudiant;

    @ManyToOne(fetch = FetchType.LAZY)
    private Employeur employeur;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] contrat;
    private LocalDate dateGeneration;
    private LocalDate dateFinale;
    private boolean signatureAdmin;
    private boolean signatureEmployeur;
    private boolean signatureEtudiant;

}
