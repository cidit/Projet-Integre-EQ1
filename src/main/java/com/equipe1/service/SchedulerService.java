package com.equipe1.service;

import com.equipe1.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class SchedulerService {

    @Autowired
    private SessionService sessionService;
    @Scheduled(cron = "0 0 0 1 JAN,JUN,SEP ?")
    public Session scheduleCreationSession() {
        String nomSession = configurationNomSession();
        Session session = Session.builder().nom(nomSession).dateDebut(LocalDate.now()).isCurrent(true).build();
        return sessionService.create(session);

    }

    public String configurationNomSession(){
        String nomDerniereSaison = sessionService.findCurrentSession().get().getNom().substring(0, 3);
        String nomNouvelleSaison = "";
        int nomNouvelleAnnee;
        if(nomDerniereSaison.equals("AUT")){
            nomNouvelleAnnee = LocalDate.now().getYear() + 1;
        }
        else {
            nomNouvelleAnnee = LocalDate.now().getYear();
        }
        switch (nomDerniereSaison){
            case "AUT" :
                nomNouvelleSaison = "HIV";
                break;
            case "HIV" :
                nomNouvelleSaison = "ETE";
                break;
            case "ETE" :
                nomNouvelleSaison = "AUT";
                break;
            default:
                break;
        }
        return nomNouvelleSaison + "-" + nomNouvelleAnnee;
    }


}
