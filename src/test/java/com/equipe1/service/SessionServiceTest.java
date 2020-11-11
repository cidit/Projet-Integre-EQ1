package com.equipe1.service;


import com.equipe1.model.Session;
import com.equipe1.repository.SessionRepository;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class SessionServiceTest {

    @Autowired
    private SessionService sessionService;

    @MockBean
    private SessionRepository sessionRepository;

    private Session session;

    @BeforeEach
    void setUp() {
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .dateDebut(LocalDate.now())
                .build();
        sessionRepository.save(session);
    }

    @Test
    void testGetAll() {
        // Arrange
        doReturn(Arrays.asList(session)).when(sessionRepository).findAll();
        // Act
        List<Session> sessions = sessionService.getAll();
        // Assert
        Assertions.assertEquals(1, sessions.size());
    }

    @Test
    void TesGetSessionByIdValid() {
        // Arrange
        doReturn(Optional.of(session)).when(sessionRepository).findById(1L);
        // Act
        Optional<Session> sessionFound = sessionService.getSessionById(1L);
        // Assert
        Assertions.assertTrue(sessionFound.isPresent());
        Assertions.assertSame(sessionFound.get(), session);
    }

    @Test
    void TesGetSessionByIdInalid() {
        // Arrange
        doReturn(Optional.empty()).when(sessionRepository).findById(2L);
        // Act
        Optional<Session> sessionNotFound = sessionService.getSessionById(2L);
        // Assert
        Assertions.assertFalse(sessionNotFound.isPresent());
    }

    @Test
    void testCreate() {
        // Arrange
        Session newSession = new Session();
        newSession.setNom("HIV-2021");
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionRepository.save(newSession)).thenReturn(newSession);
        // Act
        Session currentSession = sessionService.create(newSession);
        // Assert
        Assertions.assertNotNull(currentSession);
        Assertions.assertTrue(currentSession.isCurrent());
        Assertions.assertEquals("HIV-2021", currentSession.getNom());
    }

    @Test
    void testDelete() {
        // Arrange
        doReturn(Optional.of(session)).when(sessionRepository).findById(1L);
        // Act
        sessionService.delete(1L);
        //Assert
        Mockito.verify(sessionRepository, times(1))
                .deleteById(1L);
    }

    @Test
    void testFindCurrentSession() {
        // Arrange
        when(sessionRepository.findCurrentSession()).thenReturn(Optional.of(session));
        // Act
        Optional<Session> currentSession = sessionService.findCurrentSession();
        // Assert
        Assertions.assertTrue(currentSession.isPresent());
        Assertions.assertSame(currentSession.get(), session);
    }
}
