package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

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
        etudiantRepository.save(etudiant);
        return etudiant;
    }

    public Etudiant updateEtudiant(Etudiant newEtudiant, long id){
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        optionalEtudiant.get().setProgramme(newEtudiant.getProgramme());
        optionalEtudiant.get().setEmail(newEtudiant.getEmail());
        optionalEtudiant.get().setTelephone(newEtudiant.getTelephone());
        optionalEtudiant.get().setAdresse(newEtudiant.getAdresse());
        return etudiantRepository.save(optionalEtudiant.get());
    }
}
