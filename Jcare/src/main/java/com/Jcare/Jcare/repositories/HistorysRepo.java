package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.History;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface HistorysRepo extends MongoRepository<History, String> {

    Optional<History> findByPatientId(String patientId);
    Optional<History> findTopByPatientIdOrderByDateTimeDesc(String patientId);
    List<History> findByPatientIdAndDateTimeBetween(String patientId, Date start, Date end);

}
