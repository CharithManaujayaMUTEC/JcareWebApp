package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.Services.PatientDetailsService;
import com.Jcare.Jcare.models.History;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/patientProfile")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientProfileController {

    private final PatientDetailsService patientDetailsService;

    public PatientProfileController(PatientDetailsService patientDetailsService) {
        this.patientDetailsService = patientDetailsService;
    }

    @GetMapping("/getPatientDetails")
    public ResponseEntity<List<String>> getPatientDetails(@RequestParam String patientId) {
        List<String> patientDetails = patientDetailsService.getPatientProfileDetails(patientId);
        return ResponseEntity.ok(patientDetails);
    }

    @GetMapping("/getPatientLastHistory")
    public ResponseEntity<List<String>> getPatientLastHistory(@RequestParam String patientId) {
        List<String> patLastHistory = patientDetailsService.getLastHistoryDetails(patientId);
        return ResponseEntity.ok(patLastHistory);
    }

    @GetMapping("/getParameterVariation")
    public ResponseEntity<List<String>> getParameterVariation(
            @RequestParam String patientId,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String parameter) {

        List<String> patParameterVariation = patientDetailsService.getParameterVariationDetails(
                patientId, startDate, endDate, parameter);
        return ResponseEntity.ok(patParameterVariation);
    }

    @PostMapping("/takeHistory")
    public ResponseEntity<String> takeHistory(@RequestBody History history) {
        patientDetailsService.addHistory(history);
        return ResponseEntity.ok("History added successfully");
    }
}
