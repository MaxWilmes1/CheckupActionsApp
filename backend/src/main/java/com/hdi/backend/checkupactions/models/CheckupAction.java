package com.hdi.backend.checkupactions.models;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@With
@Document
public record CheckupAction(
        @Id String id,
        String title,
        String subtitle,
        String art,
        String adu,
        String application,
        String cinum,
        String pi,
        String description,
        String responsibility,
        Status status,
        List<Comment> comments,
        LocalDateTime dateCreated,
        LocalDateTime dateLastEdit
) {
}
