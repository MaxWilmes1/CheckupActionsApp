package com.hdi.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping
    public List<AppUser> getAppUsers(){
        return appUserService.getAppUsers();
    }

    @GetMapping("/{id}")
    public AppUserDTO getAppUserById(@PathVariable String id) {
        AppUser user = appUserService.getAppUserById(id);
        return new AppUserDTO(user.role(), user.username(), user.id());
    }

    @PutMapping("/{id}")
    public AppUserDTO updateUserRole(@PathVariable String id, @RequestBody AppUserDTO userData) {
        AppUser updatedUser = appUserService.updateUserRole(id, userData);
        return new AppUserDTO(updatedUser.role(), userData.username(), userData.id());
    }

}
