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

import java.io.ByteArrayOutputStream;
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
    @Autowired
    GenerateurPdfService generateurPdfService;

    public List<Contrat> getContrats() {
        return contratRepository.findAll();
    }

    public Contrat getContratById(long id) {
        return contratRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid contrat id %s", id)));
    }

    public Contrat saveContrat(Contrat contrat) {
        return contratRepository.save(contrat);
    }

    public List<Contrat> findAll() {
        return contratRepository.findAll();
    }

    public List<Contrat> getContratsByEmployeur(Employeur employeur) {
        return contratRepository.findByEmployeur(employeur);
    }

    public List<Contrat> getContratsByEtudiantChoisi(Etudiant etudiant) {
        List<Contrat> contratSignatureEmployeurOk = new ArrayList<>();

        for (Candidature candidatureTmp : candidatureRepository.findAll()) {
            if (isSigneParEmployeur(etudiant, candidatureTmp)) {
                contratSignatureEmployeurOk.add(candidatureTmp.getContrat());
            }
        }
        return contratSignatureEmployeurOk;
    }

    public Contrat createContrat(MultipartFile file, Long idCandidature) throws IOException {
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        Optional<Contrat> contrat = contratRepository.findByCandidature(candidature.get());
        if (contrat.isPresent()) {
            contrat.get().setDocumentContrat(file.getBytes());
            contratRepository.save(contrat.get());
            return contrat.get();
        } else {
            Contrat newContrat = createContratBuilder(candidature);
            newContrat.setDocumentContrat(file.getBytes());
            return contratRepository.save(newContrat);
        }
    }

    public Contrat createContrat(Long idCandidature) throws Exception {
        Optional<Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
            Contrat newContrat = createContratBuilder(candidature);
            newContrat.setDocumentContrat(newContratDocument(candidature).toByteArray());
            return contratRepository.save(newContrat);
    }



    public ByteArrayOutputStream createApercueContrat(Long idCandidature) throws Exception {
        Optional <Candidature> candidature = candidatureService.findCandidatureById(idCandidature);
        return newContratDocument(candidature);
    }

    private ByteArrayOutputStream newContratDocument(Optional<Candidature> candidature) throws Exception {
        return generateurPdfService.createPdf(candidature.get().getStage(),
                candidature.get().getStage().getEmployeur(), candidature.get().getEtudiant());
    }

    public boolean candidatureHasContrat(Long candidatureId) {
        boolean hasContrat = false;
        Optional<Candidature> candidature = candidatureService.findCandidatureById(candidatureId);
        for (Contrat c : contratRepository.findAll()) {
            hasContrat = c.getCandidature().equals(candidature.get());
        }
        return hasContrat;
    }


    private boolean isSigneParEmployeur(Etudiant etudiant, Candidature candidatureTmp) {
        return candidatureTmp.getEtudiant().equals(etudiant)
                && candidatureTmp.getContrat() != null
                && candidatureTmp.getContrat().getSignatureEmployeur() != null
                && candidatureTmp.getContrat().getSignatureEmployeur().equals(Contrat.SignatureEtat.SIGNE);
    }

    private Contrat createContratBuilder(Optional<Candidature> candidature) {
        Contrat newContrat = Contrat.builder()
                .dateFinale(candidature.get().getStage().getDateFin())
                .dateGeneration(LocalDate.now())
                .signatureAdmin(Contrat.SignatureEtat.PAS_SIGNE)
                .signatureEmployeur(Contrat.SignatureEtat.PAS_SIGNE)
                .signatureEtudiant(Contrat.SignatureEtat.PAS_SIGNE)
                .candidature(candidature.get())
                .dateFinale(candidature.get().getStage().getDateFin())
                .employeur(candidature.get().getStage().getEmployeur())
                .build();
        return newContrat;
    }
}
