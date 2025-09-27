package com.Jcare.Jcare.Services;

import com.Jcare.Jcare.models.Notice;
import com.Jcare.Jcare.models.Tasks;
import com.Jcare.Jcare.repositories.EmployessRepo;
import com.Jcare.Jcare.repositories.NoticeRepo;
import com.Jcare.Jcare.repositories.TasksRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DailyScheduleServiceTest {

    private TasksRepo tasksRepo;
    private NoticeRepo noticeRepo;
    private EmployessRepo employessRepo;
    private DailyScheduleService dailyScheduleService;

    @BeforeEach
    void setUp() {
        tasksRepo = mock(TasksRepo.class);
        noticeRepo = mock(NoticeRepo.class);
        employessRepo = mock(EmployessRepo.class);
        dailyScheduleService = new DailyScheduleService(tasksRepo, noticeRepo,employessRepo);
    }

    @Test
    void testFindTodaysTasks() {
        String employeeId = "EMP123";
        String today = LocalDate.now().toString();

        Tasks task = new Tasks();
        task.setTaskName("Check Vitals");
        task.setTaskAssignedToID(employeeId);
        task.setTaskDate(today);

        when(tasksRepo.findByTaskAssignedToIDAndTaskDate(employeeId, today))
                .thenReturn(Collections.singletonList(task));

        List<Tasks> result = dailyScheduleService.findTodaysTasks(employeeId);

        assertEquals(1, result.size());
        assertEquals("Check Vitals", result.get(0).getTaskName());
    }

    @Test
    void testGetTodaysTasks() {
        String employeeId = "EMP456";
        String today = LocalDate.now().toString();

        Tasks task = new Tasks();
        task.setTime("09:00");
        task.setTaskName("Morning Round");
        task.setTaskStatus("pending");
        task.setTaskPriority("high");

        when(tasksRepo.findByTaskAssignedToIDAndTaskDate(employeeId, today))
                .thenReturn(Collections.singletonList(task));

        List<TreeMap<String, String>> taskList = dailyScheduleService.getTodaysTasks(employeeId);

        assertEquals(1, taskList.size());
        TreeMap<String, String> taskMap = taskList.get(0);
        assertEquals("Morning Round", taskMap.get("taskName"));
        assertEquals("pending", taskMap.get("taskStatus"));
        assertEquals("09:00", taskMap.get("taskTime"));
        assertEquals("high", taskMap.get("taskPriority"));
    }

    @Test
    void testAddTask() {
        Tasks task = new Tasks();
        task.setTaskName("Evening Report");

        dailyScheduleService.addTask(task);

        verify(tasksRepo, times(1)).save(task);
    }

    @Test
    void testCompleteTask() {
        String taskId = "T123";
        Tasks task = new Tasks();
        task.setTaskStatus("pending");

        when(tasksRepo.findById(taskId)).thenReturn(Optional.of(task));

        dailyScheduleService.completeTask(taskId);

        assertEquals("completed", task.getTaskStatus());
        verify(tasksRepo).save(task);
    }

    @Test
    void testCompleteTask_NotFound() {
        when(tasksRepo.findById("T999")).thenReturn(Optional.empty());

        dailyScheduleService.completeTask("T999");

        verify(tasksRepo, never()).save(any());
    }

    @Test
    void testMarkTaskAsDone() {
        String taskId = "T321";
        Tasks task = new Tasks();
        task.setTaskStatus("pending");

        when(tasksRepo.findById(taskId)).thenReturn(Optional.of(task));

        dailyScheduleService.markTaskAsDone(taskId);

        assertEquals("done", task.getTaskStatus());
        verify(tasksRepo).save(task);
    }

    @Test
    void testMarkTaskAsDone_NotFound() {
        when(tasksRepo.findById("T000")).thenReturn(Optional.empty());

        dailyScheduleService.markTaskAsDone("T000");

        verify(tasksRepo, never()).save(any());
    }

    @Test
    void testGetNoticesForEmployee() {
        String employeeId = "EMP999";
        String today = LocalDate.now().toString();

        Notice notice = new Notice();
        notice.setNoticeTitle("Emergency Meeting");

        when(noticeRepo.findByNoticeToAndNoticeDate(employeeId, today))
                .thenReturn(Collections.singletonList(notice));

        List<Notice> notices = dailyScheduleService.getNoticesForEmployee(employeeId);

        assertEquals(1, notices.size());
        assertEquals("Emergency Meeting", notices.get(0).getNoticeTitle());
    }
}
