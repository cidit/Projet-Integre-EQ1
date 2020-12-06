package com.equipe1.controller;

import com.equipe1.model.Contrat;
import com.equipe1.model.EvaluationMilieuStage;
import com.equipe1.model.EvaluationStagiaire;
import com.equipe1.service.EvaluationMilieuStageService;
import com.equipe1.model.RecepteurDonneesEvaluation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/evaluationMilieuStage")
public class EvaluationMilieuStageController {

    @Autowired
    EvaluationMilieuStageService evaluationMilieuStageService;

    @GetMapping("getByEnseignant/{id}")
    public List<EvaluationMilieuStage> getEvaluationStagiaireByEmployeurid (@PathVariable Long id){
        return evaluationMilieuStageService.getAllByEnseignant(id);
    }

    @PutMapping("/newEvaluation/{idCandidature}/{idEnseignant}")
    public EvaluationMilieuStage putEvaluation(@RequestBody RecepteurDonneesEvaluation evaluation,
                                               @PathVariable Long idCandidature, @PathVariable Long idEnseignant){
        return evaluationMilieuStageService.saveEvaluation(evaluation,idCandidature, idEnseignant);

    }

    @GetMapping("/getEvaluation/{idEvaluation}")
    public ResponseEntity<byte[]> getApercueContrat(@PathVariable Long idEvaluation) throws Exception {
        byte[] pdfile = evaluationMilieuStageService.getDocumentEvaluationMilieuStage(idEvaluation).toByteArray();
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf("application/pdf"));
        header.setContentLength(pdfile.length);
        header.set("Content-Disposition", "attachment; filename= ");
        return new ResponseEntity<>(pdfile, HttpStatus.OK);
    }

}
