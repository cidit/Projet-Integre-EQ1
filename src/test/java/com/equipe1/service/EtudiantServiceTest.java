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
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
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
        Optional<Etudiant> etudiant = service.findEtudiantById(1l);
        // Assert
        Assertions.assertFalse(etudiant.isPresent());
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
    @DisplayName("TEST updateEtudiant")
    void testUpdateEtudiant() {
        // Arrange + Act
        Etudiant e1 = new Etudiant("tete");
        e1.setId(1l);
        e1.setProgramme("NONE");
        e1.setEmail("NONE");
        e1.setTelephone("NONE");
        e1.setAdresse("NONE");
        doReturn(e1).when(repository).save(any());
        Etudiant etudiant = repository.save(e1);

        Etudiant e2 = new Etudiant();
        e2.setId(e1.getId());
        e2.setNom("tete");
        e2.setProgramme("TI");
        e2.setEmail("TI");
        e2.setTelephone("TI");
        e2.setAdresse("TI");
        doReturn(e2).when(repository).save(any());
        doReturn(Optional.of(e1)).when(repository).findById(e1.getId());
        Etudiant updatedEtudiant = service.updateEtudiant(e2, etudiant.getId());
        // Assert
        Assertions.assertNotNull(updatedEtudiant);
        Assertions.assertEquals(1l, updatedEtudiant.getId());
        Assertions.assertEquals("tete", updatedEtudiant.getNom());
        Assertions.assertEquals("TI", updatedEtudiant.getProgramme());
        Assertions.assertEquals("TI", updatedEtudiant.getEmail());
        Assertions.assertEquals("TI", updatedEtudiant.getTelephone());
        Assertions.assertEquals("TI", updatedEtudiant.getAdresse());
    }
}