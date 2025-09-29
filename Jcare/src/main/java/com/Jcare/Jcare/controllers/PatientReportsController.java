package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.models.Reports;
import com.Jcare.Jcare.repositories.ReportsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patientreports")
@CrossOrigin(origins = "https://jcare-web-app.vercel.app")
public class PatientReportsController {

    @Autowired
    private ReportsRepo reportsRepo;

    // Upload a report
    @PostMapping("/upload")
    public ResponseEntity<Reports> uploadReport(
            @RequestParam("patientId") String patientId,
            @RequestParam("reportTitle") String reportTitle,
            @RequestParam("reportType") String reportType,
            @RequestParam("priority") String priority,
            @RequestParam("remarks") String remarks,
            @RequestParam("doctorId") String doctorId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            Reports report = new Reports();
            report.setPatientId(patientId);
            report.setReportTitle(reportTitle);
            report.setReportType(reportType);
            report.setPriority(priority);
            report.setRemarks(remarks);
            report.setDoctorId(doctorId);
            report.setFileName(file.getOriginalFilename());
            report.setFileType(file.getContentType());
            report.setFileData(file.getBytes());
            report.setUploadedAt(LocalDate.now().toString());

            Reports saved = reportsRepo.save(report);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Get all reports for a patient
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Reports>> getReportsByPatient(@PathVariable String patientId) {
        List<Reports> reports = reportsRepo.findByPatientId(patientId);
        return ResponseEntity.ok(reports);
    }

    // Download a specific report
    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> downloadReport(@PathVariable String id) {
        Optional<Reports> reportOpt = reportsRepo.findById(id);
        if (reportOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Reports report = reportOpt.get();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(report.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + report.getFileName() + "\"")
                .body(new ByteArrayResource(report.getFileData()));
    }

    // Get all reports (for admin/debugging)
    @GetMapping("/all")
    public ResponseEntity<List<Reports>> getAllReports() {
        return ResponseEntity.ok(reportsRepo.findAll());
    }
}
