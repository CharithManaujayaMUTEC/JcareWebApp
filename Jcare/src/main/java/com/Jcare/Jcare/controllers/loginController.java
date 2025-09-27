package com.Jcare.Jcare.controllers;
import com.Jcare.Jcare.Services.LogInDetailsService;
import com.Jcare.Jcare.models.Employess;
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
        // Fetch the saved user to get name, role, and department
        Employess user = logInDetailsService.getUserByEmployeeId(request.get("employeeid"));

        return ResponseEntity.ok(Map.of(
                "token", token,
                "employeeid", user.getEmployeeId(),
                "role", user.getRole(),
                "name", user.getName(),
                "department", user.getDepartment()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String token = logInDetailsService.authenticateUser(request.get("employeeid"), request.get("password"));
        // Fetch user details after authentication
        Employess user = logInDetailsService.getUserByEmployeeId(request.get("employeeid"));

        return ResponseEntity.ok(Map.of(
                "token", token,
                "employeeid", user.getEmployeeId(),
                "role", user.getRole(),
                "name", user.getName(),
                "department", user.getDepartment()
        ));
    }

    @GetMapping("/test")
    public String testEndpoint() {
        return "API is working!";
    }
}
