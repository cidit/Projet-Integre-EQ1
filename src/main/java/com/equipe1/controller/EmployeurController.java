package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.service.EmployeurService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class EmployeurController {

    private EmployeurService employeurService;

    public EmployeurController(EmployeurService employeurService){
       this.employeurService=employeurService;
    }

    @GetMapping(value = "/employeurs")
    public List<Employeur> getAllEmployeurs(){
        return employeurService.getEmployeurs();
    }

    @GetMapping("get")
    public Employeur getEmployeurById(@RequestParam("idEmployeur") Long idEmployeur){
        return employeurService.getEmployeurById(idEmployeur);
    }

    @PostMapping("createEmploye")
    public Employeur createEtudiant(@Valid @RequestBody Employeur employeur){
        return employeurService.saveEmployeur(employeur);
    }

    @PutMapping("update/{id}")
    public Employeur updateEmployeur(@Valid @RequestBody Employeur employeur, @PathVariable Long id){
        return employeurService.updateEmployeur(employeur, id);
    }

}
