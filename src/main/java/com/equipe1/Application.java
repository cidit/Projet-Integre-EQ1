package com.equipe1;

import com.equipe1.service.InsertDataService;
import com.equipe1.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class Application {

    @Autowired
    private InsertDataService insertDataService;

    @Autowired
    private SessionService sessionService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Profile("!test")
    @Bean
    CommandLineRunner commandLineRunner() {
        return args -> {
            insertDataService.insertSession();
            insertDataService.insertEtudiant();
            insertDataService.insertEmployeur();
            insertDataService.insertStage();
            insertDataService.insertGestionnaire();
            insertDataService.insertCandidature();
            //insertDataService.insertEvaluationStagiaire();

        };
    }
}