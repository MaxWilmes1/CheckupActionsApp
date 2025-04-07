package com.hdi.backend.checkupactions;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
        String pi
) {
}
