package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.model.StageAccepter;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.StageAccepterRepository;
import com.equipe1.repository.StageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

import static org.mockito.Mockito.doReturn;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class StageAccepterServiceTest {

    @Autowired
    private StageAccepterService stageAccepterService;

    @MockBean
    private StageRepository stageRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    @MockBean
    private StageAccepterRepository stageAccepterRepository;

    private Stage s1;
    private Employeur employeur;
    private Etudiant etudiant;

    @BeforeEach
    public void setUp() {
        etudiant = new Etudiant();
        etudiant.setId(21L);
        employeur = new Employeur();
        employeur.setNom("employeur1");
        employeur.setEmail("employeur1@email.com");
        s1 = new Stage();
        s1.setId(20L);
        s1.setTitre("java");
        s1.setStatut(Stage.StageStatus.APPROVED);
        s1.setEmployeur(employeur);
        Set<Etudiant> set = new HashSet<>();
        set.add(etudiant);
        s1.setEtudiantsAdmits(set);
    }

    @Test
    void testGetAllStageAccepter() {
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        doReturn(Optional.of(etudiant)).when(etudiantRepository).findById(etudiant.getId());
        StageAccepter stageAccepter = stageAccepterService.saveStageAccepter(etudiant.getId(), s1.getId());
        doReturn(Arrays.asList(stageAccepter)).when(stageAccepterRepository).findAll();
        List<StageAccepter> list = stageAccepterService.getAllStageAccepter();
        // Assert
        Assertions.assertNotNull(stageAccepter);
        Assertions.assertEquals(1, list.size());
    }

    @Test
    void testSaveStageAccepter() {
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        doReturn(Optional.of(etudiant)).when(etudiantRepository).findById(etudiant.getId());
        StageAccepter stageAccepter = stageAccepterService.saveStageAccepter(etudiant.getId(), s1.getId());
        // Assert
        Assertions.assertNotNull(stageAccepter);
        Assertions.assertEquals("java", stageAccepter.getStage().getTitre());
        Assertions.assertEquals("employeur1", stageAccepter.getStage().getEmployeur().getNom());
    }

}