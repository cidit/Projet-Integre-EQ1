package com.equipe1;

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
import java.util.HashSet;

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
                insertDataService.insertSession();
                insertDataService.insertEtudiant();
                insertDataService.insertEmployeur();
                insertDataService.insertStage();
                insertDataService.insertGestionnaire();
                //insertDataService.insertCandidature();
            }
        };
    }

}