package com.hdi.backend.appuser;

import lombok.Builder;

@Builder
public record AppUserDTO(
        AppUserRole role
) {
}
