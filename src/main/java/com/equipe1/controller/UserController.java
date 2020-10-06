package com.equipe1.controller;

import com.equipe1.model.Etudiant;
import com.equipe1.model.User;
import com.equipe1.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;

    @GetMapping("/get")
    public User getUser(@RequestParam String email){
        var optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            return null;
        else return optionalUser.get();
    }
}
