package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "goods_requests")
public class GoodsRequest {
    @Id
    private String requestId;
    private String employeeId;
    private String employeeName;
    private String department;
    private String itemId;
    private String itemName;
    private int quantity;
    private String priority;
    private String remarks;

    private String status = "Pending";
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

    public void setStatus(String status) {
        this.status = status;
    }
}