package com.Jcare.Jcare.controllers;


import com.Jcare.Jcare.Services.PatientDetailsService;
import com.Jcare.Jcare.models.History;
import com.Jcare.Jcare.models.PatientLog;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patientProfile")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientProfileController {


    @GetMapping("/getPatientDetails")
    public ResponseEntity<List<String>> getPatientDetails(@RequestParam String patientId) {
        List<String> patientDetails = PatientDetailsService.getPatientProfileDetails(patientId);
        return ResponseEntity.ok(patientDetails);
    }
    @GetMapping("/getPatientLastHistory")
        public ResponseEntity<List<String>> getPatientLastHistory(@RequestParam String patientId){
            List<String> patLastHistory = PatientDetailsService.getLastHistoryDetails(patientId);
            return ResponseEntity.ok(patLastHistory);
    }
    @GetMapping("/getParameterVariation")
        public ResponseEntity<List<String>>getParameterVariation(@RequestParam String patientId, @RequestParam String startDate, @RequestParam String endDate, @RequestParam String parameter) {
            List<String> patParameterVariation = PatientDetailsService.getParameterVariationDetails(patientId, startDate, endDate, parameter);
            return ResponseEntity.ok(patParameterVariation);
    }
    @PostMapping("/takeHistory")
    public ResponseEntity<String> takeHistory(@RequestBody History history) {
        PatientDetailsService.addHistory(history);
        return ResponseEntity.ok("History added successfully");
    }
}
