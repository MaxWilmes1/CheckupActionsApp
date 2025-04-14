package com.hdi.backend.checkupactions.models;

import lombok.Builder;
import lombok.With;

@Builder
@With
public record UpdateCommentDTO(
        String id,
        String comment
) {
}
