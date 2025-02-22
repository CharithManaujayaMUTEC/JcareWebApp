package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "employess")
public class Employess {
    @Id
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

    public void setName(String name) {
    }

    public void setPassword(String encode) {
    }

    public void setRole(String user) {
    }

    public String getPassword() {
        return password;
    }
}