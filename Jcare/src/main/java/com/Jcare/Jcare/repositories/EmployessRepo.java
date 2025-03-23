package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Employess;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface EmployessRepo extends MongoRepository<Employess, String> {
    Optional<Employess> findByName(String name);

    Optional<Employess> findByEmployeeId(String employeeId);
}
