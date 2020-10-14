package com.equipe1.service;

import com.equipe1.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Optional;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    Environment environment;

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    public void sendMail(User user) throws Exception {
        String mailTo = user.getEmail();
        System.out.println(user.getEmail() + " email");
        String mailBody = " M, Mme\n" + " \n" + environment.getProperty("my.message.stageApprouve");
        String subject = "Approbation de votre offre de stage";
        configMail(mailTo, subject , mailBody);
    }

    private void configMail(String mailTo, String subject, String mailBody) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody);
        helper.setSentDate(new Date());
        mailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }
}
