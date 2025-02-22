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
    private String taskPatientID;
    private boolean isTaskCompleted;

    public void getTasks() {
        // TODO implement here
        return ;

    }

    public String getTaskName() {
        return taskName;
    }

    public String getTime() {
        return taskTime;
    }

    public void setTaskStatus(String completed) {
        // TODO implement here
        boolean isTaskCompleted1 = isTaskCompleted;
        isTaskCompleted1 = true;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public void setTaskPriority(String taskPriority) {
        this.taskPriority = taskPriority;
    }

    public void setTaskAssignedToID(String taskAssignedToID) {
        this.taskAssignedToID = taskAssignedToID;
    }

    public void setTaskDate(String taskDate) {
        this.taskDate = taskDate;
    }
}
