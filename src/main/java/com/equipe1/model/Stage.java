package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class Stage {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name= "employeur")
    @JsonBackReference
    private Employeur employeur;
}
