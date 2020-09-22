package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.service.EtudiantService;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
public class EtudiantController {

    private EtudiantService service;

    public EtudiantController(EtudiantService service) {
        this.service = service;
    }

    @GetMapping("get")
    public Etudiant getEtudiant(@RequestParam("idEtudiant") Long idEtudiant) {
        return service.findEtudiantById(idEtudiant);
    }

    @PostMapping("create")
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant) {
        return service.saveEtudiant(etudiant);
    }

    @PutMapping("update/{id}")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant, @PathVariable Long id) {
        return service.updateEtudiant(etudiant, id);
    }
}