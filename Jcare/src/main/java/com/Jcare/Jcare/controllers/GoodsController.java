package com.Jcare.Jcare.controllers;

import com.Jcare.Jcare.models.GoodsRequest;
import com.Jcare.Jcare.models.Inventory;
import com.Jcare.Jcare.repositories.GoodsRequestRepo;
import com.Jcare.Jcare.repositories.InventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goodsrequests")
@CrossOrigin(origins = "https://jcare-web-app.vercel.app")
public class GoodsController {

    @Autowired
    private GoodsRequestRepo goodsRequestRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

    // DTO for frontend payload
    public static class GoodsRequestDTO {
        public String requesterName;
        public String employeeId;
        public String department;
        public String priority;
        public String remarks;
        public List<Item> items;

        public static class Item {
            public String itemName;
            public int quantity;
            public String category;
        }
    }

    public static class UpdateRequestDTO {
        public String requestId;
        public String status; // "Approved" or "Rejected"
    }

    // Submit a new goods request
    @PostMapping("/requestGoods")
    public String requestGoods(@RequestBody GoodsRequestDTO request) {
        try {
            for (GoodsRequestDTO.Item item : request.items) {
                GoodsRequest goodsRequest = new GoodsRequest();
                goodsRequest.setRequesterName(request.requesterName);
                goodsRequest.setEmployeeId(request.employeeId);
                goodsRequest.setDepartment(request.department);
                goodsRequest.setPriority(request.priority);
                goodsRequest.setRemarks(request.remarks);
                goodsRequest.setItemName(item.itemName);
                goodsRequest.setQuantity(item.quantity);
                goodsRequest.setCategory(item.category);

                goodsRequestRepo.save(goodsRequest);
            }
            return "Request submitted successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to submit request!";
        }
    }

    // Get all goods requests (for approval list)
    @GetMapping("/getGoodsRequests")
    public List<GoodsRequest> getAllRequests() {
        return goodsRequestRepo.findAll();
    }

    // Approve or reject a goods request
    @PostMapping("/updateGoodsRequest")
    public String updateRequestStatus(@RequestBody UpdateRequestDTO dto) {
        try {
            GoodsRequest request = goodsRequestRepo.findByRequestId(dto.requestId)
                    .orElseThrow(() -> new RuntimeException("Request not found"));
            request.setStatus(dto.status);
            goodsRequestRepo.save(request);
            return "Request updated successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to update request!";
        }
    }

    // Inventory endpoints
    @GetMapping("/inventory/all")
    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

    @GetMapping("/inventory/category/{category}")
    public List<Inventory> getByCategory(@PathVariable String category) {
        return inventoryRepo.findByItemCategory(category);
    }

    @GetMapping("/inventory/search")
    public Inventory getByName(@RequestParam String itemName) {
        return inventoryRepo.findByItemName(itemName);
    }
}
