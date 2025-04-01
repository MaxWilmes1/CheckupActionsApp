package com.hdi.backend.appuser;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;

@With
@Builder
public record AppUser(
        @Id String id,
        AppUserRole role,
        String username,
        String avatarUrl,
        String createdAt
) {
}
