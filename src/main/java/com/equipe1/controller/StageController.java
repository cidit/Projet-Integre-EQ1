package com.equipe1.controller;

import com.equipe1.model.Stage;
import com.equipe1.service.StageService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/stage")
public class StageController {
    private StageService stageService;

    public StageController(StageService stageService){
        this.stageService = stageService;
    }

    @GetMapping(value = "/findAll")
    public List<Stage> getAllStages(){
        return stageService.getStages();
    }

    @GetMapping("getStage")
    public Optional<Stage> getStage(@RequestParam("idStage") Long idStage){
        return stageService.findStageById(idStage);
    }

    @GetMapping("/stageByEmployeurId")
    public List<Stage> getStageByEmployeurId(@RequestParam("idEmployeur") Long idEmployeur){
        return stageService.getStagesByEmployeur(idEmployeur);
    }

    @PostMapping("createStage")
    public Stage createStage(@RequestBody Stage stage){
        return stageService.saveStage(stage);
    }

    @PutMapping("updateStage/{id}")
    public Stage updateStage(@RequestBody Stage stage, @PathVariable Long id){
        return stageService.updateStage(stage, id);
    }

    @PutMapping("/updateStatusStage/{id}")
    public Stage updateStatusStage(@RequestBody Stage stage, @PathVariable Long id) throws Exception {
        return stageService.updateStatus(stage, id);
    }
}
