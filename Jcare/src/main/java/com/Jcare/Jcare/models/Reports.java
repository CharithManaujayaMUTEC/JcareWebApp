package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "reports")
public class Reports {
    @Id
    private String id;                // MongoDB document ID
    private String patientId;         // Patient linked to the report
    private String reportTitle;       // Title of the report
    private String reportType;        // e.g., X-ray, Blood Test
    private String priority;          // e.g., High, Medium, Low
    private String remarks;           // Doctor/Technician notes
    private String doctorId;          // Uploaded by which doctor
    private String uploadedAt;        // Date (ISO string)

    // File storage
    private String fileName;          // Original file name
    private String fileType;          // MIME type (e.g., application/pdf)
    private byte[] fileData;          // Actual file data

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