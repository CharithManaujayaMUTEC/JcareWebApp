package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.LeaveRequest;
import com.Jcare.Jcare.models.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LeaveRequestRepo extends MongoRepository<LeaveRequest, String> {
    List<LeaveRequest> findByStatus(String status); // For pending approvals
    List<LeaveRequest> findByEmployeeId(String employeeId);
}