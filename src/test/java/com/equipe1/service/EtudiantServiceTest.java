package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EtudiantServiceTest {

    @Autowired
    private EtudiantService service;

    @MockBean
    private CandidatureService candidatureService;

    @MockBean
    private EtudiantRepository repository;

    @MockBean
    private SessionRepository sessionRepository;

    private Session session;
    private Etudiant e1;
    private Etudiant e2;

    private Candidature c1;
    private Candidature c2;


    @BeforeEach
    public void setUp() {
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .dateDebut(LocalDate.now())
                .build();
        sessionRepository.save(session);
        List<Session> sessions = new ArrayList<>();
        sessions.add(session);
        e1 = new Etudiant();
        e1.setNom("toto");
        e1.setMatricule("12345");
        e1.setEmail("e1@email.com");
        e1.setProgramme("Techniques de l’informatique");
        e1.setSession(sessions);
        e2 = new Etudiant();
        e2.setNom("tata");
        e2.setMatricule("67890");
        e1.setEmail("e2@email.com");
        e1.setProgramme("Techniques de l’informatique");
        e2.setSession(sessions);

        c1 = new Candidature();
        c1.setStatut(Candidature.CandidatureStatut.EN_ATTENTE);
        c1.setEtudiant(e1);
    }

    @Test
    void testGetEtudiants() {
        // Arrange
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(e1, e2)).when(repository).findAll();
        // Act
        List<Etudiant> etudiants = service.getEtudiants(session.getId());
        // Assert
        Assertions.assertEquals(2, etudiants.size());
    }

    @Test
    void testFindEtudiantById() {
        // Arrange
        doReturn(Optional.of(e1)).when(repository).findById(1l);
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantById(1l);
        // Assert
        Assertions.assertTrue(etudiant.isPresent());
        Assertions.assertSame(etudiant.get(), e1);
    }

    @Test
    void testFindEtudiantByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findById(1l);
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantById(1l);
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
    }

    @Test
    void testSaveEtudiant() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        doReturn(e1).when(repository).save(any());
        // Act
        Etudiant etudiant = service.saveEtudiant(e1);
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertEquals(e1.getNom(), etudiant.getNom());
    }

    @Test
    void testUpdateEtudiant() {
        // Arrange + Act
        e1.setId(1l);
        e1.setProgramme("NONE");
        e1.setEmail("NONE");
        e1.setTelephone("NONE");
        e1.setAdresse("NONE");
        doReturn(e1).when(repository).save(any());
        Etudiant etudiant = repository.save(e1);

        Etudiant putContent = new Etudiant();
        putContent = e1;
        putContent.setProgramme("TI");
        putContent.setEmail("TI");
        putContent.setTelephone("TI");
        putContent.setAdresse("TI");
        doReturn(putContent).when(repository).save(any());
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        Etudiant updatedEtudiant = service.updateEtudiant(putContent, etudiant.getId());
        // Assert
        Assertions.assertNotNull(updatedEtudiant);
        Assertions.assertEquals(1l, updatedEtudiant.getId());
        Assertions.assertEquals(e1.getNom(), updatedEtudiant.getNom());
        Assertions.assertEquals("TI", updatedEtudiant.getProgramme());
        Assertions.assertEquals("TI", updatedEtudiant.getEmail());
        Assertions.assertEquals("TI", updatedEtudiant.getTelephone());
        Assertions.assertEquals("TI", updatedEtudiant.getAdresse());
    }

    @Test
    void testFindEtudiantByMatricule() {
        // Arrange
        doReturn(Optional.of(e1)).when(repository).findByMatricule("12345");
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantByMatricule("12345");
        // Assert
        Assertions.assertTrue(etudiant.isPresent());
        Assertions.assertSame(etudiant.get(), e1);
    }

    @Test
    void testFindEtudiantByMatriculeNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findByMatricule("X");
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantByMatricule("X");
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
    }

    @Test
    void testFindEtudiantByEmail() {
        // Arrange
        doReturn(e1).when(repository).findByEmail("e1@email.com");
        // Act
        Etudiant etudiant = service.getEtudiantByEmail("e1@email.com");
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertSame(etudiant, e1);
    }

    @Test
    void testFindEtudiantByEmailNotFound() {
        // Arrange
        doReturn(null).when(repository).findByEmail("no@email.com");
        // Act
        Etudiant etudiant = service.getEtudiantByEmail("no@email.com");
        // Assert
        Assertions.assertNull(etudiant);
    }

    @Test
    void testFindEtudiantByProgrammeFound() {
        // Arrange

        List<Session> list = new ArrayList<>();
        list.add(session);

        e1.setSession(list);
        doReturn(e1).when(repository).save(e1);
        repository.save(e1);

        e2.setSession(list);
        doReturn(e2).when(repository).save(e2);
        repository.save(e2);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(e1, e2)).when(repository).findAllByProgramme("Techniques de l’informatique");
        // Act
        List<Etudiant> etudiants = service.getEtudiantsByProgramme("Techniques de l’informatique", session.getId());
        // Assert
        Assertions.assertNotNull(etudiants);
        Assertions.assertEquals(2, etudiants.size());
    }

    @Test
    void testFindEtudiantByProgrammeNotFound() {
        // Arrange
        doReturn(null).when(repository).findAllByProgramme("RIEN");
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));

        // Act
        List<Etudiant> etudiants = service.getEtudiantsByProgramme("RIEN", session.getId());
        // Assert
        Assertions.assertNotNull(etudiants);
        Assertions.assertEquals(0, etudiants.size());
    }

    @Test
    void testRegisterEtudiant() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));

        List<Session> list = new ArrayList<>();
        list.add(session);

        e1.setId(1L);
        e1.setSession(list);
        doReturn(e1).when(repository).save(e1);
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        repository.save(e1);

        // Act
        Optional<Etudiant> optionalEtudiant = service.registerEtudiantSession(e1.getId());
        // Assert
        Assertions.assertTrue(optionalEtudiant.isPresent());
    }

    @Test
    void testIsEtudiantRegistered() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));

        List<Session> list = new ArrayList<>();
        list.add(session);

        e1.setId(1L);
        e1.setSession(list);
        doReturn(e1).when(repository).save(e1);
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        repository.save(e1);

        // Act
        boolean flag = service.isEtudiantRegistered(e1.getId());
        // Assert
        Assertions.assertTrue(flag);
    }

    @Test
    void testGetEtudiantsAucunStage(){
        //Arrange
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(Arrays.asList(e1, e2)).when(repository).findAll();
        doReturn(Arrays.asList(c1)).when(candidatureService).findCandidatureByEtudiant(e1.getId(), session.getId());

        //Act
        List<Etudiant> etudiants = service.getEtudiantsAucunStage(session.getId());

        //Assert
        assertNotNull(etudiants);
        assertEquals(etudiants.size(), 2);
        assertEquals(etudiants.get(0), e1);
        assertEquals(etudiants.get(1), e2);
    }

    @Test
    void testGetEtudiantsAucunCV() {
        // Arrange
        when(sessionRepository.save(session)).thenReturn(session);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));

        List<Session> list = new ArrayList<>();
        list.add(session);

        e1.setId(1L);
        e1.setSession(list);
        doReturn(e1).when(repository).save(e1);
        doReturn(Arrays.asList(e1)).when(repository).findAll();
        repository.save(e1);
        // Act
        List<Etudiant> etudiants = service.getEtudiantsAucunCV(session.getId());
        // Assert
        Assertions.assertEquals(1, etudiants.size());
    }

    @Test
    void testGetEtudiantsCVNonApprouve() {
        // Arrange
        List<Session> list = new ArrayList<>();
        list.add(session);

        e1.setId(1L);
        e1.setSession(list);
        e1.setCv(new CV());
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        doReturn(e1).when(repository).save(e1);
        doReturn(Arrays.asList(e1)).when(repository).findAll();
        repository.save(e1);
        // Act
        List<Etudiant> etudiants = service.getEtudiantsCVNonApprouve(session.getId());
        // Assert
        Assertions.assertEquals(1, etudiants.size());
    }

    @Test
    void testUpdateEtudiantPassword() {
        // Arrange + Act
        e1.setId(1l);
        e1.setPassword("12345");
        doReturn(e1).when(repository).save(any());
        Etudiant etudiant = repository.save(e1);

        Etudiant putContent = new Etudiant();
        putContent = e1;
        putContent.setPassword("totototo");
        doReturn(putContent).when(repository).save(any());
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        Etudiant updateEtudiant = service.updateEtudiantPassword(putContent, etudiant.getId());
        // Assert
        Assertions.assertNotNull(updateEtudiant);
        Assertions.assertEquals(1l, updateEtudiant.getId());
        Assertions.assertEquals(e1.getNom(), updateEtudiant.getNom());
        Assertions.assertEquals("totototo", updateEtudiant.getPassword());
    }
}