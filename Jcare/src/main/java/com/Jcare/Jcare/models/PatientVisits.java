package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "patientVisits")
public class PatientVisits {
    @Id
    private String visitId;

    private String patientId;
    private String visitorName;
    private String visitorPhone;
    private String visitorEmail;
    private String visitorNic;
    private String accompaniments;
    private String familyNics;

    private String visitDate;
    private String visitTime;
    private String reasonForVisit;

    public Object getPatientId() {
        return patientId;
    }

    public Object getVisitDate() {
        return visitDate;
    }
}