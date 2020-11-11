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
    private EmployeurService employeurService;
    @Autowired
    private CandidatureService candidatureService;

    @Autowired
    CourrielService courrielService;

    @Autowired
    Environment env;

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
            System.out.println("getEmployeur : " + stageTemp);
            System.out.println("employeurById : " + employeur);
            if (stageTemp.getEmployeur().getId().equals(employeur.getId())) {
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
                if(etudiant.getId().equals(idEtudiant)) {
                    isStageStudentCanApply = true;
                    break;
                }
            }
            for (Candidature resultCandidature : candidatures) {
                if (resultStage.getId().equals(resultCandidature.getStage().getId())) {
                    isStageStudentCanApply = false;
                    break;
                }
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
        stageRepository.save(stage);
        return stage;
    }

    public Stage updateStage(Stage newStage, long id) {
        Optional<Stage> optionalStage = stageRepository.findById(id);
        if (optionalStage.isPresent()) {
            var stage = optionalStage.get();
            stage.setTitre(newStage.getTitre());
            stage.setDescription(newStage.getDescription());
            stage.setExigences(newStage.getExigences());
            stage.setDateDebut(newStage.getDateDebut());
            stage.setDateFin(newStage.getDateFin());
            stage.setNbHeuresParSemaine(newStage.getNbHeuresParSemaine());
            stage.setNbAdmis(newStage.getNbAdmis());
            stage.setOuvert(newStage.isOuvert());
            stage.setStatut(newStage.getStatut());
            stage.setDateLimiteCandidature(newStage.getDateLimiteCandidature());
            stage.setProgramme(newStage.getProgramme());
            stage.setSalaire(newStage.getSalaire());
            return stageRepository.save(stage);
        }
        return newStage;
    }

    public Stage updateStatus(Stage newStage, long id) throws Exception {
        newStage.setStatut(Stage.StageStatus.APPROVED);
        newStage.setOuvert(true);

        courrielService.sendSimpleMessage(new Courriel(newStage.getEmployeur().getEmail(),
                env.getProperty("my.subject.stage"), env.getProperty("my.message.stageApprouve")),
                newStage.getEmployeur().getNom());
        return updateStage(newStage, id);
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
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesApprouves = new ArrayList<>();
        for (Stage resultStage : stages) {
            if (resultStage.getStatut() == Stage.StageStatus.APPROVED){
                stagesApprouves.add(resultStage);
            }
        }
        return stagesApprouves;
    }

    public List<Stage> getByStatutWaiting() {
        return stageRepository.getByStatut(Stage.StageStatus.WAITING);
    }
}
