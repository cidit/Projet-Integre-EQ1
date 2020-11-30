package com.equipe1.service;


import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
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
public class SchedulerServiceTest {

    @Autowired
    private SchedulerService schedulerService;

    @MockBean
    private SessionService sessionService;

    @MockBean
    private SessionRepository sessionRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    private Session session;

    @BeforeEach
    void setUp() {
        session = Session.builder()
                .id(1L)
                .nom("AUT-2020")
                .isCurrent(true)
                .build();
        sessionRepository.save(session);
    }

    @Test
    void testScheduleCreationSessionAutomne() {
        // Arrange
        Session newSession = Session.builder()
                .nom("HIV-2021")
                .isCurrent(true)
                .build();

        when(sessionService.findCurrentSession()).thenReturn(Optional.of(session));
        when(sessionService.create(newSession)).thenReturn(newSession);


        // Act
        Session s1 = schedulerService.scheduleCreationSession();
        // Assert
        Assertions.assertNotNull(s1);
        Assertions.assertEquals("HIV-2021", s1.getNom());

    }

}
