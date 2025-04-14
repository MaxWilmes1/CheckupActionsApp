package com.hdi.backend.utils;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {
    public String generate() {
        return UUID.randomUUID().toString();  // UUID wird hier generiert
    }
}
