package com.equipe1.service;
import com.equipe1.model.Candidature;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.model.Stage;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import com.equipe1.repository.StageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CandidatureServiceTest {

    @Autowired
    private CandidatureService candidatureService;

    @MockBean
    private CandidatureRepository candidatureRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    @MockBean
    private StageRepository stageRepository;

    @MockBean
    private SessionRepository sessionRepository;

    private Candidature c1;
    private Candidature c2;
    private Etudiant e1;
    private Etudiant e;
    private Stage s;
    private Candidature c;
    private Session session;

    @BeforeEach
    public void testSetUpCandidatures() {
        e1 = new Etudiant();
        e1.setId(2L);
        etudiantRepository.save(e1);
        c1 = new Candidature(e1, new Stage());
        c2 = new Candidature(new Etudiant(), new Stage());
        s = new Stage();
        e = new Etudiant();
        c = new Candidature();
        e.setId(3L);
        e.setPrenom("toto");
        e.setNom("toto");
        e.setMatricule("12345");
        e.setProgramme("Programme1");
        e.setAdresse("123 Rue Bidon");
        s.setId(4L);
        s.setTitre("TP");

        session = Session.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(6))
                .etudiants(new HashSet<>())
                .candidatures(new HashSet<>())
                .build();
        sessionRepository.save(session);
    }

    @Test
    public void testGetCandidatures() {
        Mockito.when(candidatureRepository.findAll()).thenReturn(Arrays.asList(c1, c2));
        List<Candidature> all = candidatureService.getCandidatures();
        Assertions.assertEquals(2, all.size());
    }

    @Test
    public void testGetCandidaturesById() {
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        Candidature candidature = candidatureService.findCandidatureById(1L).get();
        assertEquals(candidature, c1);
    }

    @Test
    public void testSaveCandidature() {
        // Arrange
        doReturn(s).when(stageRepository).save(any());
        doReturn(e).when(etudiantRepository).save(any());
        Stage stage = stageRepository.save(s);
        Etudiant etudiant = etudiantRepository.save(e);
        doReturn(Optional.of(s)).when(stageRepository).findById(s.getId());
        doReturn(Optional.of(e)).when(etudiantRepository).findById(e.getId());
        doReturn(c).when(candidatureRepository).save(any());
        // Act
        Candidature candidature = candidatureService.createCandidature(e.getId(), s.getId());
        // Assert
        Assertions.assertNotNull(candidature);
        Assertions.assertEquals(candidature.getEtudiant(), etudiant);
        Assertions.assertEquals(candidature.getStage(), stage);

    }

    @Test
    public void testFindCandidatureByEtudiant(){
        // Arrange
        List<Candidature> candidatureList = new ArrayList<>();
        doReturn(s).when(stageRepository).save(any());
        doReturn(e).when(etudiantRepository).save(any());
        doReturn(Optional.of(s)).when(stageRepository).findById(s.getId());
        doReturn(Optional.of(e)).when(etudiantRepository).findById(e.getId());
        c = candidatureService.createCandidature(e.getId(), s.getId());
        doReturn(c).when(candidatureRepository).save(any());
        candidatureList.add(c);
        Stage stage = stageRepository.save(s);
        Etudiant etudiant = etudiantRepository.save(e);
        doReturn(candidatureList).when(candidatureRepository).findAll();
        // Act
        List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(etudiant.getId());
        // Assert
        Assertions.assertNotNull(candidatures);
        Assertions.assertEquals(candidatures.size(), 1);
        Assertions.assertEquals(candidatures.get(0).getStage(), stage);
    }
    @Test
    public void testFindCandidatureByStage(){
        // Arrange
        List<Candidature> candidatureList = new ArrayList<>();
        doReturn(s).when(stageRepository).save(any());
        doReturn(e).when(etudiantRepository).save(any());
        doReturn(Optional.of(s)).when(stageRepository).findById(s.getId());
        doReturn(Optional.of(e)).when(etudiantRepository).findById(e.getId());
        c = candidatureService.createCandidature(e.getId(), s.getId());
        doReturn(c).when(candidatureRepository).save(any());
        candidatureList.add(c);
        Stage stage = stageRepository.save(s);
        doReturn(candidatureList).when(candidatureRepository).findAll();
        // Act
        List<Candidature> candidatures = candidatureService.findCandidatureByStage(stage.getId());
        // Assert
        Assertions.assertNotNull(candidatures);
        Assertions.assertEquals(candidatures.size(), 1);
        Assertions.assertEquals(candidatures.get(0).getStage(), stage);
    }

    @Test
    public void testUpdateCandidatureApprouve() throws Exception {
        c1.setId(1L);
        when(candidatureRepository.save(c1)).thenReturn(c1);
        candidatureRepository.save(c1);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        when(candidatureRepository.save(c2)).thenReturn(c2);
        Candidature c3 = candidatureService.updateCandidatureApprouve(c2.getId());
        // Assert
        assertEquals(c3.getStatut(), Candidature.CandidatureStatut.APPROUVE);
    }

    @Test
    public void testUpdateCandidatureChoisi() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findCurrentAccordingTo(LocalDate.now())).thenReturn(Optional.of(session));
        c1.setId(1L);
        when(candidatureRepository.save(c1)).thenReturn(c1);
        candidatureRepository.save(c1);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        when(candidatureRepository.save(c2)).thenReturn(c2);
        // Act
        Candidature candidature = candidatureService.updateCandidatureChoisi(1L);
        // Assert
        assertEquals(candidature.getStatut(), Candidature.CandidatureStatut.CHOISI);
    }

    @Test
    public void testGetCandidatureChoisiValid() {
        // Arrange
        doReturn(s).when(stageRepository).save(any());
        doReturn(e).when(etudiantRepository).save(any());
        doReturn(Optional.of(s)).when(stageRepository).findById(s.getId());
        doReturn(Optional.of(e)).when(etudiantRepository).findById(e.getId());
        doReturn(Optional.of(c)).when(candidatureRepository).findById(c.getId());
        doReturn(c).when(candidatureRepository).save(any());

        c.setStatut(Candidature.CandidatureStatut.CHOISI);
        c.setEtudiant(e);
        candidatureRepository.save(c);
        session.getEtudiants().add(e);
        session.getCandidatures().add(c);
        when(sessionRepository.save(session)).thenReturn(session);
        sessionRepository.save(session);
        when(sessionRepository.findCurrentAccordingTo(LocalDate.now())).thenReturn(Optional.of(session));

        Candidature candidature = candidatureService.createCandidature(e.getId(), s.getId());
        Candidature candidatureUpdated = candidatureService.updateCandidatureChoisi(candidature.getId());
        // Act
        Optional<Candidature> optionalCandidature = candidatureService.getCandidatureChoisi(e.getId());
        // Assert
        assertEquals(candidatureUpdated.getStatut(), Candidature.CandidatureStatut.CHOISI);
        assertTrue(optionalCandidature.isPresent());
        assertEquals(optionalCandidature.get().getStatut(), Candidature.CandidatureStatut.CHOISI);
    }

    @Test
    public void testGetCandidatureChoisiInvalid() {
        // Arrange
        doReturn(e).when(etudiantRepository).save(any());
        Etudiant etudiant = etudiantRepository.save(e);
        // Act
        Optional<Candidature> optionalCandidature = candidatureService.getCandidatureChoisi(etudiant.getId());
        // Assert
        assertFalse(optionalCandidature.isPresent());
    }
}
