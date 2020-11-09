package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.model.Session;
import com.equipe1.model.Stage;
import com.equipe1.service.EmployeurService;
import com.equipe1.service.SessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController()
@RequestMapping("/sessions")
public class SessionController {
    private SessionService sessionService;

    public SessionController(SessionService sessionService){
        this.sessionService = sessionService;
    }

    @GetMapping("findAll")
    public List<Session> getAllSessions(){
        return sessionService.getAll();
    }

    @GetMapping("get/{id}")
    public Session getSessionById(@PathVariable Long id){
        return sessionService.getSessionById(id);
    }

    @PostMapping("createSession")
    public Session createSession(@RequestBody Session session){
        return sessionService.create(session);
    }

}
