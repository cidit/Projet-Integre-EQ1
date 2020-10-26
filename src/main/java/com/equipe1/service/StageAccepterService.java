package com.equipe1.service;

import com.equipe1.model.Stage;
import com.equipe1.model.StageAccepter;
import com.equipe1.repository.StageAccepterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StageAccepterService {

    @Autowired
    private StageAccepterRepository stageAccepterRepository;

    public StageAccepter saveStageAccepter(Stage stage) {
        StageAccepter stageAccepter = new StageAccepter();
        stageAccepter.setTitre(stage.getTitre());
        stageAccepter.setDescription(stage.getDescription());
        stageAccepter.setExigences(stage.getExigences());
        stageAccepter.setDateDebut(stage.getDateDebut());
        stageAccepter.setDateFin(stage.getDateFin());
        stageAccepter.setNbHeuresParSemaine(stage.getNbHeuresParSemaine());
        stageAccepter.setVille(stage.getVille());
        stageAccepter.setSalaire(stage.getSalaire());

        stageAccepter.setNomEntreprise(stage.getEmployeur().getNom());
        stageAccepter.setTelephone(stage.getEmployeur().getTelephone());
        stageAccepter.setAdresse(stage.getEmployeur().getAdresse());
        return stageAccepterRepository.save(stageAccepter);
    }

    public StageAccepter updateStageAccepter(Stage stage, Long id) {
        Optional<StageAccepter> optionalStageAccepter = stageAccepterRepository.findById(id);
        optionalStageAccepter.get().setTitre(stage.getTitre());
        optionalStageAccepter.get().setDescription(stage.getDescription());
        optionalStageAccepter.get().setExigences(stage.getExigences());
        optionalStageAccepter.get().setDateDebut(stage.getDateDebut());
        optionalStageAccepter.get().setDateFin(stage.getDateFin());
        optionalStageAccepter.get().setNbHeuresParSemaine(stage.getNbHeuresParSemaine());
        optionalStageAccepter.get().setVille(stage.getVille());
        optionalStageAccepter.get().setSalaire(stage.getSalaire());

        optionalStageAccepter.get().setNomEntreprise(stage.getEmployeur().getNom());
        optionalStageAccepter.get().setTelephone(stage.getEmployeur().getTelephone());
        optionalStageAccepter.get().setAdresse(stage.getEmployeur().getAdresse());

        return stageAccepterRepository.save(optionalStageAccepter.get());
    }
}
