package com.hdi.backend.CheckupActions;

import lombok.Builder;
import lombok.With;

@Builder
@With
public record CheckupAction(
        String id,
        String title
) {
}
