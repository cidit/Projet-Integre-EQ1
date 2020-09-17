package com.equipe1.service;

import com.equipe1.model.Employeur;
import com.equipe1.repository.EmployeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeurService {

    @Autowired
    private EmployeurRepository employeurRepo;

    public EmployeurService (EmployeurRepository employeurRepository){
        this.employeurRepo= employeurRepository;
    }

    public List<Employeur> getEmployeurs(){
        return employeurRepo.findAll();
    }

    public Employeur getEmployeurById(Long idEmployeur){
        return employeurRepo.findById(idEmployeur).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,String.format("Invalid Employeur id %s",idEmployeur)));
    }

    public Employeur saveEmployeur(Employeur employeur){
        employeurRepo.save(employeur);
        return employeur;
    }

    /*public Employeur updateEmployeur(Employeur newEmployeur, long id){
        return employeurRepo.findById(id).map(employeur -> {
                                            employeur.setNom(newEmployeur.getNom());
                                            employeur.setTelephone(newEmployeur.getTelephone());
                                            employeur.setAdresse(newEmployeur.getAdresse());
                                            return employeurRepo.save(employeur);
                                        }).orElseGet(()-> {newEmployeur.setId(id);
                                            return employeurRepo.save(newEmployeur);
                                        });
    }*/

    public Employeur updateEmployeur(Employeur newEmployeur, long id){

        Optional<Employeur> optionalEmployeur = employeurRepo.findById(id);
        if(optionalEmployeur.isPresent()){
            optionalEmployeur.get().setNom(newEmployeur.getNom());
            optionalEmployeur.get().setTelephone(newEmployeur.getTelephone());
            optionalEmployeur.get().setAdresse(newEmployeur.getAdresse());
            return employeurRepo.save(optionalEmployeur.get());
        }else
            newEmployeur.setId(id);
            return employeurRepo.save(newEmployeur);
    }

}
