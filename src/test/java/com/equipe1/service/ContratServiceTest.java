package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.*;
import com.sun.mail.iap.ByteArray;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.ContratRepository;
import com.equipe1.repository.EmployeurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ContratServiceTest {

    @Autowired
    private ContratService contratService;

    @Autowired
    private CandidatureService candidatureService;

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

    @MockBean
    private GenerateurPdfService generateurPdfService;

    private Candidature candidature1;
    private Candidature candidature2;
    private Contrat contrat1;
    private Contrat contrat2;
    private Etudiant etudiant;
    private ByteArrayOutputStream fileByteArray;
    private byte [] file;
    private Stage stage;

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
        candidature1 = new Candidature();
        candidature2 = new Candidature();
        contrat1 = new Contrat();
        contrat2 = new Contrat();
        employeur = new Employeur();
        etudiant = new Etudiant();
        file = new ByteArrayOutputStream().toByteArray();
        stage = new Stage();
        fileByteArray = new ByteArrayOutputStream();

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

    @Test
    public void getContratById() {
        when(contratRepository.findById(1L)).thenReturn(Optional.of(contrat1));
        Contrat contrat = contratService.getContratById(1L);
        System.out.println("inside");
        assertEquals(contrat, contrat1);
    }

    @Test
    public void saveContrat() {
        when(contratRepository.save(contrat1)).thenReturn(contrat1);
        Contrat contrat = contratService.saveContrat(contrat1);
        assertNotNull(contrat1);
        assertEquals(contrat, contrat1);
    }

    @Test
    public void findAll() {
        when(contratRepository.findAll()).thenReturn(Arrays.asList(contrat1, contrat2));
        List<Contrat> all = contratService.findAll();
        assertEquals(2, all.size());
    }

    @Test
    void getContratsByEmployeur() {
        when(contratRepository.findByEmployeur(employeur)).thenReturn(Arrays.asList(contrat1,contrat2));
        List<Contrat> all = contratService.getContratsByEmployeur(employeur);
        assertEquals(2, all.size());
        assertEquals(all.get(0),contrat1);
    }

    @Test
    void getContratsByEtudiantChoisi() {

        contrat1.setSignatureEmployeur(Contrat.SignatureEtat.SIGNE);
        contrat2.setSignatureEmployeur(Contrat.SignatureEtat.SIGNE);
        candidature1.setEtudiant(etudiant);
        candidature1.setContrat(contrat1);
        candidature2.setEtudiant(etudiant);
        candidature2.setContrat(contrat2);

        when(candidatureRepository.findAll()).thenReturn(Arrays.asList(candidature1,candidature2));

        List<Contrat> all = contratService.getContratsByEtudiantChoisi(etudiant);
        assertEquals(2, all.size());
        assertEquals(all.get(0),contrat1);
    }

    @Test
    void createContratAvecFile() throws IOException {
        MultipartFile result = new MockMultipartFile("test",file);

        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(candidature1));
        when(contratRepository.findByCandidature(candidature1)).thenReturn(Optional.of(contrat1));
        when(contratRepository.save(contrat1)).thenReturn(contrat1);

        Contrat contrat = contratService.createContrat(result,1L);
        assertEquals(contrat, contrat1);
        assertNotNull(contrat);
    }

    @Test
    void createContratEtDocument() throws Exception {
        /*stage.setEmployeur(employeur);
        candidature1.setStage(stage);
        candidature1.setEtudiant(etudiant);
        when(contratRepository.save(contrat1)).thenReturn(contrat1);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(candidature1));
        when(generateurPdfService.createPdf(stage,employeur,etudiant)).thenReturn(fileByteArray);;

        Contrat contrat = contratService.createContratEtDocument(1L);

        when(contratRepository.findById(3l)).thenReturn(Optional.ofNullable(contrat));

        //when(contratRepository.save(contrat)).thenReturn(contrat1);
        //System.out.println(contrat1 + "desde contract");
        //assertEquals(contrat, contrat1);
        //assertNotNull(contrat);*/

        stage.setEmployeur(employeur);
        candidature1.setStage(stage);
        candidature1.setEtudiant(etudiant);
        when(generateurPdfService.createPdf(stage,employeur,etudiant)).thenReturn(fileByteArray);;
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(candidature1));
        when(contratRepository.findByCandidature(candidature1)).thenReturn(Optional.of(contrat1));
        when(contratRepository.save(contrat1)).thenReturn(contrat1);

        Contrat contrat = contratService.createContratEtDocument(1L);
        when(contratRepository.save(contrat)).thenReturn(contrat1);
        assertEquals(contrat.getCandidature(), candidature1);
    }

    @Test
    void createApercueContrat() throws Exception {
        stage.setEmployeur(employeur);
        candidature1.setEtudiant(etudiant);
        candidature1.setContrat(contrat1);
        candidature1.setStage(stage);
        when(generateurPdfService.createPdf(stage,employeur,etudiant)).thenReturn(fileByteArray);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(candidature1));
        ByteArrayOutputStream apercue =  contratService.createApercueContrat(1L);

        assertEquals(apercue,fileByteArray);
    }

    @Test
    void candidatureHasContrat() {
        contrat1.setCandidature(candidature1);
        contrat2.setCandidature(candidature2);
        when(candidatureRepository.findById(1L)).thenReturn(Optional.of(candidature1));
        when(contratRepository.findAll()).thenReturn(Arrays.asList(contrat2, contrat1));
        boolean hascontrat = contratService.candidatureHasContrat(1L);
        assertTrue(hascontrat);
    }

    @Test
    public void listCandidatureSansContrat() {
        when(candidatureService.getListCandidaturesChoisis(Candidature.CandidatureStatut.CHOISI))
                .thenReturn(Arrays.asList(candidature2,candidature1));

        List<Candidature> all = contratService.listCandidatureSansContrat();
        assertEquals(2, all.size());
        assertEquals(all.get(0),candidature2);
    }
}



