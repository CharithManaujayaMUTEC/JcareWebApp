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
    private String itemDescription;
    private String itemQuantity;
    private String itemPrice;
    private String itemCategory;
    private String itemSupplier;
    private String itemSupplierPhone;
    private String itemSupplierEmail;
    private String itemSupplierAddress;
    private String itemSupplierRegNo;
}
