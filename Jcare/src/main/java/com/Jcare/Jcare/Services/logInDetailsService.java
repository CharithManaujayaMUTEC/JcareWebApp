package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.config.JwtUtil;
import com.Jcare.Jcare.models.Employess;
import com.Jcare.Jcare.repositories.EmployessRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class LogInDetailsService {
    private final EmployessRepo employessRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LogInDetailsService(EmployessRepo employessRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.employessRepo = employessRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String registerUser(String employeeId, String name, String email, String password, String department) {
        if (employessRepo.findByEmployeeId(employeeId).isPresent()) {
            throw new RuntimeException("User already exists!");
        }

        Employess user = new Employess();
        user.setName(name);
        user.setEmail(email);
        user.setDepartment(department);
        user.setEmployeeId(employeeId);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        user.setRole("USER");  // Store role in DB

        employessRepo.save(user);

        return jwtUtil.generateToken(user.getEmployeeId(), user.getRole()); // Use dynamic role
    }

    public String authenticateUser(String employeeId, String password) {
        Optional<Employess> userOptional = employessRepo.findByEmployeeId(employeeId);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        Employess user = userOptional.get();

        // Check password securely
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials!");
        }

        // Generate JWT with only employee ID & role (not password)
        return jwtUtil.generateToken(user.getEmployeeId(), user.getRole());  // Correct Token Generation
    }

    public Employess getUserByEmployeeId(String employeeId) {
        return employessRepo.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
