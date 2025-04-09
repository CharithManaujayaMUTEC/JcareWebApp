package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.History;
import com.Jcare.Jcare.models.PatientLog;
import com.Jcare.Jcare.repositories.HistorysRepo;
import com.Jcare.Jcare.repositories.PatientLogRepo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PatientDetailsServiceTest {

    private HistorysRepo historysRepo;
    private PatientLogRepo patientLogRepo;

    @BeforeEach
    void setUp() {
        historysRepo = mock(HistorysRepo.class);
        patientLogRepo = mock(PatientLogRepo.class);
        PatientDetailsService.setHistorysRepo(historysRepo);
        new PatientDetailsService(patientLogRepo);
    }

    @Test
    void testGetPatientProfileDetails() {
        PatientLog patient = new PatientLog();
        patient.setPatientId("P123");
        patient.setPatientName("John Doe");
        patient.setPatientEmail("john@example.com");
        patient.setPatientPhone("1234567890");
        patient.setPatientAddress("123 Street");
        patient.setPatientDob("1990-01-01");
        patient.setPatientGender("Male");
        patient.setPatientBloodGroup("A+");
        patient.setPatientHeight("180");
        patient.setPatientWeight("75");
        patient.setPatientAllergies(Arrays.asList("Pollen", "Dust"));
        patient.setPatientMedications(Arrays.asList("Paracetamol"));
        patient.setPatientDiseases(Arrays.asList("Diabetes"));
        patient.setPatientInsuranceId("INS123");

        when(patientLogRepo.findByPatientId("P123")).thenReturn(Optional.of(patient));

        List<String> result = PatientDetailsService.getPatientProfileDetails("P123");

        assertEquals("John Doe", result.get(0));
        assertTrue(result.contains("Pollen, Dust"));
    }

    @Test
    void testGetLastHistoryDetails() {
        History history = new History("H001", "P123", new Date(), "EMP001",
                120f, 16f, 37.0f, 72f, 98f, "Healthy");

        when(historysRepo.findTopByPatientIdOrderByDateTimeDesc("P123"))
                .thenReturn(Optional.of(history));

        List<String> result = PatientDetailsService.getLastHistoryDetails("P123");

        assertEquals("120.0", result.get(0));
        assertEquals("16.0", result.get(1));
        assertEquals("37.0", result.get(2));
    }

    @Test
    void testGetParameterVariationDetails() {
        History h1 = new History("H1", "P123", new GregorianCalendar(2024, Calendar.JANUARY, 1).getTime(), "EMP1", 120f, 16f, 37.1f, 72f, 97f, "OK");
        History h2 = new History("H2", "P123", new GregorianCalendar(2024, Calendar.JANUARY, 2).getTime(), "EMP1", 121f, 17f, 37.5f, 75f, 98f, "Stable");

        when(historysRepo.findByPatientIdAndDateTimeBetween(
                eq("P123"),
                any(Date.class),
                any(Date.class)))
                .thenReturn(Arrays.asList(h1, h2));

        List<String> result = PatientDetailsService.getParameterVariationDetails("P123", "2024-01-01", "2024-01-03", "temperature");

        assertEquals(2, result.size());
        assertEquals("37.1", result.get(0));
        assertEquals("37.5", result.get(1));
    }

    @Test
    void testGetParameterVariationDetails_InvalidParameter() {
        History history = new History("H1", "P123", new Date(), "EMP1", 120f, 16f, 37.0f, 70f, 99f, "Normal");
        when(historysRepo.findByPatientIdAndDateTimeBetween(anyString(), any(Date.class), any(Date.class)))
                .thenReturn(Collections.singletonList(history));

        List<String> result = PatientDetailsService.getParameterVariationDetails("P123", "2024-01-01", "2024-01-02", "invalid");

        assertEquals(1, result.size());
        assertEquals("Invalid Parameter", result.get(0));
    }
}