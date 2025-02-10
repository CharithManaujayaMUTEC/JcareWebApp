package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.PatientLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientLogRepo extends MongoRepository<PatientLog, String> {
    PatientLog findByPatientId(String patientId);
    PatientLog findByPatientEmail(String patientEmail);
    PatientLog findByPatientPhone(String patientPhone);
    PatientLog findByPatientInsuranceId(String patientInsuranceId);
    PatientLog findByPatientInsuranceEmail(String patientInsuranceEmail);
    PatientLog findByPatientInsurancePhone(String patientInsurancePhone);
    PatientLog findByPatientInsurancePolicy(String patientInsurancePolicy);
    PatientLog findByPatientInsuranceCompany(String patientInsuranceCompany);
    PatientLog findByPatientInsurance(String patientInsurance);
    PatientLog findByPatientName(String patientName);
    PatientLog findByPatientAddress(String patientAddress);
    PatientLog findByPatientDob(String patientDob);
    PatientLog findByPatientGender(String patientGender);
    PatientLog findByPatientBloodGroup(String patientBloodGroup);
    PatientLog findByPatientHeight(String patientHeight);
    PatientLog findByPatientWeight(String patientWeight);

}
