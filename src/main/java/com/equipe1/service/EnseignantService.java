package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Enseignant;
import com.equipe1.repository.EnseignantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EnseignantService {

    @Autowired
    EnseignantRepository enseignantRepository;
    public List<Enseignant> getEnseignants() {
        return enseignantRepository.findAll();
    }

    public Enseignant getEnseignantById(Long idEnseignant) {
        return enseignantRepository.findById(idEnseignant)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid Enseignant id %s",idEnseignant)));
    }

    public Enseignant getEnseignantByEmail(String email) {
        return enseignantRepository.findByEmail(email);
    }

    public Enseignant saveEnseignant(Enseignant enseignant) {
        return enseignantRepository.save(enseignant);
    }

    public Enseignant updateEnseignant(Enseignant newEnseignant, Long id) {
        Optional<Enseignant> optionalEnseignant = enseignantRepository.findById(id);
        if(optionalEnseignant.isPresent()){
            optionalEnseignant.get().setNom(newEnseignant.getNom());
            optionalEnseignant.get().setPrenom(newEnseignant.getPrenom());
            optionalEnseignant.get().setTelephone(newEnseignant.getTelephone());
            return enseignantRepository.save(optionalEnseignant.get());
        }else
            newEnseignant.setId(id);
        return enseignantRepository.save(newEnseignant);
    }

    public Enseignant updateEnseignantPassword(Enseignant newEnseignant, Long id) {
        Optional<Enseignant> optionalEnseignant = enseignantRepository.findById(id);
        optionalEnseignant.get().setPassword(newEnseignant.getPassword());
        return enseignantRepository.save(optionalEnseignant.get());
    }
}
