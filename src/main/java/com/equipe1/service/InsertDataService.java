package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class InsertDataService {

    @Autowired
    private EtudiantRepository repository;
    @Autowired
    private EmployeurRepository employeurRepo;

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

    @Transactional
    public void insertEmployeur(){
        String email = "none";
        String password = "none";
        Employeur Employeur_1 = new Employeur("employeur_1", "43895893654", "548 ddasdfasdf");
        Employeur_1.setEmail(email);
        Employeur_1.setPassword(password);
        employeurRepo.save(Employeur_1);
        Employeur_1 = new Employeur("employeur_2", "0000000000", "111 ddasdfasdf");
        Employeur_1.setEmail(email);
        Employeur_1.setPassword(password);
        employeurRepo.save(Employeur_1);
        Employeur_1 = new Employeur("employeur_3", "11111111111", "33333 ddasdfasdf");
        Employeur_1.setEmail(email);
        Employeur_1.setPassword(password);
        employeurRepo.save(Employeur_1);

    }


}
