package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Departments;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DepartmentsRepo extends MongoRepository<Departments, String> {
    Departments findByDepartmentName(String departmentName);
    Departments findByDepartmentID(String departmentID);
    Departments findByDepartmentlocation(String departmentlocation);
    Departments findByDepartmentHeadID(String departmentHeadID);
    Departments findByDepartmentPhone(String departmentPhone);
    Departments findByDepartmentEmail(String departmentEmail);
}
