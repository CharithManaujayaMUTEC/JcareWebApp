package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "reports")
public class Reports {
    @Id
    private String id;
    private String patientId;
    private String reportTitle;
    private String reportType;
    private String priority;
    private String remarks;
    private String doctorId;
    private String uploadedAt;

    // File storage
    private String fileName;
    private String fileType;
    private byte[] fileData;

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public void setReportTitle(String reportTitle) {
        this.reportTitle = reportTitle;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public void setUploadedAt(String uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public String getId() {
        return id;
    }

    public String getPatientId() {
        return patientId;
    }

    public String getReportTitle() {
        return reportTitle;
    }

    public String getReportType() {
        return reportType;
    }

    public String getPriority() {
        return priority;
    }

    public String getRemarks() {
        return remarks;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public byte[] getFileData() {
        return fileData;
    }
}