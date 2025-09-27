package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "goods_requests")
public class GoodsRequest {
    @Id
    private String requestId;       // auto-generated
    private String employeeId;      // who requested
    private String employeeName;    // convenience field for UI
    private String department;
    private String itemId;          // link to Inventory.itemId
    private String itemName;        // redundancy for quick display
    private int quantity;
    private String priority;        // e.g. Normal/Urgent
    private String remarks;

    private String status = "Pending"; // Pending, Approved, Rejected, In Progress, Completed
    private LocalDateTime requestedAt = LocalDateTime.now();

    public void setRequesterName(String requesterName) {
        this.employeeName = requesterName;
    }
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public void setCategory(String category) {
        this.itemId = category; // Assuming category is used as itemId for simplicity
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    public void setPatientIds(String patientIds) {
        // Not used in this model, but could be stored if needed
    }

    public void setStatus(String status) {
        this.status = status;
    }
}