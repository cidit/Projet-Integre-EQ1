package com.equipe1.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Session {

    @Id
    private long id;

    private LocalDate startDate; //, endDate;

    @ManyToMany
    private Set<Etudiant> etudiants;

    @OneToMany
    private Set<Candidature> candidatures;

    private String nom;
}
