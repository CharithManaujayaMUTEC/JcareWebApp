package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.PatientLog;
import com.Jcare.Jcare.repositories.PatientLogRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TodaysPatientsServiceTest {

    private PatientLogRepo patientLogRepo;
    private TodaysPatientsService todaysPatientsService;

    @BeforeEach
    void setUp() {
        patientLogRepo = mock(PatientLogRepo.class);
        todaysPatientsService = new TodaysPatientsService(patientLogRepo);
    }

    @Test
    void testFindTodaysPatients_ReturnsPatient() {
        String department = "Cardiology";
        PatientLog patient = new PatientLog();
        patient.setPatientName("John Doe");
        patient.setDepartment(department);
        patient.setDischarged(false);

        when(patientLogRepo.findByDepartmentAndIsDischarged(department, false))
                .thenReturn(Optional.of(patient));

        Optional<PatientLog> result = todaysPatientsService.findTodaysPatients(department);

        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getPatientName());
        verify(patientLogRepo, times(1)).findByDepartmentAndIsDischarged(department, false);
    }

    @Test
    void testFindTodaysPatients_ReturnsEmpty() {
        String department = "Neurology";

        when(patientLogRepo.findByDepartmentAndIsDischarged(department, false))
                .thenReturn(Optional.empty());

        Optional<PatientLog> result = todaysPatientsService.findTodaysPatients(department);

        assertFalse(result.isPresent());
        verify(patientLogRepo, times(1)).findByDepartmentAndIsDischarged(department, false);
    }
}
