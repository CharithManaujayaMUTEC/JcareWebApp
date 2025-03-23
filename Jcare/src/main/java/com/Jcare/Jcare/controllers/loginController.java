package com.Jcare.Jcare.controllers;
import com.Jcare.Jcare.Services.LogInDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000/") // Allow React frontend
public class loginController{
    private final LogInDetailsService logInDetailsService;

    public loginController(LogInDetailsService logInDetailsService) {
        this.logInDetailsService = logInDetailsService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        String token = logInDetailsService.registerUser(request.get("employeeid"), request.get("name"), request.get("email"), request.get("password"), request.get("department"));
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String token = logInDetailsService.authenticateUser(request.get("employeeid"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "API is working!";
    }
}
