package com.equipe1.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class Employeur {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String nom;
    @NotBlank
    private String telephone;
    @NotBlank
    private String adresse;
    //@OneToMany(cascade = CascadeType.ALL,mappedBy = "employeur")
    //private Set<Stage> stages = new HashSet<Stage>();

    public Employeur(String nom, String telephone, String adresse){
        this.nom = nom;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
