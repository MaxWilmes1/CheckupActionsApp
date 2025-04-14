package com.hdi.backend.checkupactions;

import com.hdi.backend.checkupactions.models.CheckupAction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckupActionRepository extends MongoRepository<CheckupAction, String> {
}
