package com.Jcare.Jcare.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Jcare.Jcare.models.PatientVisits;
import com.Jcare.Jcare.repositories.PatientVisitsRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/patientvisit")
@CrossOrigin(origins = "https://jcare-web-app.vercel.app")
public class PatientVisitController {
    @Autowired
    private PatientVisitsRepo patientVisitsRepo;

    // Add a new visit
    @PostMapping("/add")
    public ResponseEntity<PatientVisits> addVisit(@RequestBody PatientVisits visit) {
        PatientVisits savedVisit = patientVisitsRepo.save(visit);
        return ResponseEntity.ok(savedVisit);
    }

    // Get all visits
    @GetMapping("/all")
    public ResponseEntity<List<PatientVisits>> getAllVisits() {
        List<PatientVisits> visits = patientVisitsRepo.findAll();
        return ResponseEntity.ok(visits);
    }

    // Get visits by patientId
    @GetMapping("/byPatient/{patientId}")
    public ResponseEntity<List<PatientVisits>> getVisitsByPatient(@PathVariable String patientId) {
        List<PatientVisits> visits = patientVisitsRepo.findAll()
                .stream()
                .filter(v -> v.getPatientId().equals(patientId))
                .toList();
        return ResponseEntity.ok(visits);
    }

    // Get visits for a patient on a specific date
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PatientVisits>> getVisitsByPatientAndDate(
            @PathVariable String patientId,
            @RequestParam String date
    ) {
        List<PatientVisits> visits = patientVisitsRepo.findAll().stream()
                .filter(v -> v.getPatientId().equals(patientId) && v.getVisitDate().equals(date))
                .collect(Collectors.toList());

        return ResponseEntity.ok(visits);
    }

    // Get visit by visitId
    @GetMapping("/{visitId}")
    public ResponseEntity<PatientVisits> getVisitById(@PathVariable String visitId) {
        Optional<PatientVisits> visit = patientVisitsRepo.findById(visitId);
        return visit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete visit by ID
    @DeleteMapping("/delete/{visitId}")
    public ResponseEntity<String> deleteVisit(@PathVariable String visitId) {
        if (patientVisitsRepo.existsById(visitId)) {
            patientVisitsRepo.deleteById(visitId);
            return ResponseEntity.ok("Visit deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
