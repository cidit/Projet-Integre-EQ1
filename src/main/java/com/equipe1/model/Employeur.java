package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employeur extends User {

    {
        this.role = "Employeur";
    }

    @NotBlank
    private String adresse;

    @NotBlank
    private String nomEntreprise;

    public Employeur(String nomEntreprise, String telephone, String adresse) {
        this.nomEntreprise = nomEntreprise;
        this.telephone = telephone;
        this.adresse = adresse;
    }

}
