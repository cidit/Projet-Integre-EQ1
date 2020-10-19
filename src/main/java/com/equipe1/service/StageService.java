package com.equipe1.service;

import com.equipe1.model.Candidature;
import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class StageService {

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private EmployeurService employeurService;
    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    NotificationCourrielService notificationCourrielService;

    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public List<Stage> getStages() {
        return stageRepository.findAll();
    }

    public List<Stage> getStagesByEmployeur(Long idEmployeur) {
        Employeur employeur = employeurService.getEmployeurById(idEmployeur);
        List<Stage> stages = new ArrayList<>();

        for (Stage stageTemp : stageRepository.findAll()) {
            if (stageTemp.getEmployeur().getId() == employeur.getId()) {
                stages.add(stageTemp);
            }
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
            if (isStageStudentCanApply && resultStage.isOuvert() && resultStage.isApprouve())
                stagesResul.add(resultStage);
        }

        return stagesResul;
    }

    public Optional<Stage> findStageById(Long idStage) {
        return stageRepository.findById(idStage);
    }

    public Stage saveStage(Stage stage) {
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
        optionalStage.get().setApprouve(newStage.isApprouve());
        optionalStage.get().setDateLimiteCandidature(newStage.getDateLimiteCandidature());
        optionalStage.get().setProgramme(newStage.getProgramme());
        return stageRepository.save(optionalStage.get());
    }

    public Stage updateStatus(Stage newStage, long id) throws Exception {
        Stage stage = newStage;
        stage.setApprouve(true);
        stage.setOuvert(true);
        notificationCourrielService.sendMail(stage.getEmployeur());
        return updateStage(stage, id);
    }

    public Stage updateEtudiantsAdmits(long stageId, Set<Etudiant> etudiants) {
        var optionnalStage = stageRepository.findById(stageId);
        if (optionnalStage.isPresent()) {
            var stage = optionnalStage.get();
            stage.setEtudiantsAdmits(etudiants);
            return stageRepository.saveAndFlush(stage);
        } else
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("there are no stage with id %s", stageId));
    }

}
