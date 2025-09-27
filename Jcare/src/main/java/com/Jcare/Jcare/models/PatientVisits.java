package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "patientVisits")
public class PatientVisits {
    @Id
    private String visitId;

    private String patientId;        // patient number from frontend "patient"
    private String visitorName;      // "name"
    private String visitorPhone;     // "phone"
    private String visitorEmail;     // "email"
    private String visitorNic;       // "nic"
    private String accompaniments;   // "membs" (number of family/friends)
    private String familyNics;       // "nicsfam" (their NICs)

    private String visitDate;        // "date"
    private String visitTime;        // "slot"
    private String reasonForVisit;   // "purpose"

    public Object getPatientId() {
        return patientId;
    }

    public Object getVisitDate() {
        return visitDate;
    }
}