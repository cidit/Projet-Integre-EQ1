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
    @OneToOne
    private Candidature candidature;
    @ManyToOne(fetch = FetchType.LAZY)
    private Employeur employeur;
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] documentContrat;
    private LocalDate dateGeneration;
    private LocalDate dateFinale;
    private SignatureEtat signatureAdmin;
    private SignatureEtat signatureEmployeur;
    private SignatureEtat signatureEtudiant;

    public enum SignatureEtat {
        SIGNE,
        PAS_SIGNE,
        EN_ATTENTE
    }
    public Contrat() {
        this.signatureAdmin= SignatureEtat.PAS_SIGNE;
        this.signatureEmployeur= SignatureEtat.PAS_SIGNE;
        this.signatureEtudiant= SignatureEtat.PAS_SIGNE;
        this.dateGeneration = LocalDate.now();
    }
}