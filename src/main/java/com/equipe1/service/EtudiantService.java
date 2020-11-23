package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.model.Candidature;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private CandidatureService candidatureService;

    public EtudiantService(EtudiantRepository etudiantRepository){
        this.etudiantRepository = etudiantRepository;
    }

    public List<Etudiant> getEtudiants(Long idSession){
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiants = etudiantRepository.findAll();
        List<Etudiant> etudiantsSessionEnCours = new ArrayList<>();
        if(!etudiants.isEmpty()){
            etudiantsSessionEnCours = etudiants.stream()
                    .filter(etudiant -> etudiant.getSession().contains(session))
                    .collect(Collectors.toList());
        }

        return etudiantsSessionEnCours;
    }

    public Optional<Etudiant> findEtudiantById(Long idEtudiant){
        return etudiantRepository.findById(idEtudiant);
    }

    public Etudiant saveEtudiant(Etudiant etudiant){
        Session sessionEnCours = sessionRepository.findCurrentSession().get();
        List<Session> sessions = new ArrayList<>();
        sessions.add(sessionEnCours);
        etudiant.setStatutStage("aucun stage");
        etudiant.setSession(sessions);
        etudiant.setEnregistre(true);
        etudiant = etudiantRepository.save(etudiant);
        return etudiant;
    }

    public Etudiant updateEtudiant(Etudiant newEtudiant, long id){
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        optionalEtudiant.get().setProgramme(newEtudiant.getProgramme());
        optionalEtudiant.get().setEmail(newEtudiant.getEmail());
        optionalEtudiant.get().setTelephone(newEtudiant.getTelephone());
        optionalEtudiant.get().setAdresse(newEtudiant.getAdresse());
        optionalEtudiant.get().setCv(newEtudiant.getCv());
        return etudiantRepository.save(optionalEtudiant.get());
    }

    public Optional<Etudiant> findEtudiantByMatricule(String matricule) {
        return etudiantRepository.findByMatricule(matricule);
    }

    public Etudiant getEtudiantByEmail(String email){
        return etudiantRepository.findByEmail(email);
    }

    public List<Etudiant> getEtudiantsByProgramme(String programme, Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiants = etudiantRepository.findAllByProgramme(programme);
        List<Etudiant> etudiantsFiltresAvecSession = new ArrayList<>();
        if (etudiants != null){
            for(Etudiant etudiant : etudiants){
                if(etudiant.getSession().contains(session))
                    etudiantsFiltresAvecSession.add(etudiant);
            }
        }
        return etudiantsFiltresAvecSession;
    }


    public Optional<Etudiant> registerEtudiantSession(long id) {
        var optionalEtudiant = findEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            Optional<Session> session = sessionRepository.findCurrentSession();
            optionalEtudiant.get().getSession().add(session.get());
            optionalEtudiant.get().setEnregistre(true);
            etudiantRepository.save(optionalEtudiant.get());
        }
        return optionalEtudiant;
    }

    public boolean isEtudiantRegistered(long id) {
        var optionalEtudiant = findEtudiantById(id);
        if (optionalEtudiant.isPresent()) {
            Optional<Session> sessionActuelle = sessionRepository.findCurrentSession();
            return optionalEtudiant.get()
                                   .getSession()
                                   .stream()
                                   .anyMatch(sessionEtudiant -> sessionEtudiant.getId() == sessionActuelle.get().getId());
        }
        return false;
    }

    public List<Etudiant> getEtudiantsAucunStage(Long idSession){
        List<Etudiant> etudiants = etudiantRepository.findAll();
        List<Etudiant> resultListEtudiants = new ArrayList<>();
        for (Etudiant etudiant : etudiants){
            if (!hasStage(etudiant, idSession))
                resultListEtudiants.add(etudiant);
        }
        return resultListEtudiants;
    }

    private boolean hasStage(Etudiant etudiant, Long idSession) {
        if(candidatureService.findCandidatureByEtudiant(etudiant.getId(), idSession).isEmpty()){
            return false;
        }
        else {
            List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(etudiant.getId(), idSession);
            for(Candidature candidature : candidatures){
                if(candidature.getStatut().equals(Candidature.CandidatureStatut.CHOISI))
                    return true;
            }
           return false;
        }
    }

    public List<Etudiant> getEtudiantsInscrits() {
        Session sessionEnCours = sessionRepository.findCurrentSession().get();
        List<Etudiant> etudiantsInscrits = etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getSession().contains(sessionEnCours))
                .collect(Collectors.toList());
        return etudiantsInscrits;
    }

    public List<Etudiant> getEtudiantsAucunCV(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiantsInscrits = etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getSession().contains(session) && etudiant.getCv() == null)
                .collect(Collectors.toList());
        return etudiantsInscrits;
    }

    public List<Etudiant> getEtudiantsCVNonApprouve(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiantsInscrits = etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getSession().contains(session) &&
                        etudiant.getCv() != null && etudiant.getCv().getStatus() != CV.CVStatus.APPROVED)
                .collect(Collectors.toList());
        return etudiantsInscrits;
    }

    public List<Etudiant> getEtudiantsAyantEntrevue(Long idSession) {
        Session session = sessionRepository.findById(idSession).get();
        List<Etudiant> etudiantsInscrits = etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getSession().contains(session) && hasEntrevueSession(etudiant.getId(), idSession))
                .collect(Collectors.toList());
        return etudiantsInscrits;
    }

    public boolean hasEntrevueSession(Long idEtudiant, Long idSession){
        List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(idEtudiant, idSession);
        for(Candidature candidature : candidatures){
            if(!candidature.getEntrevueStatut().equals(Candidature.CandidatureEntrevueStatut.PAS_CONVOQUE))
                return true;
        }
        return false;
    }
}


