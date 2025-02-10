package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventoryRepo extends MongoRepository<Inventory, String> {
    Inventory findByItemId(String itemId);
    Inventory findByItemName(String itemName);
    Inventory findByItemCategory(String itemCategory);
    Inventory findByItemSupplier(String itemSupplier);
    Inventory findByItemSupplierPhone(String itemSupplierPhone);
    Inventory findByItemSupplierEmail(String itemSupplierEmail);
    Inventory findByItemSupplierAddress(String itemSupplierAddress);
    Inventory findByItemSupplierRegNo(String itemSupplierRegNo);
}
