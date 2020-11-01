package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContratService {

    @Autowired
    private ContratRepository contratRepository;

    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    CandidatureService candidatureService;

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

    public Contrat updateContrat(MultipartFile file,  Long idContrat, String desc) throws IOException {
        Contrat contrat = contratRepository.findById(idContrat).get();
        contrat.setDocumentContrat(file.getBytes());
        if (desc.equals("Employeur"))
            contrat.setSignatureEmployeur(Contrat.SignatureEtat.EN_ATTENTE);
        if (desc.equals("Etudiant"))
            contrat.setSignatureEtudiant(Contrat.SignatureEtat.EN_ATTENTE);
        if (desc.equals("Administration"))
            contrat.setSignatureAdmin(Contrat.SignatureEtat.EN_ATTENTE);
        //si ya los tiene no crea una nueva
        return contratRepository.save(contrat);
    }

    public boolean isCandidatureHasContrat (Long candidatureId){
        boolean hasContrat = false;
        Optional <Candidature> candidature = candidatureService.findCandidatureById(candidatureId);
        for (Contrat c: contratRepository.findAll()) {
               hasContrat = c.getCandidature().equals(candidature.get());
        }
        return hasContrat;
    }


    private boolean isSigneParEmployeur(Etudiant etudiant, Candidature candidatureTmp) {
        return candidatureTmp.getEtudiant().equals(etudiant)
                && candidatureTmp.getContrat() != null
                && candidatureTmp.getContrat().getSignatureEmployeur() !=null
                &&candidatureTmp.getContrat().getSignatureEmployeur().equals(Contrat.SignatureEtat.SIGNE);
    }

    public Contrat updateStatutContrat(String desc, Contrat.SignatureEtat etat, Long id) {
        Contrat contrat = contratRepository.findById(id).get();
        if (desc.equals("Employeur"))
            contrat.setSignatureEmployeur(etat);
        if (desc.equals("Etudiant"))
            contrat.setSignatureEtudiant(etat);
        if (desc.equals("Admin"))
            contrat.setSignatureAdmin(etat);

        contratRepository.save(contrat);
        return contrat;
    }
}
