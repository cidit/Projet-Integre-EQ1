package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReminderService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CVService cvService;
    @Autowired
    private StageService stageService;
    @Autowired
    private CandidatureService candidatureService;
    @Autowired
    private ContratService contratService;
    @Autowired
    private SessionService sessionService;

    public List<? extends Reminder> getRemindersFor(long userId) throws Exception {
        var optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            var user = optionalUser.get();
            if (user instanceof Gestionnaire) return remindersForGestionaire((Gestionnaire) user);
            else if (user instanceof Employeur) return remindersForEmployeur((Employeur) user);
            else if (user instanceof Etudiant) return remindersForEtudiant((Etudiant) user);
        }
        return new ArrayList<>();
    }

    private List<Reminder.GestionaireReminder> remindersForGestionaire(Gestionnaire user) throws Exception {
        Session currentSession;
        var sessionOptional = sessionService.findCurrentSession();
        if (sessionOptional.isEmpty()) throw new Exception("no current session!");
        else currentSession = sessionOptional.get();

        // cherche si il y a des cvs sans veto
        var messages = new ArrayList<Reminder.GestionaireReminder>();
        var cvs = cvService.getByDataIsNotNullAndStatusNotReviewed();
        if (!cvs.isEmpty()) {
            messages.add(Reminder.GestionaireReminder.UNREVIEWED_CVS);
        }

        // cherche si il y a des stages sans veto
        var stages = stageService.getByStatutWaiting();
        var stageCetteSession = stages
                .stream()
                .filter(stage -> stage.getSession().equals(currentSession));
        if (stageCetteSession.findAny().isPresent()) {
            messages.add(Reminder.GestionaireReminder.UNREVIEWED_STAGES);
        }

        // cherche si un contrat est pret a etre généré
        for (var stage : stageCetteSession.collect(Collectors.toList()))
            if (candidatureService.findAllByStage(stage.getId())
                    .stream()
                    .anyMatch(candidature -> candidature
                            .getStatut()
                            .equals(Candidature.CandidatureStatut.CHOISI))) {
                messages.add(Reminder.GestionaireReminder.CONTRAT_READY_TO_BE_GENERATED);
                break;
            }

        // cherche si la date de nouvelle session aproche
        // TODO
        return messages;
    }

    private List<Reminder.EmployeurReminder> remindersForEmployeur(Employeur user) throws Exception {
        Session currentSession;
        var sessionOptional = sessionService.findCurrentSession();
        if (sessionOptional.isEmpty()) throw new Exception("no current session!");
        else currentSession = sessionOptional.get();
        var messages = new ArrayList<Reminder.EmployeurReminder>();

        // cherche si l'employeur a au moins un stage
        var stageCetteSession = stageService.getStagesByEmployeur(user.getId())
                .stream()
                .filter(stage -> stage.getSession()
                        .equals(currentSession));
        if (stageCetteSession.findAny().isEmpty()) {
            messages.add(Reminder.EmployeurReminder.NO_OPEN_STAGE_THIS_SESSION);
        } else {

            // cherche si un stage encore ouvert a des candidatures
            for (var stage : stageCetteSession.collect(Collectors.toList())) {
                var candidatures = candidatureService.findAllByStage(stage.getId());
                if (!candidatures.isEmpty() && stage.isOuvert()) {
                    messages.add(Reminder.EmployeurReminder.OPEN_STAGE_HAS_CANDIDATURES);
                    break;
                }
            }
        }

        // cherche si il manque une signature de la part de l'employeur sur un de ses contrats
        var contratCetteSession = contratService.getContratsByEmployeur(user)
                .stream()
                .filter(contrat -> contrat.getCandidature()
                        .getStage()
                        .getSession()
                        .equals(currentSession));
        for (var contrat : contratCetteSession.collect(Collectors.toList()))
            if (contrat.getSignatureEmployeur() == Contrat.SignatureEtat.EN_ATTENTE) {
                messages.add(Reminder.EmployeurReminder.SIGNATURE_MISSING_ON_CONTRAT);
                break;
            }

        return messages;
    }

    private List<Reminder.EtudiantReminder> remindersForEtudiant(Etudiant user) throws Exception {
        Session currentSession;
        var sessionOptional = sessionService.findCurrentSession();
        if (sessionOptional.isEmpty()) throw new Exception("no current session!");
        else currentSession = sessionOptional.get();
        var messages = new ArrayList<Reminder.EtudiantReminder>();


        // cherche si l'etudiant n'a pas encore soumis son CV
        if (user.getCv() == null ||
                user.getCv().getData() == null ||
                user.getCv().getData().length == 0)
            messages.add(Reminder.EtudiantReminder.NO_CV);


        // cherche si l'etudiant n'a pas encore soumis sa candidature
        if (candidatureService.findCandidatureByEtudiant(user.getId())
                .stream()
                .noneMatch(candidature -> candidature.getStage()
                        .getSession()
                        .equals(currentSession))
                && stageService.getStages()
                .stream()
                .noneMatch(stage -> stage
                        .getSession()
                        .equals(currentSession))) {
            messages.add(Reminder.EtudiantReminder.NO_CANDIDATURE_ON_STAGE);
        }

        // cherche si il manque sa signature sur le contrat
        if (contratService.getContratsByEtudiantChoisi(user)
                .stream()
                .anyMatch(contrat -> contrat.getSignatureEtudiant()
                        .equals(Contrat.SignatureEtat.EN_ATTENTE)))
            messages.add(Reminder.EtudiantReminder.SIGNATURE_MISSING_ON_CONTRAT);

        // cherche si l'etudiant est enregistré dans la session actuelle
        if (!user.getSession().contains(currentSession))
            messages.add(Reminder.EtudiantReminder.NOT_REGISTERED_THIS_SESSION);

        // cherche si l'etudiant n'a pas encore confirmé sa présence à un stage
        var candidaturesCetteSession = candidatureService.findCandidatureByEtudiant(user.getId())
                .stream()
                .filter(candidature -> candidature.getStage()
                        .getSession()
                        .equals(currentSession));
        if (candidaturesCetteSession.anyMatch(candidature -> candidature.getStatut() == Candidature.CandidatureStatut.APPROUVE) &&
                candidaturesCetteSession.noneMatch(candidature -> candidature.getStatut() == Candidature.CandidatureStatut.CHOISI)
        )
            messages.add(Reminder.EtudiantReminder.STAGE_FREQUENTATION_NOT_CONFIRMED);

        return messages;
    }
}
