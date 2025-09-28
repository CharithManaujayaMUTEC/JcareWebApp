package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Document(collection = "attendance")
public class Attendance {
    @Id
    private String attendanceId;
    private String employeeId;
    private String date;
    private String checkInTime;
    private String checkOutTime;

    public Map<Object, Object> getCheckInTime() {
        return Map.of("checkInTime", checkInTime);
    }

    public boolean isCheckInTime() {
        return checkInTime != null;
    }
}
