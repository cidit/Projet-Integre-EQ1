package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.service.EtudiantService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/etudiants")
public class EtudiantController {

    private EtudiantService etudiantService;

    public EtudiantController(EtudiantService service){
        this.etudiantService = service;
    }

    @GetMapping("/findAll")
    public List<Etudiant> getAllEtudiant(){
        return etudiantService.getEtudiants();
    }

    @GetMapping("/get")
    public Optional<Etudiant> getEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return etudiantService.findEtudiantById(idEtudiant);
    }

    @PutMapping("/registration/register/{id}")
    public Optional<Etudiant> registerEtudiant(@PathVariable long id) {
        return etudiantService.registerEtudiantSession(id);
    }

    @GetMapping("/registration/isRegistered/{id}")
    public boolean isEtudiantRegistered(@PathVariable long id) {
        return etudiantService.isEtudiantRegistered(id);
    }

    @PostMapping("/create")
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.saveEtudiant(etudiant);
    }

    @PutMapping("/update/{id}")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @GetMapping("/matricule")
    public Optional<Etudiant> getEtudiantByMatricule(@RequestParam("matricule") String matricule){
        return etudiantService.findEtudiantByMatricule(matricule);
    }

    @PutMapping("/update/cv/{id}")
    public Etudiant updateEtudiantCV(@RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @GetMapping("/email")
    public Etudiant getEmployeurByEmail(@RequestParam("email") String email){
        return etudiantService.getEtudiantByEmail(email);
    }

    @GetMapping("/get/{programme}")
    public List<Etudiant> getAllEtudiantByProgramme(@PathVariable String programme){
        return etudiantService.getEtudiantsByProgramme(programme);
    }

    @GetMapping("/get/aucunStage")
    public List<Etudiant> getAllEtudiantsAucunStage(){
        return etudiantService.getEtudiantsAucunStage();
    }

    @GetMapping("/getAllSansCV")
    public List<Etudiant> getEtudiantsAucunCV(){
        return etudiantService.getEtudiantsAucunCV();
    }

    @GetMapping("/getAllCVNonApprouve")
    public List<Etudiant> getEtudiantsCVNonApprouve(){
        return etudiantService.getEtudiantsCVNonApprouve();
    }

    @GetMapping("/getAllInscrits")
    public List<Etudiant> getEtudiantsInscrits(){
        return etudiantService.getEtudiantsInscrits();
    }

    @GetMapping("/getAllAyantEntrevue")
    public List<Etudiant> getEtudiantsAyantEntrevue(){
        return etudiantService.getEtudiantsAyantEntrevue();
    }

    @PutMapping("updatePassword/{id}")
    public Etudiant updateEtudiantPassword(@Valid @RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiantPassword(etudiant, id);
    }
}