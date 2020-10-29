package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CVRepository;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EtudiantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.Mockito.*;
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class CourrielServiceTest {

    @Autowired
    private CourrielService courrielService;

    @MockBean
    private CVRepository cvRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    @MockBean
    private CandidatureRepository candidatureRepository;

    private Courriel mail;
    private Etudiant etudiant;
    private CV cv1;
    private CV cv2;
    private Candidature candidature;
    @BeforeEach
    public void setUp() {
        mail = new Courriel();
        mail.setEmetteur("GestionStageEq1@gmail.co");
        mail.setDestinataire("carlos@gmail.com");
        mail.setSujet("test");
        mail.setContenu("We show how to write Integration Tests using Spring and GreenMail.");

        cv1 = new CV();
        cv1.setStatus(CV.CVStatus.APPROVED);
        when(cvRepository.save(cv1)).thenReturn(cv1);

        cv2 = new CV();
        cv2.setStatus(CV.CVStatus.APPROVED);
        when(cvRepository.save(cv2)).thenReturn(cv2);

        etudiant = new Etudiant();
        etudiant.setCv(cv1);
        etudiant.setPrenom("prenom");
        etudiant.setNom("nom");
        etudiant.setEmail("test@test.com");
        when(etudiantRepository.save(etudiant)).thenReturn(etudiant);

        candidature = new Candidature();
        candidature.setEtudiant(etudiant);
        candidature.setStage(new Stage());
        candidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        when(candidatureRepository.save(candidature)).thenReturn(candidature);

    }

    @Test
    public void sendSimpleMessageTest() throws Exception {
        courrielService.sendSimpleMessage(mail,"test");

        CourrielService courriel = mock(CourrielService.class);
        courriel.sendSimpleMessage(mail, "test");
        verify( courriel, times(1)).sendSimpleMessage(mail,"test");
    }

    @Test
    public void sendMailCVApprovalTest() throws Exception {
        courrielService.sendMailCVApproval(etudiant);

        CourrielService courriel = mock(CourrielService.class);

        courriel.sendMailCVApproval(etudiant);
        verify( courriel, times(1)).sendMailCVApproval(etudiant);

        etudiant.setCv(cv2);
        courriel.sendMailCVApproval(etudiant);
        verify( courriel, times(2)).sendMailCVApproval(etudiant);
    }

    @Test
    public void sendCandidatureStatusUpdate() throws Exception {
        courrielService.sendCandidatureStatusUpdate(candidature);
        CourrielService courriel = mock(CourrielService.class);
        courriel.sendCandidatureStatusUpdate(candidature);
        verify( courriel, times(1)).sendCandidatureStatusUpdate(candidature);

    }
}