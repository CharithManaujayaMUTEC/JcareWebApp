package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.Attendance;
import com.Jcare.Jcare.models.LeaveRequest;
import com.Jcare.Jcare.repositories.AttendanceRepo;
import com.Jcare.Jcare.repositories.LeaveRequestRepo;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class AttendanceLeaveService {

    private final AttendanceRepo attendanceRepo;
    private final LeaveRequestRepo leaveRepo;

    public AttendanceLeaveService(AttendanceRepo attendanceRepo, LeaveRequestRepo leaveRepo) {
        this.attendanceRepo = attendanceRepo;
        this.leaveRepo = leaveRepo;
    }

    // Attendance
    public List<Attendance> getAttendanceByEmployee(String employeeId) {
        List<Attendance> records = attendanceRepo.findByEmployeeId(employeeId);
        return records != null ? records : Collections.emptyList();
    }

    // Leave Requests
    public List<LeaveRequest> getPendingLeaves() {
        List<LeaveRequest> leaves = leaveRepo.findByStatus("Pending");
        return leaves != null ? leaves : Collections.emptyList();
    }

    public LeaveRequest approveLeave(String leaveId) {
        LeaveRequest leave = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus("Approved");
        return leaveRepo.save(leave);
    }

    public LeaveRequest rejectLeave(String leaveId) {
        LeaveRequest leave = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        leave.setStatus("Rejected");
        return leaveRepo.save(leave);
    }

    public LeaveRequest submitLeave(LeaveRequest leave) {
        leave.setStatus("Pending");
        return leaveRepo.save(leave);
    }

    // Attendance summary for dashboard
    public AttendanceSummary getAttendanceSummary(String employeeId) {
        List<Attendance> records = getAttendanceByEmployee(employeeId);
        List<LeaveRequest> leaves = leaveRepo.findByEmployeeId(employeeId);
        if (leaves == null) leaves = Collections.emptyList();

        // If checkInTime is boolean, just count true values
        long present = records.stream()
                .filter(Attendance::isCheckInTime)
                .count();

        long leave = leaves.stream()
                .filter(l -> "Approved".equals(l.getStatus()))
                .count();

        long absent = records.size() - present;

        return new AttendanceSummary((int) present, (int) absent, (int) leave);
    }

    // DTO for attendance summary
    public static class AttendanceSummary {
        private int present;
        private int absent;
        private int leave;

        public AttendanceSummary(int present, int absent, int leave) {
            this.present = present;
            this.absent = absent;
            this.leave = leave;
        }

        public int getPresent() { return present; }
        public int getAbsent() { return absent; }
        public int getLeave() { return leave; }
    }
}