package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends User {

    private String programme;

    private String adresse;

    private String statutStage;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] cv;
}
