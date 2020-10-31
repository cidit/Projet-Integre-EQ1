package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContratService {

    @Autowired
    private ContratRepository contratRepository;

    @Autowired
    private CandidatureRepository candidatureRepository;

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

    public List<Contrat> getContratsByEmployeur(Employeur employeur){
        return contratRepository.findByEmployeur(employeur);
    }

    public List<Contrat> getContratsByEtudiantChoisi(Etudiant etudiant) {
        List<Contrat> contratSignatureEmployeurOk = new ArrayList<>();

        for (Candidature candidatureTmp: candidatureRepository.findAll()) {
            if(isSigneParEmployeur(etudiant, candidatureTmp)){
                contratSignatureEmployeurOk.add(candidatureTmp.getContrat());
            }
        }

        return contratSignatureEmployeurOk;
    }

    private boolean isSigneParEmployeur(Etudiant etudiant, Candidature candidatureTmp) {
        return candidatureTmp.getEtudiant().equals(etudiant)
                && candidatureTmp.getContrat() != null
                && candidatureTmp.getContrat().getSignatureEmployeur() !=null
                &&candidatureTmp.getContrat().getSignatureEmployeur().equals(Contrat.SignatureEtat.SIGNE);
    }

    public Contrat updateStatutContrat(String user, Contrat.SignatureEtat etat, Long id) {
        Contrat contrat = contratRepository.findById(id).get();
        if (user.equals("Employeur")){
            if (etat.equals(Contrat.SignatureEtat.EN_ATTENTE))

            contrat.setSignatureEmployeur(etat);
        }
        contratRepository.save(contrat);
        return contrat;
    }
}
