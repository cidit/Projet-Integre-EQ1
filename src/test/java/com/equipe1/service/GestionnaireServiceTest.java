package com.equipe1.service;

import com.equipe1.model.Gestionnaire;
import com.equipe1.repository.GestionnaireRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class GestionnaireServiceTest {

    @Autowired
    GestionnaireService service;

    @MockBean
    GestionnaireRepository repository;

    private Gestionnaire g1;
    private Gestionnaire g2;

    @BeforeEach
    public void setUp() {
        g1 = new Gestionnaire();
        g1.setNom("toto");
        g2 = new Gestionnaire();
        g2.setNom("tata");
    }

    @Test
    @DisplayName("TEST GetAll")
    void testGetGestionnaires(){
        // Arrange
        doReturn(Arrays.asList(g1, g2)).when(repository).findAll();
        // Act
        List<Gestionnaire> gestionnaires = service.getGestionnaires();
        // Assert
        Assertions.assertEquals(2, gestionnaires.size());
    }

    @Test
    @DisplayName("TEST findById Success")
    void testFindGestionnaireById() {
        // Arrange
        doReturn(Optional.of(g1)).when(repository).findById(1l);
        // Act
        Optional<Gestionnaire> gestionnaire = service.findGestionnaireById(1l);
        // Assert
        Assertions.assertTrue(gestionnaire.isPresent());
        Assertions.assertSame(gestionnaire.get(), g1);
    }

    @Test
    @DisplayName("TEST findById Not Found")
    void testFindGestionnaireByIdNotFound() {
        // Arrange
        doReturn(Optional.empty()).when(repository).findById(1l);
        // Act
        Optional<Gestionnaire> gestionnaire = service.findGestionnaireById(1l);
        // Assert
        Assertions.assertFalse(gestionnaire.isPresent());
    }

    @Test
    @DisplayName("TEST saveGestionnaire")
    void testSaveGestionnaire() {
        // Arrange
        doReturn(g1).when(repository).save(any());
        // Act
        Gestionnaire gestionnaire = service.saveGestionnaire(g1);
        // Assert
        Assertions.assertNotNull(gestionnaire);
        Assertions.assertEquals(g1.getNom(), gestionnaire.getNom());
    }

    @Test
    @DisplayName("TEST updateGestionnaire")
    void testUpdateGestionnaire() {
        // Arrange + Act
        g1.setId(1l);
        g1.setEmail("NONE");
        g1.setTelephone("NONE");
        doReturn(g1).when(repository).save(any());
        Gestionnaire gestionnaire = repository.save(g1);

        Gestionnaire putContent = new Gestionnaire();
        putContent = g1;
        putContent.setEmail("TI");
        putContent.setTelephone("TI");
        doReturn(putContent).when(repository).save(any());
        doReturn(Optional.of(g1)).when(repository).findById(g1.getId());
        Gestionnaire updatedGestionnaire = service.updateGestionnaire(putContent, gestionnaire.getId());
        // Assert
        Assertions.assertNotNull(updatedGestionnaire);
        Assertions.assertEquals(1l, updatedGestionnaire.getId());
        Assertions.assertEquals(g1.getNom(), updatedGestionnaire.getNom());
        Assertions.assertEquals("TI", updatedGestionnaire.getEmail());
        Assertions.assertEquals("TI", updatedGestionnaire.getTelephone());
    }

}