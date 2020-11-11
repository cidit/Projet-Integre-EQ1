package com.equipe1.service;

import com.equipe1.model.Etudiant;
import com.equipe1.model.Session;
import com.equipe1.repository.EtudiantRepository;
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
    @Autowired
    private EtudiantRepository etudiantRepository;

    public List<Session> getAll() {
        return sessionRepository.findAll();
    }

    public Optional<Session> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    public Session create(Session session) {
        session.setDateDebut(LocalDate.now());
        Optional<Session> lastSession = sessionRepository.findCurrentSession();
        List<Etudiant> etudiants =  etudiantRepository.findAll();
        if (!lastSession.isEmpty()){
            lastSession.get().setCurrent(false);
            sessionRepository.save(lastSession.get());
        }

        for(Etudiant etudiant : etudiants){
            etudiant.setEnregistre(false);
            etudiantRepository.save(etudiant);
        }
        return sessionRepository.save(session);
    }

    public void delete(long id) {
        sessionRepository.deleteById(id);
    }

    public Optional<Session> findCurrentSession() { return sessionRepository.findCurrentSession(); };
}
