package com.Jcare.Jcare.models;

import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document(collection = "employess")
public class Employess {
    @Id
    private String id;
    private String employeeId;
    private String name;
    private String email;
    private String password;
    private String role;
    private String speciality;
    private String department;
    private String phone;
    private String address;
    private String city;
    private String licenseNo;
    private String dob;

    public Employess() {
        this.id = UUID.randomUUID().toString(); // Auto-generate unique ID
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String encode) {
        this.password = encode;
    }

    public void setRole(String user) {
        this.role = user;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setEmployeeId(String employeeId) {
        if (employeeId == null || employeeId.isEmpty()) {
            this.employeeId = UUID.randomUUID().toString(); // Assign a random unique ID
        } else {
            this.employeeId = employeeId;
        }
    }


    public String getEmployeeId() {
        return employeeId;
    }

    public String getRole() {
        return role;
    }
}