package com.equipe1.controller;

import com.equipe1.model.User;
import com.equipe1.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("findAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/get/{email}/{password}")
    public User getUser(@PathVariable String email, @PathVariable String password){
        return userService.getUser(email, password);
    }

    @GetMapping("/get/{email}")
    public User getUserByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/validate/{id}/{password}")
    public boolean validateUserCredentials(@PathVariable Long id, @PathVariable String password){
        return userService.validateUserCredentials(id, password);
    }
}
