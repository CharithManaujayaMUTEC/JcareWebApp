package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Attendance;
import com.Jcare.Jcare.models.Departments;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AttendanceRepo extends MongoRepository<Attendance, String> {
    List<Attendance> findByEmployeeId(String employeeId);
}
