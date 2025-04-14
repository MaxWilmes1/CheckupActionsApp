package com.hdi.backend.checkupactions.models;

import lombok.Builder;
import lombok.With;

@Builder
@With
public record CheckupActionDTO(
        String title,
        String subtitle,
        String art,
        String adu,
        String application,
        String cinum,
        String pi,
        String description,
        String responsibility,
        Status status
) {
}
