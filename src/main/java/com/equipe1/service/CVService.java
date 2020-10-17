package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.repository.CVRepository;
import com.equipe1.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    EtudiantRepository etudiantRepository;

    public List<CV> getCVs() {
        return cvRepository.findAll();
    }

    public CV getCVById(long id) {
        return cvRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
    }

    public CV getCVByEtudiantId(long id) {
        var etudiant = etudiantRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
        return etudiant.getCv();
    }

    public CV saveCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
    }

    public CV saveEtudiantCV(long etudiantId, CV cv) {
        var etudiant = etudiantRepository.findById(etudiantId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid Etudiant id %s", etudiantId)));
        etudiant.setCv(cv);
        etudiantRepository.saveAndFlush(etudiant);
        return cv;
    }

    public CV updateCV(CV cv, long id){
        cv.setId(id);
        return updateCV(cv);
    }

    public CV updateCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
    }

    public void deleteCV(long id) {
        cvRepository.deleteById(id);
    }
}
