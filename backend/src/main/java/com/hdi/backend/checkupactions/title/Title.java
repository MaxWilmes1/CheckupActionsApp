package com.hdi.backend.checkupactions.title;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;

@With
@Builder
public record Title(
        @Id String id,
        String title
) {
}
