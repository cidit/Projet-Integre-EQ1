package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employeur extends User{

    {
        this.desc = "Employeur";
    }
    private String adresse;


    private String nom;

    public Employeur(String nom, String telephone, String adresse) {

        this.nom = nom;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
