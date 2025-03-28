package com.hdi.backend.appuser;

import lombok.With;

import java.util.List;

@With
public record AppUser(
        String id,
        AppUserRole role,
        String username,
        String avatarUrl,
        String createdAt,
        List<String> favorite
) {
}
