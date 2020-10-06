package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employeur extends User {

    {
        this.desc = "Employeur";
    }


    private String adresse;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "employeur")
    private Set<Stage> stages = new HashSet<Stage>();



    private String nomEntreprise;

    public Employeur(String nomEntreprise, String telephone, String adresse) {
        this.nomEntreprise = nomEntreprise;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
