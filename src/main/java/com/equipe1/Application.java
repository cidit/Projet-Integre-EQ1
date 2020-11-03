package com.equipe1;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.service.InsertDataService;
import com.equipe1.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;

@SpringBootApplication
public class Application {

    @Autowired
    private InsertDataService insertDataService;

    @Autowired
    private SessionService sessionService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner() {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                insertDataService.insertEtudiant();
                insertDataService.insertEmployeur();
                insertDataService.insertStage();
                insertDataService.insertGestionnaire();
                updateSessionTask();
            }
        };
    }

    @Scheduled(cron = "0 0 0 1 1 *")
    void updateSession_premierJanvier() {
        updateSessionTask();
    }

    @Scheduled(cron = "0 0 0 1 7 *")
    void updateSession_premierJuillet() {
        updateSessionTask();
    }

    void updateSessionTask() {
        var session = Session.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(6))
                .build();
        sessionService.create(session);
    }
}

@Configuration
@EnableScheduling
@ConditionalOnProperty(name = "scheduling.enabled", matchIfMissing = true)
class SchedulingConfiguration { }