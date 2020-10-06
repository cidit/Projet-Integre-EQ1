package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EtudiantServiceTest {

    @Autowired
    private EtudiantService service;

    @MockBean
    private EtudiantRepository repository;

    private Etudiant e1;
    private Etudiant e2;

    @BeforeEach
    public void setUp() {
        e1 = new Etudiant();
        e1.setNom("toto");
        e1.setMatricule("12345");
        e1.setStatutStage("e1@email.com");

        e2 = new Etudiant();
        e2.setNom("tata");
        e2.setMatricule("67890");
        e1.setStatutStage("e2@email.com");
    }

    @Test
    @DisplayName("TEST GetAll")
    void testGetEtudiants() {
        // Arrange
        doReturn(Arrays.asList(e1, e2)).when(repository).findAll();
        // Act
        List<Etudiant> etudiants = service.getEtudiants();
        // Assert
        Assertions.assertEquals(2, etudiants.size());
    }

    @Test
    @DisplayName("TEST findById Success")
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
    @DisplayName("TEST findById Not Found")
    void testFindEtudiantByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findById(1l);
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantById(1l);
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
    }

    @Test
    @DisplayName("TEST saveEtudiant")
    void testSaveEtudiant() {
        // Arrange
        doReturn(e1).when(repository).save(any());
        // Act
        Etudiant etudiant = service.saveEtudiant(e1);
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertEquals(e1.getNom(), etudiant.getNom());
    }

    @Test
    @DisplayName("TEST updateEtudiant")
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
    @DisplayName("TEST findByMatricule Success")
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
    @DisplayName("TEST findByMatricule Not Found")
    void testFindEtudiantByMatriculeNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findByMatricule("X");
        // Act
        Optional<Etudiant> etudiant = service.findEtudiantByMatricule("X");
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
    }

    @Test
    @DisplayName("TEST updateEtudiantCV")
    void testUpdateEtudiantCV() throws DocumentException, IOException {
        // Arrange

        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream("HelloWorld.pdf"));

        document.open();
        Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
        Chunk chunk = new Chunk("Hello World", font);

        document.add(chunk);
        document.close();

        File pdfFile = new File("HelloWorld.pdf");
        byte[] pdfData = FileUtils.readFileToByteArray(pdfFile);

        // Act
        e1.setId(1l);
        doReturn(e1).when(repository).save(any());
        Etudiant etudiant = repository.save(e1);

        Etudiant putContent = new Etudiant();
        putContent = e1;
        putContent.setCv(pdfData);
        doReturn(putContent).when(repository).save(any());
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        Etudiant updatedEtudiant = service.updateEtudiantCV(putContent, etudiant.getId());
        // Assert
        Assertions.assertNotNull(updatedEtudiant);
        Assertions.assertNotNull(updatedEtudiant.getCv());

        FileUtils.writeByteArrayToFile(new File("HelloWorld2.pdf"), updatedEtudiant.getCv());
    }

    @Test
    @DisplayName("TEST findByEmail Success")
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
    @DisplayName("TEST findByEmail Not Found")
    void testFindEtudiantByEmailNotFound() {
        // Arrange
        doReturn(null).when(repository).findByEmail("no@email.com");
        // Act
        Etudiant etudiant = service.getEtudiantByEmail("no@email.com");
        // Assert
        Assertions.assertNull(etudiant);
    }
}