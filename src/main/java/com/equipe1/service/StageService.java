package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StageService {

    @Autowired
    private StageRepository stageRepository;


    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    CourrielService courrielService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    Environment env;

    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public List<Stage> getStages() {
        return stageRepository.findAll();
    }

    public List<Stage> getStagesSessionEnCours()
    {
        Session sessionEnCours = sessionService.findCurrentSession().get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesFiltresAvecSession = new ArrayList<>();
        for(Stage stage : stages){
            if(stage.getSession().equals(sessionEnCours))
                stagesFiltresAvecSession.add(stage);
        }
        return stagesFiltresAvecSession;
    }

    public List<Stage> getStagesByEmployeur(Long idEmployeur) {
        Session sessionEnCours = sessionService.findCurrentSession().get();
        List<Stage> stages = new ArrayList<>();

        for (Stage stage : stageRepository.findAll()) {
            if (stage.getEmployeur().getId() == idEmployeur && stage.getSession().equals(sessionEnCours))
                stages.add(stage);
        }
        return stages;
    }

    public List<Stage> getStagesEtudiant(Long idEtudiant) {
        List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(idEtudiant);
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesResul = new ArrayList<>();
        boolean isStageStudentCanApply;
        for (Stage resultStage : stages) {
            isStageStudentCanApply = false;
            for (Etudiant etudiant : resultStage.getEtudiantsAdmits()){
                if(etudiant.getId().equals(idEtudiant))
                    isStageStudentCanApply = true;
            }
            for (Candidature resultCandidature : candidatures) {
                if (resultStage.getId().equals(resultCandidature.getStage().getId()))
                    isStageStudentCanApply = false;
            }
            if (isStageStudentCanApply && resultStage.isOuvert() && resultStage.getStatut() == Stage.StageStatus.APPROVED)
                stagesResul.add(resultStage);
        }
        return stagesResul;
    }

    public Optional<Stage> findStageById(Long idStage) {
        return stageRepository.findById(idStage);
    }

    public Stage saveStage(Stage stage) {
        Session sessionEnCours = sessionService.findCurrentSession().get();
        stage.setSession(sessionEnCours);
        stageRepository.save(stage);
        return stage;
    }

    public Stage updateStage(Stage newStage, long id) {
        Optional<Stage> optionalStage = stageRepository.findById(id);
        optionalStage.get().setTitre(newStage.getTitre());
        optionalStage.get().setDescription(newStage.getDescription());
        optionalStage.get().setExigences(newStage.getExigences());
        optionalStage.get().setDateDebut(newStage.getDateDebut());
        optionalStage.get().setDateFin(newStage.getDateFin());
        optionalStage.get().setNbHeuresParSemaine(newStage.getNbHeuresParSemaine());
        optionalStage.get().setNbAdmis(newStage.getNbAdmis());
        optionalStage.get().setOuvert(newStage.isOuvert());
        optionalStage.get().setStatut(newStage.getStatut());
        optionalStage.get().setDateLimiteCandidature(newStage.getDateLimiteCandidature());
        optionalStage.get().setProgramme(newStage.getProgramme());
        optionalStage.get().setSalaire(newStage.getSalaire());
        return stageRepository.save(optionalStage.get());

    }

    public Stage updateStatus(Stage newStage, long id) throws Exception {
        Stage stage = newStage;
        stage.setStatut(Stage.StageStatus.APPROVED);
        stage.setOuvert(true);

        courrielService.sendSimpleMessage(new Courriel(stage.getEmployeur().getEmail(),
                env.getProperty("my.subject.stage"), env.getProperty("my.message.stageApprouve")),
                stage.getEmployeur().getNom());
        return updateStage(stage, id);
    }

    public Stage updateEtudiantsAdmits(long stageId, Set<Etudiant> etudiants) {
        var optionnalStage = stageRepository.findById(stageId);
        if (optionnalStage.isPresent()) {
            var stage = optionnalStage.get();
            stage.setEtudiantsAdmits(etudiants);
            return stageRepository.save(stage);
        } else
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("there are no stage with id %s", stageId));
    }

    public Set<Etudiant> getEtudiantsAdmits(long stageId) {
        Optional<Stage> optionnalStage = stageRepository.findById(stageId);
        if (optionnalStage.isPresent()) {
            var stage = optionnalStage.get();
            return stage.getEtudiantsAdmits();
        } else
            return null;
    }

    public List<Stage> getStagesApprouves() {
        Session sessionEnCours = sessionService.findCurrentSession().get();
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesApprouves = new ArrayList<>();
        for (Stage stage : stages) {
            if (stage.getStatut() == Stage.StageStatus.APPROVED && stage.getSession().equals(sessionEnCours)){
                stagesApprouves.add(stage);
            }
        }
        return stagesApprouves;
    }

    public List<Stage> getStagesAyantAucunStagiaire() {
        List<Stage> stages = stageRepository.findAll();
        List<Stage> resultStages = new ArrayList<>();
        for (Stage stage : stages) {
            if (!hasStagiare(stage))
                resultStages.add(stage);
        }
        return resultStages;
    }

    private boolean hasStagiare(Stage stage) {
        List<Candidature> candidatures = candidatureService.findCandidatureByStage(stage.getId());
        for(Candidature candidature : candidatures){
            if(candidature.getStatut().equals(Candidature.CandidatureStatut.CHOISI))
                return true;
        }
        return false;
    }
}
