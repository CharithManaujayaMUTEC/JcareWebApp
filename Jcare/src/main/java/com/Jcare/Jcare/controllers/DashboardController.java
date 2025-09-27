package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.Services.DailyScheduleService;
import com.Jcare.Jcare.Services.TodaysPatientsService;
import com.Jcare.Jcare.models.PatientLog;
import com.Jcare.Jcare.models.Tasks;
import com.Jcare.Jcare.models.Notice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.TreeMap;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    private final DailyScheduleService dailyScheduleService;
    private final TodaysPatientsService todaysPatientsService;

    public DashboardController(DailyScheduleService dailyScheduleService, TodaysPatientsService todaysPatientsService) {
        this.dailyScheduleService = dailyScheduleService;
        this.todaysPatientsService = todaysPatientsService;
    }

    @GetMapping("/getSchedule")
    public ResponseEntity<List<TreeMap<String, String>>> getSchedule(@RequestParam String employeeId) {
        List<TreeMap<String, String>> schedule = dailyScheduleService.getTodaysTasks(employeeId);
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/getTasks")
    public ResponseEntity<List<Tasks>> getTasks(@RequestParam String employeeId) {
        List<Tasks> tasks = dailyScheduleService.findTodaysTasks(employeeId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/addTask")
    public ResponseEntity<String> addTask(@RequestBody Tasks task) {
        dailyScheduleService.addTask(task);
        return ResponseEntity.ok("Task added successfully");
    }

    @GetMapping("/todaysPatients")
    public ResponseEntity<Optional<PatientLog>> todaysPatients(@RequestParam String employeeId) {
        Optional<PatientLog> patients = todaysPatientsService.findTodaysPatients(employeeId);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/getNotices")
    public ResponseEntity<List<Notice>> getNotices(@RequestParam String employeeId) {
        List<Notice> notices = dailyScheduleService.getNoticesForEmployee(employeeId);
        return ResponseEntity.ok(notices);
    }

    @PostMapping("/addNotice")
    public ResponseEntity<String> addNotice(@RequestBody Notice notice) {
        dailyScheduleService.addNotice(notice);
        return ResponseEntity.ok("Notice added successfully");
    }

    @PostMapping("/taskDone")
    public ResponseEntity<String> taskDone(@RequestParam String taskId) {
        dailyScheduleService.markTaskAsDone(taskId);
        return ResponseEntity.ok("Task marked as done");
    }

    @PostMapping("/completeTask")
    public ResponseEntity<String> completeTask(@RequestParam String taskId) {
        dailyScheduleService.completeTask(taskId);
        return ResponseEntity.ok("Task marked as completed");
    }

    @PostMapping("/taskNotDone")
    public ResponseEntity<String> taskNotDone(@RequestParam String taskId) {
        dailyScheduleService.markTaskAsNotDone(taskId);
        return ResponseEntity.ok("Task marked as not done");
    }

    @PostMapping("/taskPending")
    public ResponseEntity<String> taskPending(@RequestParam String taskId) {
        dailyScheduleService.markTaskAsPending(taskId);
        return ResponseEntity.ok("Task marked as pending");
    }

    @GetMapping("/getAllEmployees")
    public ResponseEntity<List<TreeMap<String, String>>> getAllEmployees() {
        List<TreeMap<String, String>> employees = dailyScheduleService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

}
