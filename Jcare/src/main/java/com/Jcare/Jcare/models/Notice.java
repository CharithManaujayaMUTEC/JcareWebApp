package com.Jcare.Jcare.models;

public class Notice {
    private String noticeId;
    private String notice;
    private String noticeDate;
    private String noticeTime;
    private String noticeFrom;
    private String noticeTo;

    public Notice(String noticeId, String notice, String noticeDate, String noticeTime, String noticeFrom, String noticeTo) {
        this.noticeId = noticeId;
        this.notice = notice;
        this.noticeDate = noticeDate;
        this.noticeTime = noticeTime;
        this.noticeFrom = noticeFrom;
        this.noticeTo = noticeTo;
    }

    public String getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(String noticeId) {
        this.noticeId = noticeId;
    }

    public String getNotice() {
        return notice;
    }

    public void setNotice(String notice) {
        this.notice = notice;
    }

    public String getNoticeDate() {
        return noticeDate;
    }

    public void setNoticeDate(String noticeDate) {
        this.noticeDate = noticeDate;
    }

    public String getNoticeTime() {
        return noticeTime;
    }

    public void setNoticeTime(String noticeTime) {
        this.noticeTime = noticeTime;
    }

    public String getNoticeFrom() {
        return noticeFrom;
    }

    public void setNoticeFrom(String noticeFrom) {
        this.noticeFrom = noticeFrom;
    }

    public void setNoticeTo(String noticeTo) {
        this.noticeTo = noticeTo;
    }

    public String getNoticeTo() {
        return noticeTo;
    }

}
