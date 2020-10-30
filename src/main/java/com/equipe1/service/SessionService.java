package com.equipe1.service;

import com.equipe1.model.Session;
import com.equipe1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public Session getCurrent() {
        return sessionRepository.findCurrentAccordingTo(LocalDate.now()).get();
    }

    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    // public Session createValid() {}
}
