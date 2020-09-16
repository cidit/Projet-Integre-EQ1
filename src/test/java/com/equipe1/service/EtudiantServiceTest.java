package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.doReturn;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EtudiantServiceTest {

    @Autowired
    private EtudiantService service;

    @MockBean
    private EtudiantRepository repository;

    @Test
    @DisplayName("TEST GetAll")
    void testGetEtudiants(){
        // Arrange
        Etudiant e1 = new Etudiant("toto");
        Etudiant e2 = new Etudiant("tata");
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
        Etudiant e1 = new Etudiant("tutu");
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
        Optional<Etudiant> returnedWidget = service.findEtudiantById(1l);
        // Assert
        Assertions.assertFalse(returnedWidget.isPresent());
    }

    @Test
    @DisplayName("TEST saveEtudiant")
    void testSaveEtudiant() {
        // Arrange
        Etudiant e1 = new Etudiant("titi");
        doReturn(e1).when(repository).save(any());
        // Act
        Etudiant etudiant = service.saveEtudiant(e1);
        // Assert
        Assertions.assertNotNull(etudiant);
        Assertions.assertEquals("titi", etudiant.getNom());
    }

    @Test
    @DisplayName("TEST updateEtudiant non existant")
    void testUpdateEtudiantNonExistant() {
        // Arrange
        //Etudiant e1 = new Etudiant("tete");
        Etudiant e2 = new Etudiant("tete");
        e2.setProgramme("TI");
        e2.setEmail("email@email.com");
        e2.setTelephone("555-555-5555");
        e2.setAdresse("adresse");
        doReturn(e2).when(repository).save(any());
        // Act
        //Etudiant etudiant = service.saveEtudiant(e1);
        Etudiant updateEtudiant = service.updateEtudiant(e2, 11l);
        // Assert
        Assertions.assertNotNull(updateEtudiant);
        Assertions.assertEquals("tete", updateEtudiant.getNom());
        Assertions.assertEquals("TI", updateEtudiant.getProgramme());
        Assertions.assertEquals("email@email.com", updateEtudiant.getEmail());
        Assertions.assertEquals("555-555-5555", updateEtudiant.getTelephone());
        Assertions.assertEquals("adresse", updateEtudiant.getAdresse());
    }
}