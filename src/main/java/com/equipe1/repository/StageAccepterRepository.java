package com.equipe1.repository;

import com.equipe1.model.StageAccepter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageAccepterRepository extends JpaRepository<StageAccepter, Long> {
}
