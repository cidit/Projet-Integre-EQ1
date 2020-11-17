package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.CandidatureRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private SessionRepository sessionRepository;

    private SessionService sessionService;

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

    public List<Candidature> findAllByStage(Long stage){
        List<Candidature> all = getCandidatures();
        List<Candidature> candidatures = new ArrayList<>();
        for (Candidature result: all) {
            if(result.getStage().getId().equals(stage))
                candidatures.add(result);
        }

        return candidatures;
    }


    public Candidature updateCandidatureChoisi(Long id) {
        Candidature updatedCandidature = candidatureRepository.findById(id).get();
        updatedCandidature.setStatut(Candidature.CandidatureStatut.CHOISI);
        Candidature savedCandidature = candidatureRepository.save(updatedCandidature);

        Optional<Session> session = sessionRepository.findCurrentAccordingTo(LocalDate.now());
        Set<Candidature> currentSessionCandidatures = session.get().getCandidatures();
        currentSessionCandidatures.add(savedCandidature);
        session.get().setCandidatures(currentSessionCandidatures);
        sessionRepository.save(session.get());

        return savedCandidature;
    }

    public Optional<Candidature> getCandidatureChoisi(Long id) {
        Optional<Candidature> optionalCandidature = Optional.empty();
        boolean flag = false;
        Set<Candidature> currentSessionCandidatures = new HashSet<>();
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        if (optionalEtudiant.isPresent()) {
            Optional<Session> session = sessionRepository.findCurrentAccordingTo(LocalDate.now());
            flag = session.get().getEtudiants().stream().anyMatch(etudiant -> etudiant.getId() == id);
            currentSessionCandidatures = session.get().getCandidatures();
        }
        if (flag){
            Set<Candidature> filtered = currentSessionCandidatures.stream()
                                        .filter(candidature -> candidature.getEtudiant().getId() == id && candidature.getStatut() == Candidature.CandidatureStatut.CHOISI)
                                        .collect(Collectors.toSet());
            System.out.println(filtered);
            if (!filtered.isEmpty())
                optionalCandidature = Optional.of(filtered.iterator().next());
        }
        return optionalCandidature;
    }

    public List<Candidature> getListCandidaturesChoisis(Candidature.CandidatureStatut status){
        return candidatureRepository.findByStatut(status);
    }

    public List<Candidature> getListByDateStage(){
        List<Candidature> candidatureBydateStage= new ArrayList<>();
        for (Candidature c: candidatureRepository.findAll()) {
            if(LocalDate.now().isAfter(c.getStage().getDateDebut().plusMonths(1L))){
                candidatureBydateStage.add(c);
            };
        }
        return candidatureBydateStage;
    }
}
