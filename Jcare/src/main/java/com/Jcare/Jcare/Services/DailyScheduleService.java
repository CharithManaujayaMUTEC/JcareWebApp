package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.Notice;
import com.Jcare.Jcare.repositories.NoticeRepo;
import com.Jcare.Jcare.repositories.TasksRepo;
import com.Jcare.Jcare.models.Tasks;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.TreeMap;

@Service
public class DailyScheduleService {
    private final TasksRepo tasksRepo;
    private final NoticeRepo noticeRepo;

    public DailyScheduleService(TasksRepo tasksRepo, NoticeRepo noticeRepo) {
        this.tasksRepo = tasksRepo;
        this.noticeRepo = noticeRepo;
    }

    public List<Tasks> findTodaysTasks(String taskAssignedToID) {
        LocalDate today = LocalDate.now();
        String todayString = today.toString();
        return tasksRepo.findByTaskAssignedToIDAndTaskDate(taskAssignedToID, todayString);
    }

    public List<TreeMap<String, String>> getTodaysTasks(String taskAssignedToID) {
        List<Tasks> todayTasks = tasksRepo.findByTaskAssignedToIDAndTaskDate(taskAssignedToID, LocalDate.now().toString());
        List<TreeMap<String, String>> taskList = new ArrayList<>();

        for (Tasks task : todayTasks) {
            TreeMap<String, String> taskMap = new TreeMap<>();
            taskMap.put("taskTime", task.getTime());
            taskMap.put("taskName", task.getTaskName());
            taskMap.put("taskStatus", task.getTaskStatus());
            taskMap.put("taskPriority", task.getTaskPriority());
            taskList.add(taskMap);
        }

        return taskList;
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

    public List<Notice> getNoticesForEmployee(String employeeId) {
        LocalDate today = LocalDate.now();
        String todayString = today.toString();
        return noticeRepo.findByNoticeToAndNoticeDate(employeeId, todayString);
    }

    public void markTaskAsDone(String taskId) {
        Optional<Tasks> task = tasksRepo.findById(taskId);
        if (task.isPresent()) {
            task.get().setTaskStatus("done");
            tasksRepo.save(task.get());
        }
    }
}
