package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TasksRepo extends MongoRepository<Tasks, String> {
    List<Tasks> findByTaskName(String taskName);
    List<Tasks> findByTaskStatus(String taskStatus);
    List<Tasks> findByTaskPriority(String taskPriority);
    List<Tasks> findByTaskAssignedToID(String taskAssignedToID);
    List<Tasks> findByTaskAssignedByID(String taskAssignedByID);
    List<Tasks> findByTaskDepartment(String taskDepartment);
    List<Tasks> findByTaskPatientID(String taskPatientID);
}
