package com.Jcare.Jcare.controllers;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class loginController{
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    @GetMapping("/logout")
    public String logout(){
        return "login";
    }
    @GetMapping("/register")
    public String register(){
        return "register";
    }
}
