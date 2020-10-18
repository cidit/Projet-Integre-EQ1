package com.equipe1.controller;

import com.equipe1.model.CV;
import com.equipe1.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;



// TODO: UNTESTED



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cvs")
public class CVController {

    @Autowired
    private CVService cvService;

    @GetMapping("/get/{id}")
    public CV getCV(@PathVariable long id) {
        return cvService.getCVById(id);
    }



    @GetMapping("/get/all")
    public List<CV> getCVs() {
        return cvService.getCVs();
    }


    @PutMapping("/create/{idEtudiant}")
    public CV saveCV(@RequestParam("file") MultipartFile multipartFile, @PathVariable Long idEtudiant) throws IOException {
        return cvService.saveEtudiantCV(idEtudiant, multipartFile);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCV(@PathVariable long id) {
        cvService.deleteCV(id);
    }
}
