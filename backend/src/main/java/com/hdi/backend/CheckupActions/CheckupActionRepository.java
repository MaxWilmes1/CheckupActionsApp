package com.hdi.backend.CheckupActions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckupActionRepository extends MongoRepository<CheckupAction, String> {
}
