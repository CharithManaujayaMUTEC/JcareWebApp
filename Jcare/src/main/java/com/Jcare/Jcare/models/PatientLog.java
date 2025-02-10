package com.Jcare.Jcare.models;

import lombok.Data;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "patientLog")
public class PatientLog {
    @Id
    private String patientId;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private String patientAddress;
    private String patientDob;
    private String patientGender;
    private String patientBloodGroup;
    private String patientHeight;
    private String patientWeight;
    private List<String> patientAllergies;
    private List<String> patientMedications;
    private List<String> patientDiseases;
    private String patientInsurance;
    private String patientInsuranceId;
    private String patientInsuranceCompany;
    private String patientInsurancePolicy;
    private String patientInsurancePhone;
    private String patientInsuranceEmail;
}
