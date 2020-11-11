package com.equipe1.service;

import com.equipe1.model.Reminder;
import com.equipe1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<Reminder> getRemindersFor(long userId){
        var optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return null; // TODO
        } else {
            return null; // TODO
        }
    }
}
