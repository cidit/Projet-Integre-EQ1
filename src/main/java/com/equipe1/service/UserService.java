package com.equipe1.service;

import com.equipe1.model.User;
import com.equipe1.model.Rappel;
import com.equipe1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            return null;
        User user = optionalUser.get();
        return user.getPassword().equals(password) ? user: null;
    }

    public User getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            return null;
        User user = optionalUser.get();
        return user.getEmail().equals(email) ? user: null;
    }

    public boolean validateUserCredentials(Long id, String password) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            return false;
        User user = optionalUser.get();
        return user.getPassword().equals(password);
    }
}

    public List<Rappel> getRemindersFor(long userId){
        var optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return null; // TODO
        } else {
            return null; // TODO
        }
    }
}
