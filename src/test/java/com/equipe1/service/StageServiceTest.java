package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Candidature;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.StageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
    private NotificationCourrielService notificationCourrielService;
    @MockBean
    private StageRepository stageRepository;
    @MockBean
    private CandidatureService candidatureService;
    @MockBean
    private EmployeurRepository employeurRepository;
    @MockBean
    private EtudiantRepository etudiantRepository;
    private Stage s1;
    private Stage s2;

    @BeforeEach
    public void setUp() {
        s1 = new Stage();
        s1.setTitre("java");
        s2 = new Stage();
        s2.setTitre("c++");
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
    void testSaveStage() throws Exception {
        // Arrange
        doReturn(s1).when(stageRepository).save(any());
        // Act
        Stage stage = stageService.saveStage(s1);
        // Assert
        Assertions.assertNotNull(stage);
        Assertions.assertEquals(s1.getTitre(), stage.getTitre());
    }

    @Test
    @DisplayName("Successful updateStatus")
    void updateStatusTest() throws Exception {
        // Arrange
        when(stageRepository.save(s1)).thenReturn(s1);
        stageRepository.save(s1);
        when(stageRepository.findById(1L)).thenReturn(Optional.of(s1));
        // Act
        Stage stage = stageService.updateStatus(s1,1L);
        // Assert
        assertTrue(stage.isApprouve());
        assertTrue(stage.isOuvert());
    }

    @Test
    @DisplayName("Successful getStagesByEmployeur")
    void getStagesByEmployeurTest() {
        Employeur e = new Employeur();
        e.setId(3L);
        s1.setEmployeur(e);
        doReturn(e).when(employeurRepository).save(any());
        doReturn(Optional.of(e)).when(employeurRepository).findById(e.getId());
        doReturn(s1).when(stageRepository).save(any());
        // Arrange
        Mockito.when(stageRepository.findAll()).thenReturn(Arrays.asList(s1));
        // Act
        List<Stage> stages = stageService.getStagesByEmployeur(e.getId());
        // Assert
        Assertions.assertNotNull(stages);
        Assertions.assertEquals(stages.size(), 1);
        Assertions.assertEquals(stages.get(0), s1);
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
    }

    @Test
    public void getStagesEtudiantValide(){
        s1.setId(2L);
        s1.setApprouve(true);
        s1.setOuvert(true);
        doReturn(s1).when(stageRepository).save(s1);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Candidature c = new Candidature();
        c.setStage(new Stage());
        c.setEtudiant(e1);
        List<Candidature> candidatures = new ArrayList<>();
        candidatures.add(c);
        doReturn(candidatures).when(candidatureService).findCandidatureByEtudiant(e1.getId());
        Mockito.when(stageRepository.findAll()).thenReturn(Arrays.asList(s1));
        List<Stage> stageList = stageService.getStagesEtudiant(e1.getId());

        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(stageList.size(), 1);
        Assertions.assertEquals(stageList.get(0), s1);
    }

    @Test
    public void getStagesEtudiantInvalide(){
        s1.setId(2L);
        s1.setApprouve(true);
        s1.setOuvert(true);
        doReturn(s1).when(stageRepository).save(s1);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Candidature c = new Candidature();
        c.setStage(s1);
        c.setEtudiant(e1);
        List<Candidature> candidatures = new ArrayList<>();
        candidatures.add(c);
        doReturn(candidatures).when(candidatureService).findCandidatureByEtudiant(e1.getId());
        Mockito.when(stageRepository.findAll()).thenReturn(Arrays.asList(s1));
        List<Stage> stageList = stageService.getStagesEtudiant(e1.getId());

        Assertions.assertEquals(stageList.size(), 0);
    }

    @Test
    public void updateEtudiantsAdmits(){
        s1.setId(1L);
        s1.setApprouve(true);
        s1.setOuvert(true);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Etudiant e2 = new Etudiant();
        e2.setId(7L);
        Set<Etudiant> set = new HashSet<>();
        set.add(e1); set.add(e2);
        s1.setEtudiantsAdmits(set);
        doReturn(s1).when(stageRepository).save(s1);
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        // Act
        Stage stage = stageService.updateEtudiantsAdmits(s1.getId(), set);
        // Assert
        Assertions.assertNotNull(stage);
        Assertions.assertEquals(stage.getEtudiantsAdmits().size(), 2);
    }

    @Test
    public void getEtudiantsAdmitsByValideStageId(){
        s1.setId(1L);
        s1.setApprouve(true);
        s1.setOuvert(true);
        Etudiant e1 = new Etudiant();
        e1.setId(6L);
        Etudiant e2 = new Etudiant();
        e2.setId(7L);
        Set<Etudiant> set = new HashSet<>();
        set.add(e1); set.add(e2);
        s1.setEtudiantsAdmits(set);
        doReturn(s1).when(stageRepository).save(s1);
        doReturn(Optional.of(s1)).when(stageRepository).findById(s1.getId());
        // Act
        Set<Etudiant> stageList = stageService.getEtudiantsAdmits(s1.getId());
        // Assert
        Assertions.assertNotNull(stageList);
        Assertions.assertEquals(stageList.size(), 2);
    }

    @Test
    public void getEtudiantsAdmitsByInvalideStageId(){
        // Act
        Set<Etudiant> stageList = stageService.getEtudiantsAdmits(22L);
        // Assert
        Assertions.assertNull(stageList);
    }
}
