package com.hdi.backend.admin_data;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;

@With
@Builder
public record Data(
        @Id String id,
        DataType type,
        String info
) {
}
