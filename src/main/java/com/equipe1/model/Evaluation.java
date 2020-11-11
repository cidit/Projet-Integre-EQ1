package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    @JsonIgnore
    @OneToMany(mappedBy = "evaluation")
    protected List<Question> questions;

    protected LocalDate dateCreation;

    //@ManyToOne
   //protected User responsable;

    protected String type;

    //@OneToOne
    //private Etudiant etudiant;

    public Evaluation() {
        this.dateCreation = LocalDate.now();
    }
}
