package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Stage;
import com.equipe1.repository.StageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.ArgumentMatchers.any;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class StageServiceTest {
    @Autowired
    private StageService stageService;
    @MockBean
    private StageRepository stageRepository;

    @MockBean
    private EmployeurService employeurService;

    private Stage s1;
    private Stage s2;
    Employeur employeur;

    @BeforeEach
    public void setUp() {
        s1 = new Stage();
        s1.setTitre("java");
        s2 = new Stage();
        s2.setTitre("c++");
        employeur = new Employeur();

    }

    @Test
    @DisplayName("getAll test")
    void testGetStages() {
        // Arrange
        doReturn(Arrays.asList(s1, s2)).when(stageRepository).findAll();
        // Act
        List<Stage> stages = stageService.getStages();
        // Assert
        Assertions.assertEquals(2, stages.size());
    }

    @Test
    @DisplayName("Successful findById test")
    void testFindStageById() {
        // Arrange
        doReturn(Optional.of(s1)).when(stageRepository).findById(1l);
        // Act
        Optional<Stage> stage = stageService.findStageById(1l);
        // Assert
        Assertions.assertTrue(stage.isPresent());
        Assertions.assertSame(stage.get(), s1);
    }

    @Test
    @DisplayName("Unsuccessful findById test")
    void testFindStageByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(stageRepository).findById(1l);
        // Act
        Optional<Stage> stage = stageService.findStageById(1l);
        // Assert
        Assertions.assertFalse(stage.isPresent());
    }

    @Test
    @DisplayName("saveStage test")
    void testSaveStage() {
        // Arrange
        doReturn(s1).when(stageRepository).save(any());
        // Act
        Stage stage = stageService.saveStage(s1);
        // Assert
        Assertions.assertNotNull(stage);
        Assertions.assertEquals(s1.getTitre(), stage.getTitre());
    }

    @Test
    @DisplayName("updateStage test")
    void testUpdateStage() {
        s1.setId(1l);
        s1.setTitre("Stage en programmation");
        s1.setProgramme("None");
        s1.setOuvert(false);
        s1.setNbAdmis(1);
        s1.setNbHeuresParSemaine(37.5f);
        s1.setDateLimiteCandidature(LocalDate.of(2021, 1, 1));
        s1.setDateDebut(LocalDate.of(2021, 1, 20));
        s1.setDateFin(LocalDate.of(2021, 8, 20));
        s1.setExigences("Etre empathique");
        s1.setDescription("Ceci un stage en java");
        //s1.setEmployeur(new Employeur("None", "None", "None"));
        doReturn(s1).when(stageRepository).save(any());
        Stage stage = stageRepository.save(s1);
        Stage stageUpdate;
        stageUpdate = s1;
        stageUpdate.setProgramme("Informatique");
        stageUpdate.setOuvert(true);
        stageUpdate.setNbAdmis(2);
        stageUpdate.setNbHeuresParSemaine(35f);
        stageUpdate.setDateLimiteCandidature(LocalDate.of(2021, 1, 2));
        stageUpdate.setDateDebut(LocalDate.of(2021, 1, 21));
        stageUpdate.setDateFin(LocalDate.of(2021, 8, 21));
        stageUpdate.setExigences("Etre en 3eme annee de DEC");
        stageUpdate.setDescription("Ceci un stage en java pour les etudiants en 3eme annee de DEC");
        //stageUpdate.setEmployeur(new Employeur("NB", "111-222-3333", "Montreal, QC"));
        doReturn(stageUpdate).when(stageRepository).save(any());
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        Stage updatedStage = stageService.updateStage(stageUpdate, stage.getId());
        // Assert
        Assertions.assertNotNull(updatedStage);
        Assertions.assertEquals(1l, updatedStage.getId());
        Assertions.assertEquals("Stage en programmation", updatedStage.getTitre());
        Assertions.assertEquals("Informatique", updatedStage.getProgramme());
        Assertions.assertEquals(true, updatedStage.isOuvert());
        Assertions.assertEquals("Ceci un stage en java pour les etudiants en 3eme annee de DEC", updatedStage.getDescription());
        Assertions.assertEquals(2, updatedStage.getNbAdmis());
        Assertions.assertEquals(35f, updatedStage.getNbHeuresParSemaine());
        Assertions.assertEquals("Etre en 3eme annee de DEC", updatedStage.getExigences());
        Assertions.assertEquals(LocalDate.of(2021, 1, 2), updatedStage.getDateLimiteCandidature());
        Assertions.assertEquals(LocalDate.of(2021, 1, 21), updatedStage.getDateDebut());
        Assertions.assertEquals(LocalDate.of(2021, 8, 21), updatedStage.getDateFin());
        //Assertions.assertEquals(new Employeur("NB", "111-222-3333", "Montreal, QC"), updatedStage.getEmployeur());
    }

    @Test
    @DisplayName("Successful getStagesByEmployeur")
    void getStagesByEmployeurTest() {
        // Arrange
        when(employeurService.getEmployeurById(1L)).thenReturn(employeur);
        when(stageRepository.findAll()).thenReturn(Arrays.asList(s1,s2));
        // Act
        List<Stage> stages = stageService.getStagesByEmployeur(1L);
        // Assert
        Assertions.assertEquals(2, stages.size());
    }

}
