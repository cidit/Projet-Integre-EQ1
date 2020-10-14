package com.equipe1.service;

import com.equipe1.model.Candidature;
import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StageService {

    @Autowired
    private StageRepository stageRepository;
    @Autowired
    private EmployeurService employeurService;
    @Autowired
    private CandidatureService candidatureService;

    public StageService(StageRepository stageRepository){
        this.stageRepository = stageRepository;
    }

    public List<Stage> getStages(){
        return stageRepository.findAll();
    }

    public List<Stage> getStagesByEmployeur(Long idEmployeur){
        Employeur employeur = employeurService.getEmployeurById(idEmployeur);

        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesResul = new ArrayList<>();

        for (Stage result: stages) {
            if(result.getEmployeur().getId() == employeur.getId()){
                stagesResul.add(result);
            }
            System.out.println(result.getEmployeur().getNomEntreprise());
        }

        return stagesResul;
    }
    public List<Stage> getStagesEtudiant(Long idEtudiant){
        List<Candidature> candidatures = candidatureService.findCandidatureByEtudiant(idEtudiant);
        List<Stage> stages = stageRepository.findAll();
        List<Stage> stagesResul = new ArrayList<>();
        boolean isStageStudentCanApply;
        for (Stage resultStage: stages) {
            isStageStudentCanApply = true;
            for (Candidature resultCandidature: candidatures) {
                if(resultStage.getId().equals(resultCandidature.getStage().getId()))
                    isStageStudentCanApply = false;
            }
            if (isStageStudentCanApply)
                stagesResul.add(resultStage);
        }

        return stagesResul;
    }

    public Optional<Stage> findStageById(Long idStage){
        return stageRepository.findById(idStage);
    }

    public Stage saveStage(Stage stage){
        stageRepository.save(stage);
        return stage;
    }

    public Stage updateStage(Stage newStage, long id){
        Optional<Stage> optionalStage = stageRepository.findById(id);
        optionalStage.get().setTitre(newStage.getTitre());
        optionalStage.get().setDescription(newStage.getDescription());
        optionalStage.get().setExigences(newStage.getExigences());
        optionalStage.get().setDateDebut(newStage.getDateDebut());
        optionalStage.get().setDateFin(newStage.getDateFin());
        optionalStage.get().setNbHeuresParSemaine(newStage.getNbHeuresParSemaine());
        optionalStage.get().setNbAdmis(newStage.getNbAdmis());
        optionalStage.get().setOuvert(newStage.isOuvert());
        optionalStage.get().setDateLimiteCandidature(newStage.getDateLimiteCandidature());
        optionalStage.get().setProgramme(newStage.getProgramme());
        return stageRepository.save(optionalStage.get());
    }

}
