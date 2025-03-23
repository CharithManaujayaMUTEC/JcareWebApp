package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@Document(collection = "tasks")
public class Tasks {
    @Id
    private String taskId;
    private String taskName;
    private String taskDescription;
    private String taskDate;
    private String taskTime;
    private String taskStatus;
    private String taskPriority;
    private String taskAssignedToID;
    private String taskAssignedByID;
    private String taskDepartment;
    private String taskPatientID;
    private boolean taskCompleted;

    // Default constructor required by Spring Boot and MongoDB
    public Tasks() {}

    public Tasks(String taskName, String taskDescription, String taskDate, String taskTime, String taskStatus,
                 String taskPriority, String taskAssignedToID, String taskAssignedByID, String taskDepartment,
                 String taskPatientID, boolean taskCompleted) {
        this.taskId = UUID.randomUUID().toString(); // Assign a random unique ID
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskDate = taskDate;
        this.taskTime = taskTime;
        this.taskStatus = taskStatus;
        this.taskPriority = taskPriority;
        this.taskAssignedToID = taskAssignedToID;
        this.taskAssignedByID = taskAssignedByID;
        this.taskDepartment = taskDepartment;
        this.taskPatientID = taskPatientID;
        this.taskCompleted = taskCompleted;
    }

    // Fix setTaskStatus
    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus;
    }

    // Fix boolean getter
    public boolean isTaskCompleted() {
        return taskCompleted;
    }

    // Fix boolean setter
    public void setTaskCompleted(boolean taskCompleted) {
        this.taskCompleted = taskCompleted;
    }

    // Generate unique ID only if null or empty
    public void setTaskId(String taskId) {
        this.taskId = (taskId == null || taskId.isEmpty()) ? UUID.randomUUID().toString() : taskId;
    }

    public String getTaskTime() {
        return taskTime;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getTime() {
        return taskTime;
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public String getTaskPriority() {
        return taskPriority;
    }
}
