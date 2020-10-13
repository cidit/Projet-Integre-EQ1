package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.model.User;
import com.equipe1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("findAll")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/get/{email}/{password}")
    public User getUser(@PathVariable String email, @PathVariable String password){
        var optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            return null;
        var user = optionalUser.get();
        return user.getPassword().equals(password) ? user: null;
    }

    @GetMapping("email")
    public Optional<User> getEmployeurByEmail(@RequestParam("email") String email){
        return userRepository.findByEmail(email);
    }
}
