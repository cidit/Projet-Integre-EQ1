package com.equipe1.controller;

import com.equipe1.model.Stage;
import com.equipe1.repository.StageRepository;
import com.equipe1.service.ContratService;
import com.equipe1.service.CourrielService;
import com.equipe1.service.GenerateurPdf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.util.Optional;

@RestController
@RequestMapping("contrats")
public class ContratController {

    @Autowired
    private ContratService contratService;

    @Autowired
    StageRepository stageRepository;
    @Autowired
    CourrielService courrielService;

  /* @GetMapping("/pdf")
    public ResponseEntity<ByteArrayOutputStream> contratAppercue(){
        Optional<Stage> stage = stageRepository.findById(5L);

        GenerateurPdf generateurPdf = new GenerateurPdf();

        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource((generateurPdf.createPdf(stage.get()).toByteArray()));

                courrielService.sendMail2(user,g.createPdf(s));

    }*/

     @GetMapping("/pdf")
    public String contratAppercue() throws Exception {
        Optional<Stage> stage = stageRepository.findById(5L);

        GenerateurPdf generateurPdf = new GenerateurPdf();


        // generateurPdf.createPdf(stage.get());
        //courrielService.sendMail2(stage.get().getEmployeur(),generateurPdf.createPdf(stage.get()) );


         return "hola";



    }
}
