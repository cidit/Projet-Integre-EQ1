package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EtudiantService {

    private EtudiantRepository repository;

    public EtudiantService(EtudiantRepository repository){
        this.repository = repository;
    }

    public Etudiant findEtudiantById(Long idEtudiant){
        return repository.findById(idEtudiant).orElse(new Etudiant());
    }

    public Etudiant saveEtudiant(Etudiant etudiant) {
        repository.save(etudiant);
        return etudiant;
    }

    public Etudiant updateEtudiant(Etudiant etudiant, Long id) {
        final Optional<Etudiant> etudiantToUpdate = repository.findById(id);
        etudiantToUpdate.ifPresent(e -> doIt(etudiant, e));
        final Etudiant etudiantUpdated = etudiantToUpdate.get();
        etudiantUpdated.setNom(etudiant.getNom());
        return repository.save(etudiantUpdated);
    }

    @SneakyThrows
    private void doIt(Etudiant etudiant, Etudiant etudiantToUpdate) {
        if(etudiantToUpdate.getId() != etudiant.getId())
            throw new Exception("Wrong id");
    }
}
