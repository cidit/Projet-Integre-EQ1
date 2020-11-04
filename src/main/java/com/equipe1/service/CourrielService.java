package com.equipe1.service;

import com.equipe1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.util.Date;

@Service
public class CourrielService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CourrielService.class);

    @Autowired
    JavaMailSender emailSender;

    @Autowired
    Environment env;

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(Courriel mail, String nomDestinataire) throws Exception {
        String content = "Votre affre de stage a été aprouvéé.";
        mail.setSujet(content);
        String mailBody = "Bonjour "+ nomDestinataire +  "\n\n" +content + mail.getContenu();
        configMail(mail.getDestinataire(), mail.getSujet(), mailBody);
    }



    public void sendMailCVApproval(Etudiant etudiant) throws Exception {
        String content = "";
        if (etudiant.getCv().getStatus() == CV.CVStatus.APPROVED)
            content = "Le CV que vous avez envoyé a été approuvé.";
        if (etudiant.getCv().getStatus() == CV.CVStatus.DENIED)
            content = "Le CV que vous avez envoyeé a été refusé.";
        String mailTo = etudiant.getEmail();
        String mailBody = "Bonjour, " + etudiant.getPrenom() + " " + etudiant.getNom() + " \n" + content;
        LOGGER.info("nom ==> " + etudiant.getNom());
        String subject = "Approbation de votre CV";
        configMail(mailTo, subject , mailBody);
    }
    public void sendCandidatureStatusUpdate(Candidature candidature) throws Exception {
        String content = "";
        if (candidature.getStatut() == Candidature.CandidatureStatut.CHOISI)
            content = "Vous avez été accepté(e) pour le stage " + candidature.getStage().getTitre();
        if (candidature.getStatut() == Candidature.CandidatureStatut.REFUSE)
            content = "Vous avez été refusé(e) pour le stage " + candidature.getStage().getTitre();
        String mailTo = candidature.getEtudiant().getEmail();
        String mailBody = "Bonjour, " + candidature.getEtudiant().getPrenom() + " " + candidature.getEtudiant().getNom() + " \n" + content;
        LOGGER.info("nom ==> " + candidature.getEtudiant().getNom());
        String subject = "Mise a jour concernant votre postulation pour le stage " + candidature.getStage().getTitre();
        configMail(mailTo, subject , mailBody);
    }

    private void configMail(String mailTo, String subject, String mailBody) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody,true);
        helper.setSentDate(new Date());
        emailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }

    public void sendMail2(User user,ByteArrayOutputStream b) throws Exception {
        String mailTo = user.getEmail();
        String mailBody = " M, Mme " + user.getNom() + " "
                + "message de votre ";;
        String subject = "contrat.";
        configMail2(mailTo, subject + " " + user.getNom(), mailBody,b);
    }



    private void configMail2(String mailTo, String subject, String mailBody, ByteArrayOutputStream b) throws Exception {
        final InputStreamSource attachment = new ByteArrayResource(b.toByteArray());
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody, true);
        helper.addAttachment("Qr Code", attachment);
        mailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }

    public void sendContratScolarite(Contrat contrat, String desc) throws Exception {
        String mailTo = "";
        String subject = "";
        String mailBody = "";
        if (desc.equals("Employeur")){
            mailTo = contrat.getCandidature().getEtudiant().getEmail();
            subject = "Contrat pour votre stage " + contrat.getCandidature().getStage().getTitre() + " chez " + contrat.getEmployeur().getNom();
            mailBody = "Voici votre contrat de stage en piece-jointe.";
        }
        else {
            mailTo = "stagescegepandrelaurendeau@gmail.com";
            subject = "Contrat de stage pour l'etudiant " + contrat.getCandidature().getEtudiant().getPrenom() + " " + contrat.getCandidature().getEtudiant().getNom();
            mailBody = "Voici le contrat de stage en piece-jointe.";
        }

        final InputStreamSource attachment = new ByteArrayResource(contrat.getDocumentContrat());
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody, true);
        helper.addAttachment("Contrat_" + contrat.getCandidature().getStage().getTitre() + contrat.getCandidature().getEtudiant().getNom() + ".pdf", attachment);
        mailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }


    public void sendRefusContrat(Contrat contrat, String desc) throws MessagingException {
        String mailTo = "";
        String subject = "";
        String mailBody = "";
        if (desc.equals("Employeur")){
            mailTo = contrat.getEmployeur().getEmail();
        }
        else {
            mailTo = contrat.getCandidature().getEtudiant().getEmail();
        }
        subject = "Le contrat que vous aviez téléversé est invalide";
        mailBody = "Le contrat que vous aviez téléversé est invalide, nous vous invitions a le signer et a le dater convenablement.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mailTo);
        helper.setSubject(subject);
        helper.setText(mailBody, true);
        mailSender.send(message);
        LOGGER.info("Mail sent to ==> " + mailTo);
    }
}
