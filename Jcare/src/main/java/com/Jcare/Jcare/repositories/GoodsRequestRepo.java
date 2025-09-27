package com.Jcare.Jcare.repositories;

import com.Jcare.Jcare.models.GoodsRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface GoodsRequestRepo extends MongoRepository<GoodsRequest, String> {
    List<GoodsRequest> findByEmployeeId(String employeeId);
    List<GoodsRequest> findByStatus(String status);
    Optional<GoodsRequest> findByRequestId(String requestId);
}