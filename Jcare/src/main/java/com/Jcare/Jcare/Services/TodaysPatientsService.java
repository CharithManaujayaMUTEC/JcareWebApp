package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.PatientLog;
import com.Jcare.Jcare.repositories.PatientLogRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.TreeMap;

@Service
public class TodaysPatientsService {
    private final PatientLogRepo patientsRepo;

    public TodaysPatientsService(PatientLogRepo patientsRepo, PatientLogRepo patientsRepo1) {

        this.patientsRepo = patientsRepo1;
    }
    public Optional<PatientLog> findTodaysPatients(String department) {
        Optional<PatientLog> todayPatients = patientsRepo.findByDepartmentAndIsDischarged(department, false);
        return todayPatients;
    }
}
