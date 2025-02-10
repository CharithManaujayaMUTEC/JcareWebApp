package com.Jcare.Jcare.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployessRepo extends MongoRepository<EmployessRepo, String> {
    EmployessRepo findByName(String name);
    EmployessRepo findByEmail(String email);
    EmployessRepo findByRole(String role);
    EmployessRepo findBySpeciality(String speciality);
    EmployessRepo findByDepartment(String department);
    EmployessRepo findByPhone(String phone);
    EmployessRepo findByAddress(String address);
    EmployessRepo findByCity(String city);
    EmployessRepo findByLiscenceNo(String liscenceNo);
    EmployessRepo findByDob(String dob);
}
