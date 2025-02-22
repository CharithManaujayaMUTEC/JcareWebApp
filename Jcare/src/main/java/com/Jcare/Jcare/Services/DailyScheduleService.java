package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.repositories.TasksRepo;
import com.Jcare.Jcare.models.Tasks;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.TreeMap;

@Service
public class DailyScheduleService {
    private final TasksRepo tasksRepo;

    public DailyScheduleService(TasksRepo tasksRepo) {
        this.tasksRepo = tasksRepo;
    }

    public Optional<Tasks> findTodaysTasks(String taskAssignedToID) {
        LocalDate today = LocalDate.now();
        String todayString = today.toString();
        Optional<Tasks> todayTasks = tasksRepo.findByTaskAssignedToIDAndTaskDate(taskAssignedToID,todayString);
        return todayTasks;
    }

    public TreeMap<String, String> getTodaysTasks(String taskAssignedToID) {
        Optional<Tasks> todayTasks = findTodaysTasks(taskAssignedToID);
        TreeMap<String, String> tasks = new TreeMap<>();
        if (todayTasks.isPresent()) {
            tasks.put("tasktime", todayTasks.get().getTime());
            tasks.put("taskname", todayTasks.get().getTaskName());
        }
        return tasks;
    }

    public void addTask(Tasks task) {
        tasksRepo.save(task);
    }

    public void completeTask(String taskId) {
        Optional<Tasks> task = tasksRepo.findById(taskId);
        if (task.isPresent()) {
            task.get().setTaskStatus("completed");
            tasksRepo.save(task.get());
        }
    }
}
