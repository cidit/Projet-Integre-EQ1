package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.User;
import com.equipe1.repository.EmployeurRepository;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EmailServiceTest {

    @MockBean
    private EmployeurRepository employeurRepository;
    private Employeur employeur1;

    @Autowired
    NotificationCourrielService notification;

    @BeforeEach
    public void setUp() {
        employeur1 = new Employeur();
        employeur1.setEmail("e1@email.com");
        employeur1.setNom("etreprise1");
    }

    @Test
    public void sendMailTest() throws Exception {
       // when(employeurRepository.save(employeur1)).thenReturn(employeur1);
        NotificationCourrielService  notification = mock(NotificationCourrielService.class);

        doNothing().when(notification).sendMail(employeur1);
        notification.sendMail(employeur1);
        notification.sendMail(employeur1);

        verify(notification, times(2)).sendMail(employeur1);

    }

}