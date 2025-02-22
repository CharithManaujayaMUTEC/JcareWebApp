package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.PatientLog;
import com.Jcare.Jcare.repositories.PatientLogRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TodaysPatientsService {
    private final PatientLogRepo patientsRepo;

    public TodaysPatientsService(PatientLogRepo patientsRepo) {
        this.patientsRepo = patientsRepo;
    }
    public Optional<PatientLog> findTodaysPatients(String department) {
        Optional<PatientLog> todayPatients = patientsRepo.findByDepartmentAndIsDischarged(department, false);
        return todayPatients;
    }
}
