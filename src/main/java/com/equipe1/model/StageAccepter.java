package com.equipe1.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class StageAccepter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private Etudiant etudiant;

    @OneToOne
    private Stage stage;

}
