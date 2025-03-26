package com.hdi.backend.checkupactions;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CheckupActionRepository extends MongoRepository<CheckupAction, String> {
}
