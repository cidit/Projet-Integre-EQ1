package com.equipe1.controller;

import com.equipe1.model.StageAccepter;
import com.equipe1.service.StageAccepterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/stageAccepter")
public class StageAccepterController {

    private  StageAccepterService stageAccepterService;

    public StageAccepterController(StageAccepterService stageAccepterService) {
        this.stageAccepterService = stageAccepterService;
    }

    @GetMapping("findAll")
    public List<StageAccepter> getAllStageAccepter(){
        return stageAccepterService.getAllStageAccepter();
    }

    @PostMapping("/create")
    public StageAccepter createStageAccepter(@RequestParam("idEtudiant") Long idEtudiant, @RequestParam("idStage") Long idStage){
        return stageAccepterService.saveStageAccepter(idEtudiant, idStage);
    }
}
