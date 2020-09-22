package com.equipe1.repository;

import com.equipe1.model.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeurRepository extends JpaRepository<Employeur, Long> {

    Employeur findEmployeurByEmail( String email);
}
