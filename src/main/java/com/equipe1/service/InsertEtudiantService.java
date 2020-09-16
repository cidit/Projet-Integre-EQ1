package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class InsertEtudiantService {

    @Autowired
    private EtudiantRepository repository;

    @Transactional
    public void insertEtudiant(){
        Etudiant e1 = new Etudiant("toto");
        repository.save(e1);
        e1 = new Etudiant("tata");
        repository.save(e1);
        e1 = new Etudiant("tutu");
        repository.save(e1);

        e1.setNom("titi");
        repository.save(e1);
    }
}
