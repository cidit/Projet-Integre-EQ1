package com.equipe1.repository;

import com.equipe1.model.Contrat;
import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContratRepository extends JpaRepository<Contrat, Long> {

    List<Contrat> findByEmployeur(Employeur employeur);
    Contrat findByEtudiant(Etudiant etudiant);

}
