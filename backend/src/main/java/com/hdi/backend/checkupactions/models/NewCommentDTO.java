package com.hdi.backend.checkupactions.models;

import lombok.Builder;
import lombok.With;


@Builder
@With
public record NewCommentDTO(
        String comment,
        String author
) {
}
