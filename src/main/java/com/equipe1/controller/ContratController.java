package com.equipe1.controller;

import com.equipe1.model.*;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.StageRepository;
import com.equipe1.service.ContratService;
import com.equipe1.service.CourrielService;
import com.equipe1.service.GenerateurPdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("contrats")
public class ContratController {

    @Autowired
    private ContratService contratService;

    @Autowired
    StageRepository stageRepository;
    @Autowired
    CourrielService courrielService;

    @Autowired
    GenerateurPdfService generateurPdfService;

    @Autowired
    EtudiantRepository etudiantRepository;
    @Autowired
    EmployeurRepository employeurRepository;


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
     public ResponseEntity<InputStreamResource>  ersourceyes () throws Exception {

         Etudiant etudiantTest = etudiantRepository.findByEmail("richard@email.com");
         Employeur employeurTest = employeurRepository.findEmployeurByEmail("carlos.test@gmail.com");
         Optional<Stage> stageTest = stageRepository.findById(6L);



         byte [] pdfile= generateurPdfService.createPdf(stageTest.get(), employeurTest, etudiantTest).toByteArray();

         InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(pdfile));

         return ResponseEntity.ok()
                 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" )
                 .contentType(MediaType.APPLICATION_PDF)
                 .contentLength(pdfile.length)
                 .body(resource);

     }


    @GetMapping("/getContatFile/{id}")
    public ResponseEntity<byte[]> getContratById(@PathVariable Long id) throws Exception {
        Contrat contrat = contratService.getContratById(id);

        byte [] pdfile = contrat.getDocumentContrat();

        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(pdfile));

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename=" );
        return new ResponseEntity<>(pdfile, header, HttpStatus.OK);
    }

    @GetMapping(value = "findAll")
    public List<Contrat> getContrats (){
         return contratService.findAll();
    }







}
