package com.equipe1.controller;

import com.equipe1.model.Stage;
import com.equipe1.model.StageAccepter;
import com.equipe1.service.StageAccepterService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/stageAccepter")
public class StageAccepterController {

    private StageAccepterService stageAccepterService;

    @PostMapping("/create")
    public StageAccepter createEtudiant(@RequestBody Stage stage){
        return stageAccepterService.saveStageAccepter(stage);
    }

    @PutMapping("/update/{id}")
    public StageAccepter updateEtudiant(@RequestBody Stage stage, @PathVariable Long id){
        return stageAccepterService.updateStageAccepter(stage, id);
    }
}
