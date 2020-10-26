package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Stage;
import com.equipe1.model.StageAccepter;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.StageAccepterRepository;
import com.equipe1.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StageAccepterService {

    @Autowired
    private StageAccepterRepository stageAccepterRepository;

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    public List<StageAccepter> getAllStageAccepter() {
        return stageAccepterRepository.findAll();
    }

    public StageAccepter saveStageAccepter(Long idEtudiant, Long idStage) {
        StageAccepter stageAccepter = new StageAccepter();
        Optional<Stage> stage = stageRepository.findById(idStage);
        Optional<Etudiant> etudiant = etudiantRepository.findById(idEtudiant);
        stageAccepter.setEtudiant(etudiant.get());
        stageAccepter.setStage(stage.get());
        stageAccepterRepository.save(stageAccepter);
        return stageAccepter;
    }
}
