package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Notice;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoticeRepo extends MongoRepository <Notice, String> {

    List<Notice> findByNoticeToAndNoticeDate(String noticeTo, String noticeDate);
}
