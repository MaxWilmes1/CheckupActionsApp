package com.hdi.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/{id}")
    public AppUser getAppUserById(@PathVariable String id) {
        return appUserService.getAppUserById(id);
    }

    @PutMapping("/{id}")
    public AppUserDTO updateUserRole(@PathVariable String id, @RequestBody AppUserDTO userData) {
        return appUserService.updateUserRole(id, userData);
    }
}
