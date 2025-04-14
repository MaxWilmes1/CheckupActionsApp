package com.hdi.backend.checkupactions.models;

import lombok.Builder;
import lombok.With;

import java.time.LocalDateTime;

@Builder
@With
public record Comment(
        String id,
        String comment,
        String author,
        LocalDateTime dateCreated,
        LocalDateTime dateLastEdit
) {
}
