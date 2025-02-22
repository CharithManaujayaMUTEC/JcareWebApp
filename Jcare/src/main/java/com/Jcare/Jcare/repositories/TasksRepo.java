package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Tasks;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TasksRepo extends MongoRepository<Tasks, String> {
    Optional<Tasks> findByTaskDate(String taskDate);

    Optional<Tasks> findByTaskAssignedToIDAndTaskDate(String taskAssignedToID, String taskDate);
}
