package com.equipe1.service;

import com.equipe1.model.CV;
import com.equipe1.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    public List<CV> getCVs() {
        return cvRepository.findAll();
    }

    public CV getCVById(long id) {
        return cvRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Invalid CV id %s", id)));
    }

    public CV saveCV(CV cv) {
        return cvRepository.saveAndFlush(cv);
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
