package com.equipe1.service;

import com.equipe1.model.Candidature;
import com.equipe1.model.Employeur;
import com.equipe1.repository.EmployeurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ContratServiceTest {



    @MockBean
    private CandidatureService candidatureService;


    @BeforeEach
    public void setUp() {


    }

    @Test
    public void getContrats() {
    }

    @Test
    void getContratById() {
    }

    @Test
    void saveContrat() {
    }

    @Test
    void findAll() {
    }

    @Test
    void getContratsByEmployeur() {
    }

    @Test
    void getContratsByEtudiantChoisi() {
    }

    @Test
    void createContrat() {
    }

    @Test
    void testCreateContrat() {
    }

    @Test
    void createApercueContrat() {
    }

    @Test
    void candidatureHasContrat() {
    }
}