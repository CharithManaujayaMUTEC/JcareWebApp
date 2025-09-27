package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Reports;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ReportsRepo extends MongoRepository<Reports, String> {
    Optional<Reports> findById(String id);
    List<Reports> findByPatientId(String patientId);
}
