package com.equipe1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
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

    @JsonBackReference
    //@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="employeur")
    private Set<Stage> stages= new HashSet<>();
    private String nomEntreprise;
    public Employeur(String nomEntreprise, String telephone, String adresse) {
        this.nomEntreprise = nomEntreprise;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
