package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.EmployeurRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EmployeurServiceTest {

   @Autowired
   private EmployeurService employeurService;

   @MockBean
   private EmployeurRepository employeurRepository;

   private Employeur employeur1;
   private Employeur employeur2;

   @BeforeEach
   public void setUp(){
       employeur1 = new Employeur("Employeur_test_1", "438-568-896", "589 abc 23 re");
       employeur2 = new Employeur("Employeur_test_2", "222-222-222", "abc adress test");
   }

    @Test
    public void getEmployeurs() {
        Mockito.when(employeurRepository.findAll()).thenReturn(Arrays.asList(employeur1, employeur2));
        List<Employeur> all = employeurService.getEmployeurs();
        Assertions.assertEquals(2, all.size());
    }

    @Test
    public void getEmployeurById() {
        when(employeurRepository.findById(1L)).thenReturn(Optional.of(employeur1));
        Employeur employeur = employeurService.getEmployeurById(1L);
        assertEquals(employeur,employeur1 );
    }

    @Test
    public void saveEmployeur() {
        when(employeurRepository.save(employeur1)).thenReturn(employeur1);
        Employeur employeur = employeurService.saveEmployeur(employeur1);
        assertNotNull(employeur1);
        assertEquals(employeur.getNom(),employeur.getNom() );
    }

    @Test
    void updateEmployeur() {
        when(employeurRepository.save(employeur1)).thenReturn(employeur1);
        employeur1.setNom("Jhon");
        Employeur employeur = employeurService.updateEmployeur(employeur1,1L);
        assertEquals(employeur1.getNom(),"Jhon");

    }
}