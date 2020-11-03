package com.equipe1.service;

import com.equipe1.model.*;
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

    @MockBean
    private CandidatureRepository candidatureRepository;
    @MockBean
    private ContratRepository contratRepository;
    @MockBean
    private EmployeurRepository employeurRepository;
    @MockBean
    private GenerateurPdfService generateurPdfService;

    private Candidature candidature1;
    private Candidature candidature2;
    private Contrat contrat1;
    private Contrat contrat2;
    private Employeur employeur;
    private Etudiant etudiant;
    private ByteArrayOutputStream fileByteArray;
    private byte [] file;
    private Stage stage;

    @BeforeEach
    public void setUp() {
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
}