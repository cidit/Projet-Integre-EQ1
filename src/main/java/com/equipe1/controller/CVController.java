package com.equipe1.controller;

import com.equipe1.model.CV;
import com.equipe1.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update")
    public CV updateCV(@RequestBody CV cv) {
        return cvService.updateCV(cv);
    }

    @PostMapping("/create")
    public CV createCV(@RequestBody CV cv) {
        return cvService.saveCV(cv);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCV(@PathVariable long id) {
        cvService.deleteCV(id);
    }
}
