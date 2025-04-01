package com.hdi.backend.checkupactions.title;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TitleRepository extends MongoRepository<Title, String> {
}
