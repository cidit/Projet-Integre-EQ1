package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.model.StageAccepter;
import com.equipe1.repository.StageAccepterRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static org.mockito.Mockito.doReturn;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class StageAccepterServiceTest {

    @Autowired
    private StageAccepterService stageAccepterService;

    private Stage s1;
    private Employeur employeur;
    private Etudiant etudiant;

    @BeforeEach
    public void setUp() {
        employeur = new Employeur();
        employeur.setNom("employeur1");
        employeur.setEmail("employeur1@email.com");
        s1 = new Stage();
        s1.setTitre("java");
        s1.setStatut(Stage.StageStatus.APPROVED);
        s1.setEmployeur(employeur);
    }

    @Test
    void testSaveStageAccepter() {
        StageAccepter stageAccepter = stageAccepterService.saveStageAccepter(s1);
        Assertions.assertNotNull(stageAccepter);
        Assertions.assertEquals("java", stageAccepter.getTitre());
        Assertions.assertEquals("employeur1", stageAccepter.getNomEntreprise());
    }

}