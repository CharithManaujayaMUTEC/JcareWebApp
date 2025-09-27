package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.models.Employess;
import com.Jcare.Jcare.Services.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Fetch all employees
    @GetMapping("/getAllEmployees")
    public List<Employess> getAllEmployees() {
        return adminService.getAllEmployees();
    }

    // Update role/permissions
    @PostMapping("/updateRole")
    public Employess updateRole(@RequestBody RoleUpdateRequest request) {
        return adminService.updateRole(request.getEmployeeId(), request.getRole());
    }

    // Activate/deactivate
    @PostMapping("/setActiveStatus")
    public Employess setActiveStatus(@RequestBody StatusUpdateRequest request) {
        return adminService.setActiveStatus(request.getEmployeeId(), request.isActive());
    }

    // Request DTOs
    public static class RoleUpdateRequest {
        private String employeeId;
        private String role;
        public String getEmployeeId() { return employeeId; }
        public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class StatusUpdateRequest {
        private String employeeId;
        private boolean active;
        public String getEmployeeId() { return employeeId; }
        public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }
}