package com.hdi.backend.checkupactions;

import lombok.Builder;
import lombok.With;

@Builder
@With
public record CheckupActionDTO(
        String title
) {
}
