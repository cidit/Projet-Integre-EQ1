package com.equipe1.service;

import com.equipe1.model.Candidature;
import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EtudiantRepository;
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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
    @Autowired
    private StageService stageService;
    @Autowired
    private EtudiantService etudiantService;
    @Autowired
    private StageRepository stageRepository;

    private Candidature c1;
    private Candidature c2;
    private Etudiant e1;
    @BeforeEach
    public void setUpCandidatures() {
        e1 = new Etudiant();
        e1.setId(2L);
        etudiantRepository.save(e1);
       c1 = new Candidature(e1, new Stage(), "En cours");
       c2 = new Candidature(new Etudiant(), new Stage(), "Admis");
    }

    @Test
    public void getCandidaturesTest() {
        Mockito.when(candidatureRepository.findAll()).thenReturn(Arrays.asList(c1, c2));
        List<Candidature> all = candidatureService.getCandidatures();
        Assertions.assertEquals(2, all.size());
    }

    @Test
    public void getCandidaturesByIdTest() {
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        Candidature candidature = candidatureService.findCandidatureById(1L).get();
        assertEquals(candidature, c1);
    }

    @Test
    public void saveCandidatureTest() {

        Stage s = new Stage();
        Etudiant e = new Etudiant();
        e.setId(3L);
        e.setPrenom("toto");
        e.setNom("toto");
        e.setMatricule("12345");
        e.setStatutStage("e1@email.com");
        e.setProgramme("Programme1");
        e.setAdresse("123 Rue Bidon");
        s.setId(4L);
        s.setTitre("TP");
        when(stageRepository.save(s)).thenReturn(s);
        when(etudiantRepository.save(e)).thenReturn(e);
        stageService.saveStage(s);
        etudiantService.saveEtudiant(e);
        when(etudiantRepository.findById(e.getId())).thenReturn(Optional.of(e));
        when(stageRepository.findById(s.getId())).thenReturn(Optional.of(s));
        Candidature c3 = new Candidature(e, s, "En cours");
        when(candidatureRepository.save(c3)).thenReturn(c3);
        Candidature candidature = candidatureService.createCandidature(c3.getEtudiant().getId(), c3.getStage().getId());
        System.out.println(c3.toString());
        assertNotNull(c3);
        assertEquals(candidature.getEtudiant(), c3.getEtudiant());
        assertEquals(candidature.getStage(), c3.getStage());
        assertEquals(candidature.getStatut(), c3.getStatut());
        /*
        // Arrange
        Stage s = new Stage();
        Etudiant e = new Etudiant();
        e.setId(3L);
        e.setPrenom("toto");
        e.setNom("toto");
        e.setMatricule("12345");
        e.setStatutStage("e1@email.com");
        e.setProgramme("Programme1");
        e.setAdresse("123 Rue Bidon");
        stageService.saveStage(s);
        etudiantService.saveEtudiant(e);
        doReturn(e).when(etudiantRepository).save(any());
        Candidature c3 = new Candidature(e1, s, "En cours");
        doReturn(c3).when(candidatureRepository).save(any());
        // Act
        Candidature candidature = candidatureService.createCandidature(c3.getEtudiant().getId(), c3.getStage().getId());
        // Assert
        Assertions.assertNotNull(candidature);
        Assertions.assertEquals(c1, s);
        */
    }

    @Test
    public void updateCandidature() {
        c1.setId(1L);
        when(candidatureRepository.save(c1)).thenReturn(c1);
        candidatureRepository.save(c1);
        //Candidature c3 = candidatureService.findCandidatureById(1L).get();
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(c1));
        when(candidatureRepository.save(c2)).thenReturn(c2);
        Candidature c3 = candidatureService.updateCandidature(c2, 1L);
        assertEquals(c3.getStatut(), "Admis");
    }

}
