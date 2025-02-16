package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "departments")
public class Departments {
    @Id
    private String departmentName;
    private String departmentID;
    private String departmentlocation;
    private String departmentHeadID;
    private String departmentPhone;
    private String departmentEmail;
}
