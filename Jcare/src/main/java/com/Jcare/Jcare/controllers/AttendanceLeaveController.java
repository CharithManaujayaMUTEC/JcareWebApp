package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.Services.AttendanceLeaveService;
import com.Jcare.Jcare.models.LeaveRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceLeaveController {

    private final AttendanceLeaveService attendanceLeaveService;

    public AttendanceLeaveController(AttendanceLeaveService attendanceLeaveService) {
        this.attendanceLeaveService = attendanceLeaveService;
    }

    // Get leave requests
    @GetMapping("/getLeaveRequests")
    public List<LeaveRequest> getLeaveRequests() {
        return attendanceLeaveService.getPendingLeaves();
    }

    // Submit leave
    @PostMapping("/requestLeave")
    public LeaveRequest requestLeave(@RequestBody LeaveRequest leave) {
        return attendanceLeaveService.submitLeave(leave);
    }

    // Approve leave
    @PostMapping("/approveLeave")
    public LeaveRequest approveLeave(@RequestParam String leaveId) {
        return attendanceLeaveService.approveLeave(leaveId);
    }

    // Reject leave
    @PostMapping("/rejectLeave")
    public LeaveRequest rejectLeave(@RequestParam String leaveId) {
        return attendanceLeaveService.rejectLeave(leaveId);
    }

    // Attendance summary
    @GetMapping("/getAttendance")
    public AttendanceLeaveService.AttendanceSummary getAttendance(@RequestParam String employeeId) {
        return attendanceLeaveService.getAttendanceSummary(employeeId);
    }
}