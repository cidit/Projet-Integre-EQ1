package com.equipe1.service;

import com.equipe1.model.Candidature;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.repository.CandidatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatureService {
    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    private StageService stageService;
    @Autowired
    private EtudiantService etudiantService;

    public CandidatureService(CandidatureRepository candidatureRepository){
        this.candidatureRepository = candidatureRepository;
    }

    public List<Candidature> getCandidatures(){
        return candidatureRepository.findAll();
    }

    public Optional<Candidature> findCandidatureById(Long idCandidature){
        return candidatureRepository.findById(idCandidature);
    }

    public Candidature createCandidature(Long idEtudiant, Long idStage){
        Candidature candidature = new Candidature();
        candidature.setStatut("En cours");
        Etudiant etudiant = etudiantService.findEtudiantById(idEtudiant).get();
        Stage stage = stageService.findStageById(idStage).get();
        candidature.setEtudiant(etudiant);
        candidature.setStage(stage);
        candidatureRepository.save(candidature);
        return candidature;
    }

    public Candidature updateCandidature(Candidature newCandidature, long id){
        Candidature updatedCandidature = candidatureRepository.findById(id).get();
        updatedCandidature.setStatut(newCandidature.getStatut());
        return candidatureRepository.save(updatedCandidature);
    }


}
