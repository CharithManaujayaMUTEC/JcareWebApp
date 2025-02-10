package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private String taskDeadline;
    private String taskPatientID;
}
