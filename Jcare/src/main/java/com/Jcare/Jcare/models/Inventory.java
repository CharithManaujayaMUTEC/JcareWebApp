package com.Jcare.Jcare.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "inventory")
public class Inventory {
    @Id
    private String itemId;
    private String itemName;
    private String itemCategory;
    private int quantity;
    private String unit;
    private String supplier;
    private String location;


}