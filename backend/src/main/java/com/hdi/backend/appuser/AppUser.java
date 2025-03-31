package com.hdi.backend.appuser;

import lombok.Builder;
import lombok.With;

@With
@Builder
public record AppUser(
        String id,
        AppUserRole role,
        String username,
        String avatarUrl,
        String createdAt
) {
}
