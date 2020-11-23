package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.service.StageService;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/stages")
public class StageController {
    private StageService stageService;

    public StageController(StageService stageService){
        this.stageService = stageService;
    }

    @GetMapping(value = "/findAll")
    public List<Stage> getAllStages(@RequestParam("idSession") Long idSession){
        return stageService.getStages(idSession);
    }

    @GetMapping(value = "/getStagesSession")
    public List<Stage> getStagesSessionEnCours(){
        return stageService.getStagesSessionEnCours();
    }

    @GetMapping("getStage")
    public Optional<Stage> getStage(@RequestParam("idStage") Long idStage){
        return stageService.findStageById(idStage);
    }

    @GetMapping("/stageByEmployeurId/{idEmployeur}")
    public List<Stage> getStageByEmployeurId(@PathVariable("idEmployeur") Long idEmployeur, @RequestParam("idSession") Long idSession){
        return stageService.getStagesByEmployeur(idEmployeur, idSession);
    }

    @GetMapping("/stagesEtudiant/{idEtudiant}")
    public List<Stage> getStagesEtudiant(@PathVariable("idEtudiant") Long idEtudiant, @RequestParam("idSession") Long idSession){
        return stageService.getStagesEtudiant(idEtudiant, idSession);
    }

    @PostMapping("createStage")
    public Stage createStage(@RequestBody Stage stage){
        return stageService.saveStage(stage);
    }

    @PutMapping("updateStage/{id}")
    public Stage updateStage(@RequestBody Stage stage, @PathVariable Long id){
        return stageService.updateStage(stage, id);
    }

    @PutMapping("updateStatusStage/{id}")
    public Stage updateStatusStage(@RequestBody Stage stage, @PathVariable Long id) throws Exception {
        return stageService.updateStatus(stage, id);
    }

    @PutMapping("updateEtudiantsAdmits/{stageId}")
    public Stage updateEtudiantsAdmits(@PathVariable long stageId, @RequestBody List<Etudiant> etudiants){
        return stageService.updateEtudiantsAdmits(stageId, new HashSet<>(etudiants));
    }

    @GetMapping("getEtudiantsAdmits/{stageId}")
    public Set<Etudiant> getEtudiantsAdmits(@PathVariable long stageId){
        return stageService.getEtudiantsAdmits(stageId);
    }

    @GetMapping("approuves")
    public List<Stage> getAllStagesApprouves(@RequestParam("idSession") Long idSession){
        return stageService.getStagesApprouves(idSession);
    }

    @GetMapping("ayantStagiaire")
    public List<Stage> getAllStagesAyantAucunStagiare(@RequestParam("idSession") Long idSession){
        return stageService.getStagesAyantAucunStagiaire(idSession);
    }

    @GetMapping("nonApprouves")
    public List<Stage> getAllStagesNonApprouves(@RequestParam("idSession") Long idSession){
        return stageService.getStagesNonApprouves(idSession);
    }
}
