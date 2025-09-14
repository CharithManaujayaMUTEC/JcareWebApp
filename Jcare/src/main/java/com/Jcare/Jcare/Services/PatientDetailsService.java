package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.History;
import com.Jcare.Jcare.models.PatientLog;
import com.Jcare.Jcare.repositories.HistorysRepo;
import com.Jcare.Jcare.repositories.PatientLogRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PatientDetailsService {
    private final PatientLogRepo patientLogRepo;
    private final HistorysRepo historysRepo;


    public PatientDetailsService(PatientLogRepo patientLogRepo, HistorysRepo historysRepo) {
        this.patientLogRepo = patientLogRepo;
        this.historysRepo = historysRepo;
    }

    public List<String> getPatientProfileDetails(String patientId) {
        Optional<PatientLog> patientLogOptional = patientLogRepo.findByPatientId(patientId);
        List<String> patientDetails = new ArrayList<>();

        if (patientLogOptional.isPresent()) {
            PatientLog patientLog = patientLogOptional.get();
            patientDetails.add(patientLog.getPatientName());
            patientDetails.add(patientLog.getPatientEmail());
            patientDetails.add(patientLog.getPatientPhone());
            patientDetails.add(patientLog.getPatientAddress());
            patientDetails.add(patientLog.getPatientDob());
            patientDetails.add(patientLog.getPatientGender());
            patientDetails.add(patientLog.getPatientBloodGroup());
            patientDetails.add(patientLog.getPatientHeight());
            patientDetails.add(patientLog.getPatientWeight());
            patientDetails.add(String.join(", ", patientLog.getPatientAllergies()));
            patientDetails.add(String.join(", ", patientLog.getPatientMedications()));
            patientDetails.add(String.join(", ", patientLog.getPatientDiseases()));
            patientDetails.add(patientLog.getPatientInsuranceId());
        }
        System.out.println("Received request for patientId: " + patientId);
        return patientDetails;
    }

    public List<String> getLastHistoryDetails(String patientId) {
        Optional<History> historyOptional = historysRepo.findTopByPatientIdOrderByDateTimeDesc(patientId);
        List<String> lastHistoryDetails = new ArrayList<>();

        if (historyOptional.isPresent()) {
            History history = historyOptional.get();
            lastHistoryDetails.add(String.valueOf(history.getDateNTime()));
            lastHistoryDetails.add(String.valueOf(history.getBloodPressure()));
            lastHistoryDetails.add(String.valueOf(history.getTemperature()));
            lastHistoryDetails.add(String.valueOf(history.getPulseRate()));
            lastHistoryDetails.add(String.valueOf(history.getRespiratoryRate()));
            lastHistoryDetails.add(String.valueOf(history.getDiagnosis()));
        }

        return lastHistoryDetails;
    }


    public List<String> getParameterVariationDetails(String patientId, String startDate, String endDate, String parameter) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<String> parameterVariationDetails = new ArrayList<>();

        try {
            Date start = java.sql.Date.valueOf(LocalDate.parse(startDate, formatter));
            Date end = java.sql.Date.valueOf(LocalDate.parse(endDate, formatter));

            List<History> histories = historysRepo.findByPatientIdAndDateTimeBetween(patientId, start, end);

            for (History history : histories) {
                switch (parameter.toLowerCase()) {
                    case "temperature":
                        parameterVariationDetails.add(String.valueOf(history.getTemperature()));
                        break;
                    case "pulse rate":
                    case "pulserate":
                        parameterVariationDetails.add(String.valueOf(history.getPulseRate()));
                        break;
                    case "blood pressure":
                    case "bloodpressure":
                        parameterVariationDetails.add(String.valueOf(history.getBloodPressure()));
                        break;
                    case "respiratory rate":
                    case "respiratoryrate":
                        parameterVariationDetails.add(String.valueOf(history.getRespiratoryRate()));
                        break;
                    case "oxygen saturation":
                    case "oxygensaturation":
                        parameterVariationDetails.add(String.valueOf(history.getOxygenSaturation()));
                        break;
                    default:
                        parameterVariationDetails.add("Invalid Parameter");
                        break;
                }
            }
        } catch (Exception e) {
            parameterVariationDetails.add("Error: " + e.getMessage());
        }

        return parameterVariationDetails;
    }

    public void addHistory(History history) {
        historysRepo.save(history);
    }

    public List<String> getAllPatients() {
        List<PatientLog> patientLogs = patientLogRepo.findAll();
        List<String> allPatients = new ArrayList<>();

        for (PatientLog patientLog : patientLogs) {
            allPatients.add(patientLog.getPatientId() + " - " + patientLog.getPatientName() + " - " + patientLog.getDepartment());
        }

        return allPatients;
    }
}
