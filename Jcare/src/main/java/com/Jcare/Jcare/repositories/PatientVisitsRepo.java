package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Departments;
import com.Jcare.Jcare.models.PatientVisits;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientVisitsRepo extends MongoRepository<PatientVisits, String> {
    PatientVisits findByVisitId(String visitId);
}
