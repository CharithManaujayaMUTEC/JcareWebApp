package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.config.JwtUtil;
import com.Jcare.Jcare.models.Employess;
import com.Jcare.Jcare.repositories.EmployessRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
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

    public String registerUser(String name, String password) {
        if (employessRepo.findByName(name).isPresent()) {
            throw new RuntimeException("User already exists!");
        }

        Employess user = new Employess();
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");  // ✅ Set a single role

        employessRepo.save(user);  // ✅ JUST SAVE! Don't assign to a generic variable.

        return jwtUtil.generateToken(name);
    }

    public String authenticateUser(String name, String password) {
        Optional<Employess> userOptional = employessRepo.findByName(name);
        if (userOptional.isEmpty() || !passwordEncoder.matches(password, userOptional.get().getPassword())) {
            throw new RuntimeException("Invalid credentials!");
        }
        return jwtUtil.generateToken(name);
    }
}
