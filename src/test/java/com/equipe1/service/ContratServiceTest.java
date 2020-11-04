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
import java.time.LocalDate;
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
    private CandidatureService candidatureService;
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

    private Stage s;
    private Employeur user;


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


        s = new Stage();
        s.setNbAdmis(2);
        s.setProgramme("Tecnique informatique");
        s.setExigences("exigences");
        s.setVille("montreal");
        s.setDateDebut(LocalDate.of(2020, 10, 1));
        s.setDateFin(LocalDate.of(2020, 10, 31));

        user = new Employeur();
        user.setNom("carlos");
        user.setEmail("carlos.arturo@gmail");
        user.setTelephone("4444444444");
        user.setAdresse("adres12345");

        etudiant = new Etudiant();
        etudiant.setNom("Colomb");
        etudiant.setPrenom("Christophe");
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

        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature1));
        when(contratRepository.findByCandidature(candidature1)).thenReturn(Optional.of(contrat1));
        when(contratRepository.save(contrat1)).thenReturn(contrat1);



        Contrat contrat = contratService.createContrat(result,1L);
        assertEquals(contrat, contrat1);
        assertNotNull(contrat);
    }

    @Test
    void createContratEtDocument() throws Exception {
        stage.setEmployeur(user);
        candidature1.setStage(s);
        candidature1.setEtudiant(etudiant);
        candidature1.setContrat(contrat1);

        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature1));
        when(contratRepository.findByCandidature(candidature1)).thenReturn(Optional.of(contrat1));
        when(employeurRepository.findEmployeurByEmail("carlos.arturo@gmail")).thenReturn(user);
        when(generateurPdfService.createPdf(candidature1.getStage()
                ,candidature1.getStage().getEmployeur()
                ,candidature1.getEtudiant())).thenReturn(fileByteArray);;
        when(contratService.createContratEtDocument(1L)).thenReturn(contrat1);

        Contrat contrat = contratService.createContratEtDocument(1L);

        assertNotNull(contrat);
        assertEquals(contrat, contrat1);
    }

    @Test
    void createApercueContrat() throws Exception {
        stage.setEmployeur(employeur);
        candidature1.setEtudiant(etudiant);
        candidature1.setContrat(contrat1);
        candidature1.setStage(stage);

        when(generateurPdfService.createPdf(stage,employeur,etudiant)).thenReturn(fileByteArray);
        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature1));
        ByteArrayOutputStream apercue =  contratService.createApercueContrat(1L);

        assertEquals(apercue,fileByteArray);
    }

    @Test
    void candidatureHasContrat() {
       contrat1.setCandidature(candidature1);
       contrat2.setCandidature(candidature2);
        when(candidatureService.findCandidatureById(1L)).thenReturn(Optional.of(candidature1));
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