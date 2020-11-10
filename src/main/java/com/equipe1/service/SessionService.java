package com.equipe1.service;

import com.equipe1.model.Session;
import com.equipe1.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    public Optional<Session> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    public Session create(Session session) {
        Optional<Session> lastSession = sessionRepository.findCurrentSession();
        lastSession.get().setCurrent(false);
        sessionRepository.save(lastSession.get());
        return sessionRepository.save(session);
    }

    public void delete(long id) {
        sessionRepository.deleteById(id);
    }

    public Optional<Session> findCurrentSession() { return sessionRepository.findCurrentSession(); };
}
