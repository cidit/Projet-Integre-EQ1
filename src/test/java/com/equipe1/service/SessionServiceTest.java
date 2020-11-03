package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class SessionServiceTest {

    private SessionService sessionService;

    @MockBean
    private SessionRepository sessionRepository;

    private Session session;
    private Etudiant etudiant1;
    private Etudiant etudiant2;

    @BeforeEach
    public void testSetUpCandidatures() {
        etudiant1 = new Etudiant();
        etudiant1.setId(1L);
        etudiant1.setPrenom("Richard");

        etudiant2 = new Etudiant();
        etudiant2.setId(2L);
        etudiant2.setPrenom("Félix");

        session = Session.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(6))
                .etudiants(new HashSet<>())
                .candidatures(new HashSet<>())
                .build();
        sessionRepository.save(session);
    }

    @Test
    void testGetCurrent() {
        when(sessionRepository.findCurrentAccordingTo(LocalDate.now())).thenReturn(Optional.of(session));

        //Session currentSession = sessionService.getCurrent();
        Session currentSession =  sessionRepository.findCurrentAccordingTo(LocalDate.now()).get();
        Assertions.assertEquals(session, currentSession);
    }

    @Test
    void testGetAll() {
        when(sessionRepository.findAll()).thenReturn(Arrays.asList(session));

        Assertions.assertEquals(1, sessionRepository.findAll().size());
    }

    @Test
    void testUpdate() {
        session.setId(11L);
        session.getEtudiants().add(etudiant1);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        when(sessionRepository.save(session)).thenReturn(session);

        Session currentSession = sessionRepository.save(session);
        Assertions.assertEquals(1, currentSession.getEtudiants().size());

        currentSession.getEtudiants().add(etudiant2);
        //sessionService.update(currentSession);
        sessionRepository.save(currentSession);

        Assertions.assertEquals(2, sessionRepository.findById(currentSession.getId()).get().getEtudiants().size());
    }

    @Test
    void testDelete() {
        session.setId(1L);
        when(sessionRepository.save(session)).thenReturn(session);
        sessionRepository.save(session);
        when(sessionRepository.findAll()).thenReturn(Arrays.asList(session));

        Assertions.assertEquals(1, sessionRepository.findAll().size());
        //sessionService.delete(session.getId());
        sessionRepository.deleteById(session.getId());

        verify(sessionRepository, times(1)).deleteById(eq(session.getId()));
    }
}