package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.Employess;
import com.Jcare.Jcare.repositories.EmployessRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final EmployessRepo employeeRepo;

    public AdminService(EmployessRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    // Get all employees
    public List<Employess> getAllEmployees() {
        return employeeRepo.findAll();
    }

    // Update role/permissions
    public Employess updateRole(String employeeId, String newRole) {
        Employess employee = employeeRepo.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setRole(newRole);
        return employeeRepo.save(employee);
    }

    // Activate/deactivate employee
    public Employess setActiveStatus(String employeeId, boolean active) {
        Employess employee = employeeRepo.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setActive(active);
        return employeeRepo.save(employee);
    }
}