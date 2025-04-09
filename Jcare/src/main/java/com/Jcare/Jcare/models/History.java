package com.Jcare.Jcare.models;
import java.util.Date;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "history")
public class History{
    @Id
    private String historyId;
    private String patientId;
    private Date dateTime;
    private String employeeId;
    private Float bloodPressure;
    private Float respiratoryRate;
    private Float temperature;
    private Float pulseRate;
    private Float oxygenSaturation;
    private String diagnosis;

    public void setBloodPressure(Float bloodPressure) {
        this.bloodPressure = bloodPressure;
    }
    public void setRespiratoryRate(Float respiratoryRate) {
        this.respiratoryRate = respiratoryRate;
    }
    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }
    public void setPulseRate(Float pulseRate) {
        this.pulseRate = pulseRate;
    }
    public void setOxygenSaturation(Float oxygenSaturation) {
        this.oxygenSaturation = oxygenSaturation;
    }
    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }
    public String getHistoryId() {
        return historyId;
    }
    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }
    public String getPatientId() {
        return patientId;
    }
    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }
    public Date getDateNTime() {
        return dateTime;
    }
    public void setDateNTime(Date dateTime) {
        this.dateTime = dateTime;
    }
    public String getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    public Float getBloodPressure() {
        return bloodPressure;
    }
    public Float getRespiratoryRate() {
        return respiratoryRate;
    }
    public Float getTemperature() {
        return temperature;
    }
    public Float getPulseRate() {
        return pulseRate;
    }
    public Float getOxygenSaturation() {
        return oxygenSaturation;
    }
    public String getDiagnosis() {
        return diagnosis;
    }
    public void setHistory(History history) {
        this.historyId = history.getHistoryId();
        this.patientId = history.getPatientId();
        this.dateTime = history.getDateNTime();
        this.employeeId = history.getEmployeeId();
        this.bloodPressure = history.getBloodPressure();
        this.respiratoryRate = history.getRespiratoryRate();
        this.temperature = history.getTemperature();
        this.pulseRate = history.getPulseRate();
        this.oxygenSaturation = history.getOxygenSaturation();
        this.diagnosis = history.getDiagnosis();
    }
    public History(String historyId, String patientId, Date dateTime, String employeeId, Float bloodPressure, Float respiratoryRate, Float temperature, Float pulseRate, Float oxygenSaturation, String diagnosis) {
        this.historyId = historyId;
        this.patientId = patientId;
        this.dateTime = dateTime;
        this.employeeId = employeeId;
        this.bloodPressure = bloodPressure;
        this.respiratoryRate = respiratoryRate;
        this.temperature = temperature;
        this.pulseRate = pulseRate;
        this.oxygenSaturation = oxygenSaturation;
        this.diagnosis = diagnosis;
    }
}
