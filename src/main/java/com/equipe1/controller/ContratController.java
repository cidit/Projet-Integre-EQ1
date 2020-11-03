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
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
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

    @GetMapping(value = "findAll")
    public List<Contrat> getContrats() {
        return contratService.findAll();
    }

    @GetMapping(value = "getContratById/{id}")
    public Contrat getById(@PathVariable Long id) {
        return contratService.getContratById(id);
    }

    @GetMapping("/getContratFile/{id}")
    public ResponseEntity<byte[]> getContratById(@PathVariable Long id) throws Exception {
        Contrat contrat = contratService.getContratById(id);
        byte[] pdfile = contrat.getDocumentContrat();
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(pdfile));
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename=");
        return new ResponseEntity<>(pdfile, header, HttpStatus.OK);
    }

    @GetMapping(value = "getByEmployeurId/{id}")
    public List<Contrat> getContratsByEmployeur(@PathVariable Long id) {
        Optional<Employeur> employeur = employeurRepository.findById(id);
        return contratService.getContratsByEmployeur(employeur.get());
    }

    @GetMapping(value = "getCandidaturesSansContrat")
    public List<Candidature> getCandidaturesSansContrat() {
        return contratService.listCandidatureSansContrat();
    }

    @GetMapping(value = "getByEtudiantId/{id}")
    public List<Contrat> getContratsByEtudiant(@PathVariable Long id) {
        Optional<Etudiant> etudiant = etudiantRepository.findById(id);
        return contratService.getContratsByEtudiantChoisi(etudiant.get());
    }

    @GetMapping(value = "contratExiste/{id}")
    public boolean candidatureHasContrat(@PathVariable Long id) {
        return contratService.candidatureHasContrat(id);
    }

    @GetMapping(value = "getApercueContrat/{idCandidature}")
    public ResponseEntity<byte[]> getApercueContrat(@PathVariable Long idCandidature) throws Exception {
        byte[] pdfile = contratService.createApercueContrat(idCandidature).toByteArray();
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename=");
        return new ResponseEntity<>(pdfile, HttpStatus.OK);
    }

    @PutMapping("/create/{idCandidature}")
    public ResponseEntity<String> saveContrat(@RequestParam("file") MultipartFile file, @PathVariable Long idCandidature) {
        String message = "";
        try {
            contratService.createContrat(file, idCandidature);
            message = "Fichier " + file.getOriginalFilename() + " téléversé avec succès: ";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            message = "Un problème est survenu, veuillez réessayer plus tard !";
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/createAuto/{idCandidature}")
    public ResponseEntity<String> createAuto(@PathVariable Long idCandidature) {
        String message = "";
        try {
            contratService.createContratEtDocument(idCandidature);
            message = " Contrat créé avec succès";
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            message = "Un problème est survenu, veuillez réessayer plus tard !";
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }
}
