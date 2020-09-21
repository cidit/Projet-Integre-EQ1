package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class InsertDataService {

    @Autowired
    private EtudiantRepository repository;

    @Transactional
    public void insertEtudiant(){
        Etudiant e1 = new Etudiant();
        e1.setNom("toto");
        repository.save(e1);
        e1 = new Etudiant();
        e1.setNom("tata");
        repository.save(e1);
        e1 = new Etudiant();
        e1.setNom("tete");
        repository.save(e1);

        e1.setNom("titi");
        repository.save(e1);
    }
}
