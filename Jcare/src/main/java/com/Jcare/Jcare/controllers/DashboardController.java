package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.Services.DailyScheduleService;
import com.Jcare.Jcare.Services.TodaysPatientsService;
import com.Jcare.Jcare.models.Tasks;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/getSchedule")
    public String getSchedule(@RequestParam String employeeId) {
        return dailyScheduleService.getTodaysTasks("taskassignedtoid").toString();
    }

    @PostMapping("/getTasks")
    public String getTasks(@RequestParam String employeeId) {
        return dailyScheduleService.findTodaysTasks("taskassignedtoid").toString();
    }

    @PostMapping("/addTask")
    public String addTask(@RequestParam String taskName, @RequestParam String taskStatus, @RequestParam String taskPriority, @RequestParam String taskAssignedToID, @RequestParam String taskDate, @RequestParam String time) {
        Tasks task = new Tasks();
        task.setTaskName(taskName);
        task.setTaskStatus(taskStatus);
        task.setTaskPriority(taskPriority);
        task.setTaskAssignedToID(taskAssignedToID);
        task.setTaskDate(taskDate);
        dailyScheduleService.addTask(task);
        return "Task added successfully";
    }

    @PostMapping("/todaysPatients")
    public String todaysPatients(@RequestParam String employeeId) {
        return todaysPatientsService.findTodaysPatients("department").toString();
    }

    @GetMapping("/taskDone")
    public String taskDone(@RequestParam String employeeId) {
        return "Task done";
    }
}
