package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private SessionService sessionService;

    public EtudiantService(EtudiantRepository etudiantRepository){
        this.etudiantRepository = etudiantRepository;
    }

    public List<Etudiant> getEtudiants(){
        return etudiantRepository.findAll();
    }

    public Optional<Etudiant> findEtudiantById(Long idEtudiant){
        return etudiantRepository.findById(idEtudiant);
    }

    public Etudiant saveEtudiant(Etudiant etudiant){
        etudiant.setStatutStage("aucun stage");
        etudiant = etudiantRepository.save(etudiant);
        return etudiant;
    }

    public Etudiant updateEtudiant(Etudiant newEtudiant, long id){
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        optionalEtudiant.get().setProgramme(newEtudiant.getProgramme());
        optionalEtudiant.get().setEmail(newEtudiant.getEmail());
        optionalEtudiant.get().setTelephone(newEtudiant.getTelephone());
        optionalEtudiant.get().setAdresse(newEtudiant.getAdresse());
        optionalEtudiant.get().setCv(newEtudiant.getCv());
        return etudiantRepository.save(optionalEtudiant.get());
    }

    public Optional<Etudiant> findEtudiantByMatricule(String matricule) {
        return etudiantRepository.findByMatricule(matricule);
    }

    public Etudiant getEtudiantByEmail(String email){
        return etudiantRepository.findByEmail(email);
    }

    public List<Etudiant> getEtudiantsByProgramme(String programme) {
        return etudiantRepository.findAllByProgramme(programme);
    }


    public Optional<Etudiant> registerEtudiant(long id) {
        var optionalEtudiant = findEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            var session = sessionService.getCurrent();
            session.getEtudiants().add(optionalEtudiant.get());
            sessionService.update(session);
        }
        return optionalEtudiant;
    }

    public boolean isEtudiantRegistered(long id) {
        var optionalEtudiant = findEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            var session = sessionService.getCurrent();
            return session.getEtudiants().stream().anyMatch(etudiant -> etudiant.getId() == id);
        }
        return false;
    }
}
