package com.equipe1.service;
import com.equipe1.model.*;
import com.equipe1.repository.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
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
    @MockBean
    private EmployeurRepository employeurRepository;

    private Candidature c1;
    private Candidature c2;
    private Etudiant e1;
    private Etudiant e;
    private Stage s;
    private Candidature c;
    private Session session;
    private Employeur employeur;

    @BeforeEach
    public void testSetUpCandidatures() {
        e1 = new Etudiant();
        e1.setId(2L);
        e1.setEmail("richard@email.com");
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
                .id(1L)
                .nom("AUT-2020")
                .dateDebut(LocalDate.now())
                .build();
        sessionRepository.save(session);

        employeur= new Employeur();
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
        Session session = sessionRepository.findCurrentSession().get();
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
        List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(etudiant.getId(), session.getId());
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
        Candidature c3 = candidatureService.updateCandidatureApprouve(c1.getId());
        // Assert
        assertEquals(c3.getStatut(), Candidature.CandidatureStatut.APPROUVE);
    }

    @Test
    public void testUpdateCandidatureChoisi() {
        // Arrange
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
        c1.setId(1L);
        when(candidatureRepository.save(c1)).thenReturn(c1);
        candidatureRepository.save(c1);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        when(candidatureRepository.save(c2)).thenReturn(c2);
        doReturn(Arrays.asList(c1)).when(candidatureRepository).findAll();

        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));

        List<Session> list = new ArrayList<>();
        list.add(session);

        e1.setSession(list);
        doReturn(e1).when(etudiantRepository).save(e1);
        doReturn(Optional.of(e1)).when(etudiantRepository).findById(e1.getId());
        doReturn(e1).when(etudiantRepository).save(any());
        etudiantRepository.save(e1);

        Candidature candidatureUpdated = candidatureService.updateCandidatureChoisi(c1.getId());
        // Act
        Optional<Candidature> optionalCandidature = candidatureService.getCandidatureChoisi(e1.getId());
        // Assert
        Assertions.assertTrue(optionalCandidature.isPresent());
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

    @Test
    public void getListByDateStage() {
        s.setDateDebut(LocalDate.of(2019,12,1));
        c1.setStage(s);
        when(candidatureRepository.findAll()).thenReturn(Arrays.asList(c1));

        List<Candidature> candidatures = candidatureService.getListByDateStage();
        Assertions.assertNotNull(candidatures);
        Assertions.assertEquals(candidatures.size(), 1);
    }

    public void testConvoqueEtudiantEntrevue() {
        // Arrange
        c1.setId(1L);
        when(candidatureRepository.save(c1)).thenReturn(c1);
        candidatureRepository.save(c1);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        when(candidatureRepository.save(c2)).thenReturn(c2);
        // Act
        Candidature candidature = candidatureService.convoqueEtudiantEntrevue(1L);
        // Assert
        assertEquals(candidature.getEntrevueStatut(), Candidature.CandidatureEntrevueStatut.CONVOQUE);
    }

    @Test
    public void testEntrevuePasseeConfirmation() {
        // Arrange
        c1.setId(1L);
        when(candidatureRepository.save(c1)).thenReturn(c1);
        candidatureRepository.save(c1);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        when(candidatureRepository.save(c2)).thenReturn(c2);
        // Act
        Candidature candidature = candidatureService.entrevuePasseeConfirmation(1L);
        // Assert
        assertEquals(candidature.getEntrevueStatut(), Candidature.CandidatureEntrevueStatut.PASSEE);
    }


    @Test
    void getListCandidatureByEmployeurToEvaluer() {
        Session session = sessionRepository.findCurrentSession().get();
        employeur.setId(1L);
        c1.setStatut(Candidature.CandidatureStatut.CHOISI);
        s.setDateFin(LocalDate.of(2020,11,01));
        s.setEmployeur(employeur);
        c1.setStage(s);

        when(candidatureRepository.findAll()).thenReturn(Arrays.asList(c1));
        when(candidatureService.getListCandidaturesChoisis(Candidature.CandidatureStatut.CHOISI)).thenReturn(Arrays.asList(c1));

        List<Candidature> candidatures = candidatureService.getListCandidatureByEmployeurToEvaluer(employeur.getId(), session.getId());
        Assertions.assertNotNull(candidatures);
        Assertions.assertEquals(candidatures.size(), 1);

        c1.setEvaluee(true);
        List<Candidature> candidatures2 = candidatureService.getListCandidatureByEmployeurToEvaluer(employeur.getId(), session.getId());
        Assertions.assertEquals(candidatures2.size(), 0);

    }
}
