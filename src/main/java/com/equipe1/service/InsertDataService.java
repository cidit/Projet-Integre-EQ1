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
        Etudiant e1 = new Etudiant();
        e1.setNom("toto");
        e1.setAdresse("432442");
        e1.setEmail("ttt@gg.v");
        e1.setMatricule("4324324");
        e1.setPassword("fewwffew");
        e1.setPrenom("rrrrr");
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

    @Transactional
    public void insertEmployeur(){
        Employeur employeur_1 = new Employeur("employeur_1", "43895893654", "548 ddasdfasdf");
        employeur_1.setPassword("dfsgdfg");
        employeur_1.setEmail("ddd@gm.b");
        employeurRepo.save(employeur_1);
//        employeur_1 = new Employeur("employeur_2", "0000000000", "111 ddasdfasdf");
//        employeurRepo.save(employeur_1);
//        employeur_1 = new Employeur("employeur_3", "11111111111", "33333 ddasdfasdf");
//        employeurRepo.save(employeur_1);

    }
}
