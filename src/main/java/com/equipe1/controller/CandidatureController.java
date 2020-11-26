package com.equipe1.controller;

import com.equipe1.model.Candidature;
import com.equipe1.service.CandidatureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/candidatures")
public class CandidatureController {

    private CandidatureService candidatureService;
    public CandidatureController(CandidatureService candidatureService){
        this.candidatureService = candidatureService;
    }

    @GetMapping(value = "findAll")
    public List<Candidature> getAllCandidatures(){
        return candidatureService.getCandidatures();
    }

    @GetMapping("get")
    public Candidature getCandidatureById(@RequestParam("idCandidature") Long idCandidature){
        return candidatureService.findCandidatureById(idCandidature).get();
    }
    @GetMapping("getByEtudiant")
    public List<Candidature> getCandidatureByEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return candidatureService.findCandidatureByEtudiant(idEtudiant);
    }

    @GetMapping("/getByStage")
    public List<Candidature> findAllByStage(@RequestParam("stage") Long stage){
        return candidatureService.findAllByStage(stage);
    }

    @PostMapping("createCandidature")
    public Candidature createCandidature(@RequestParam("idEtudiant") Long idEtudiant, @RequestParam("idStage") Long idStage){
        return candidatureService.createCandidature(idEtudiant, idStage);
    }

    @PutMapping("updateChoisi/{id}")
    public Candidature updateCandidatureChoisi(@PathVariable Long id){
        return candidatureService.updateCandidatureChoisi(id);
    }

    @PutMapping("updateApprouve/{id}")
    public Candidature updateCandidatureApprouve(@PathVariable Long id) throws Exception {
        return candidatureService.updateCandidatureApprouve(id);
    }

    @GetMapping("getChoisi/{id}")
    public Optional<Candidature> getCandidatureChoisi(@PathVariable Long id) {
        return candidatureService.getCandidatureChoisi(id);
    }

    @GetMapping("getAllChoisis")
    public List<Candidature> getAllCandidatureChoisi() {
        return candidatureService.getListCandidaturesChoisis(Candidature.CandidatureStatut.CHOISI);
    }

    @PutMapping("convoqueEtudiantEntrevue/{id}")
    public Candidature convoqueEtudiantEntrevue(@PathVariable Long id){
        return candidatureService.convoqueEtudiantEntrevue(id);
    }

    @PutMapping("entrevuePasseeConfirmation/{id}")
    public Candidature entrevuePasseeConfirmation(@PathVariable Long id){
        return candidatureService.entrevuePasseeConfirmation(id);
    }

    @GetMapping("getByPremierMoisStage")
    public List<Candidature> getAllForEvaluationMilieuStage() {
        //return toutes les candidatures ayant un stage rendue a la 4 semaine
        return candidatureService.getListByDateStage();
    }

    @GetMapping("getListAEvaluer/{idEmployeur}")
    public List<Candidature> getListAEvaluerParEmployeur(@PathVariable Long idEmployeur) {
        return candidatureService.getListCandidatureByEmployeurToEvaluer(idEmployeur);
    }

    @GetMapping("getListByEnseignant/{idEnseignant}")
    public List<Candidature> getListByEnseignant(@PathVariable Long idEnseignant) {
        return candidatureService.getCandidatureEtudaintByEnseignant(idEnseignant);
    }

}
