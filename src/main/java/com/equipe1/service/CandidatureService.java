package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CandidatureService {

    @Autowired
    private CandidatureRepository candidatureRepository;

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private CourrielService courrielService;
    public CandidatureService(CandidatureRepository candidatureRepository){
        this.candidatureRepository = candidatureRepository;
    }

    public List<Candidature> getCandidatures(){
        return candidatureRepository.findAll();
    }

    public Optional<Candidature> findCandidatureById(Long idCandidature){
        return candidatureRepository.findById(idCandidature);
    }

    public List<Candidature> findCandidatureByStage(Long idStage){
        Stage stage = stageRepository.findById(idStage).get();
        List<Candidature> candidatures = candidatureRepository.findAll();
        List<Candidature> candidatureList = new ArrayList<>();
        for (Candidature result: candidatures) {
            if(result.getStage().equals(stage))
                candidatureList.add(result);
        }
        return candidatureList;
    }
    public List<Candidature> findCandidatureByEtudiant(Long idEtudiant){

        Etudiant etudiant = etudiantRepository.findById(idEtudiant).get();
        List<Candidature> candidatures = candidatureRepository.findAll();
        List<Candidature> candidatureList = new ArrayList<>();
        for (Candidature result: candidatures) {
            if(result.getEtudiant().equals(etudiant))
                candidatureList.add(result);
        }
        return candidatureList;
    }

    public Candidature createCandidature(Long idEtudiant, Long idStage){
        Candidature candidature = new Candidature();
        Optional<Stage> stage = stageRepository.findById(idStage);
        Optional<Etudiant> etudiant = etudiantRepository.findById(idEtudiant);
        candidature.setEtudiant(etudiant.isPresent() ?etudiant.get() : null);
        candidature.setStage(stage.isPresent() ? stage.get() : null);
        candidatureRepository.save(candidature);
        return candidature;
    }

    public Candidature updateCandidatureApprouve(Long id) throws Exception {
        Candidature updatedCandidature = candidatureRepository.findById(id).get();
        updatedCandidature.setStatut(Candidature.CandidatureStatut.APPROUVE);
        candidatureRepository.save(updatedCandidature);
        courrielService.sendCandidatureStatusUpdate(updatedCandidature);
        return updatedCandidature;
    }

    public Candidature save(Candidature candidature){
        return candidatureRepository.save(candidature);
    }


    public Candidature updateCandidatureChoisi(Long id) {
        Candidature updatedCandidature = candidatureRepository.findById(id).get();
        updatedCandidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        return candidatureRepository.save(updatedCandidature);
    }

    public Optional<Candidature> getCandidatureChoisi(Long id) {
        Optional<Candidature> optionalCandidature = candidatureRepository.findCandidatureByEtudiant_Id(id, Candidature.CandidatureStatut.CHOISI);
        return optionalCandidature;
    }

    public List<Candidature> getListCandidaturesChoisis(Candidature.CandidatureStatut status){
        return candidatureRepository.findByStatut(status);
    }
}
