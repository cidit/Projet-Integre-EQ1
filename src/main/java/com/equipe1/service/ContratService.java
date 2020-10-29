package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.model.Contrat;
import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ContratService {

    @Autowired
    private ContratRepository contratRepository;

    public List<Contrat> getContrats() {
        return contratRepository.findAll();
    }

    public Contrat getContratById(long id) {
        return contratRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid contrat id %s", id)));
    }

    public Contrat saveContrat(Contrat contrat){
        return contratRepository.save(contrat);
    }

    public List<Contrat> findAll() {
        return contratRepository.findAll();
    }

    public Contrat findById(Long id) {
        return contratRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid Contrat id %s",id)));
    }

    public List<Contrat> getContratsByEmployeur(Employeur employeur){
        return contratRepository.findByEmployeur(employeur);
    }

    public Contrat getContratsByEtudaint(Etudiant etudiant) {
        return contratRepository.findByEtudiant(etudiant);
    }
}
