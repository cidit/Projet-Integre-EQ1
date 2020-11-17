package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.repository.EmployeurRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class GenerateurPdfServiceTest {

    @MockBean
    private EmployeurRepository employeurRepository;
    @Autowired
    private GenerateurPdfService generateurPdfService;
    private Stage s;
    private Employeur user;
    private Etudiant etudiant;

    @BeforeEach
    public void setUp() {
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
    void createPdf() throws Exception {
        when(employeurRepository.findEmployeurByEmail("carlos.arturo@gmail")).thenReturn(user);
        ByteArrayOutputStream b = generateurPdfService.createPdf(s, user, etudiant);
        assertNotNull(b);
    }
}