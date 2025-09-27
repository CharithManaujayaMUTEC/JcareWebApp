package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "leaves")
public class LeaveRequest {
    @Id
    private String leaveId;
    private String employeeId;
    private String employeeName;
    private String fromDate;
    private String toDate;
    private String reason;
    private String status; // "Pending", "Approved", "Rejected"

    public void setStatus(String approved) {
        this.status = approved;
    }

    public String getStatus() {
        return status;
    }
}