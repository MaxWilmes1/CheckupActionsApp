package com.hdi.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/{id}")
    public AppUserDTO getAppUserById(@PathVariable String id) {
        AppUser user = appUserService.getAppUserById(id);
        return new AppUserDTO(user.role());
    }

    @PutMapping("/{id}")
    public AppUserDTO updateUserRole(@PathVariable String id, @RequestBody AppUserDTO userData) {
        AppUser updatedUser = appUserService.updateUserRole(id, userData);
        return new AppUserDTO(updatedUser.role());
    }
}
