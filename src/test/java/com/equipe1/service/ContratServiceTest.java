package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import com.sun.mail.iap.ByteArray;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ContratServiceTest {
    @Autowired
    private ContratService contratService;

    @MockBean
    private CandidatureRepository candidatureRepository;

    @MockBean
    private EtudiantRepository etudiantRepository;

    @MockBean
    private EmployeurRepository employeurRepository;

    @MockBean
    private StageRepository stageRepository;

    @MockBean
    private ContratRepository contratRepository;

    private Candidature c1;
    private Candidature c2;
    private Etudiant e1;
    private Etudiant e;
    private Stage s;
    private Candidature c;
    private Contrat contrat;
    private Employeur employeur;

    @BeforeEach
    public void testSetContrats() {
        e1 = new Etudiant();
        e1.setId(2L);
        etudiantRepository.save(e1);
        c1 = new Candidature(e1, new Stage());
        c2 = new Candidature(new Etudiant(), new Stage());
        s = new Stage();
        e = new Etudiant();
        e.setId(3L);
        e.setPrenom("toto");
        e.setNom("toto");
        e.setMatricule("12345");
        e.setProgramme("Programme1");
        e.setAdresse("123 Rue Bidon");
        e.setEmail("etudiant@gmail.com");
        c = new Candidature();
        contrat = new Contrat();
        employeur = new Employeur();
        employeur.setId(20L);
        employeur.setEmail("bidon@gmail.com");
        employeurRepository.save(employeur);


        s.setId(4L);
        s.setTitre("TP");
        stageRepository.save(s);
        c.setStage(s);
        c.setEtudiant(e);
        candidatureRepository.save(c);
        contrat.setId(1000L);
        contrat.setCandidature(c);
        contrat.setEmployeur(employeur);
        contrat.setDocumentContrat(new byte[10]);
        contratRepository.save(contrat);

    }

    @Test
    public void testUpdateStatutContratSignatureEmployeurValide() throws Exception {
        when(contratRepository.save(contrat)).thenReturn(contrat);
        when(contratRepository.findById(1000L)).thenReturn(Optional.of(contrat));
        contratService.updateStatutContrat("Employeur", Contrat.SignatureEtat.SIGNE, contrat.getId());
        assertEquals(contrat.getSignatureEmployeur(), Contrat.SignatureEtat.SIGNE);
    }

    @Test
    public void testUpdateStatutContratSignatureEmployeurInvalide() throws Exception {
        when(contratRepository.save(contrat)).thenReturn(contrat);
        when(contratRepository.findById(1000L)).thenReturn(Optional.of(contrat));
        contratService.updateStatutContrat("Employeur", Contrat.SignatureEtat.PAS_SIGNE, contrat.getId());
        assertEquals(contrat.getSignatureEmployeur(), Contrat.SignatureEtat.PAS_SIGNE);
    }

    @Test
    public void testUpdateStatutContratSignatureEtudiantValide() throws Exception {
        when(contratRepository.save(contrat)).thenReturn(contrat);
        when(contratRepository.findById(1000L)).thenReturn(Optional.of(contrat));
        contratService.updateStatutContrat("Etudiant", Contrat.SignatureEtat.SIGNE, contrat.getId());
        assertEquals(contrat.getSignatureEtudiant(), Contrat.SignatureEtat.SIGNE);
    }

    @Test
    public void testUpdateStatutContratSignatureEtudiantInvalide() throws Exception {
        when(contratRepository.save(contrat)).thenReturn(contrat);
        when(contratRepository.findById(1000L)).thenReturn(Optional.of(contrat));
        contratService.updateStatutContrat("Etudiant", Contrat.SignatureEtat.PAS_SIGNE, contrat.getId());
        assertEquals(contrat.getSignatureEtudiant(), Contrat.SignatureEtat.PAS_SIGNE);
    }

    @Test
    public void testUpdateContratEmployeur() throws IOException {
        byte[] contenu = new byte[11];
        when(contratRepository.save(contrat)).thenReturn(contrat);
        when(contratRepository.findById(1000L)).thenReturn(Optional.of(contrat));
        contratService.updateContrat(new MockMultipartFile("test", contenu), contrat.getId(), "Employeur");

        assertEquals(contrat.getDocumentContrat(), contenu);
        assertEquals(contrat.getSignatureEmployeur(), Contrat.SignatureEtat.EN_ATTENTE);
    }

    @Test
    public void testUpdateContratEtudiant() throws IOException {
        byte[] contenu = new byte[11];
        when(contratRepository.save(contrat)).thenReturn(contrat);
        when(contratRepository.findById(1000L)).thenReturn(Optional.of(contrat));
        contratService.updateContrat(new MockMultipartFile("test", contenu), contrat.getId(), "Etudiant");

        assertEquals(contrat.getDocumentContrat(), contenu);
        assertEquals(contrat.getSignatureEtudiant(), Contrat.SignatureEtat.EN_ATTENTE);
    }
}
