package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InventoryRepo extends MongoRepository<Inventory, String> {
    Inventory findByItemName(String itemName);
    List<Inventory> findByItemCategory(String category);
}
