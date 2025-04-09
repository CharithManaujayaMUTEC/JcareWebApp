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
    private String patientInsuranceId;
    private String department;
    private boolean isDischarged;
    private String patientStatus;


    public PatientLog() {
        // Default constructor
    }

    public String getPatientAddress() {
        return patientAddress;
    }

    public void setPatientAddress(String patientAddress) {
        this.patientAddress = patientAddress;
    }
    public String getPatientDob() {
        return patientDob;
    }
    public void setPatientDob(String patientDob) {
        this.patientDob = patientDob;
    }
    public String getPatientGender() {
        return patientGender;
    }
    public void setPatientGender(String patientGender) {
        this.patientGender = patientGender;
    }
    public String getPatientBloodGroup() {
        return patientBloodGroup;
    }
    public void setPatientBloodGroup(String patientBloodGroup) {
        this.patientBloodGroup = patientBloodGroup;
    }
    public String getPatientHeight() {
        return patientHeight;
    }
    public void setPatientHeight(String patientHeight) {
        this.patientHeight = patientHeight;
    }
    public String getPatientWeight() {
        return patientWeight;
    }
    public void setPatientWeight(String patientWeight) {
        this.patientWeight = patientWeight;
    }
    public List<String> getPatientAllergies() {
        return patientAllergies;
    }
    public void setPatientAllergies(List<String> patientAllergies) {
        this.patientAllergies = patientAllergies;
    }
    public List<String> getPatientMedications() {
        return patientMedications;
    }
    public void setPatientMedications(List<String> patientMedications) {
        this.patientMedications = patientMedications;
    }
    public List<String> getPatientDiseases() {
        return patientDiseases;
    }
    public void setPatientDiseases(List<String> patientDiseases) {
        this.patientDiseases = patientDiseases;
    }
    public String getPatientInsuranceId() {
        return patientInsuranceId;
    }
    public void setPatientInsuranceId(String patientInsuranceId) {
        this.patientInsuranceId = patientInsuranceId;
    }
    public String getPatientId() {
        return patientId;
    }
    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getPatientEmail() {
        return patientEmail;
    }
    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }
    public String getPatientPhone() {
        return patientPhone;
    }
    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }
    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    public boolean isDischarged() {
        return isDischarged;
    }
    public void setDischarged(boolean discharged) {
        isDischarged = discharged;
    }
    public String getPatientStatus() {
        return patientStatus;
    }
    public void setPatientStatus(String patientStatus) {
        this.patientStatus = patientStatus;
    }

    @Override
    public String toString() {
        return "PatientLog{" +
                "patientId='" + patientId + '\'' +
                ", patientName='" + patientName + '\'' +
                ", patientEmail='" + patientEmail + '\'' +
                ", patientPhone='" + patientPhone + '\'' +
                ", patientAddress='" + patientAddress + '\'' +
                ", patientDob='" + patientDob + '\'' +
                ", patientGender='" + patientGender + '\'' +
                ", patientBloodGroup='" + patientBloodGroup + '\'' +
                ", patientHeight='" + patientHeight + '\'' +
                ", patientWeight='" + patientWeight + '\'' +
                ", patientAllergies=" + patientAllergies +
                ", patientMedications=" + patientMedications +
                ", patientDiseases=" + patientDiseases +
                ", patientInsuranceId='" + patientInsuranceId + '\'' +
                ", department='" + department + '\'' +
                ", isDischarged=" + isDischarged +
                '}';
    }
}




