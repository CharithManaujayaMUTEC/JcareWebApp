package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.PatientLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PatientLogRepo extends MongoRepository<PatientLog, String> {
    Optional<PatientLog> findByDepartmentAndIsDischarged(String department, boolean isDischarged);
    Optional<PatientLog> findByPatientId(String patientId);
}
