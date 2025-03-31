package com.hdi.backend.appuser;

import com.hdi.backend.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public List<AppUser> getAppUsers() {
       return appUserRepository.findAll();
    }

    public AppUser getAppUserById(String id) {
        return appUserRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
    }

    public AppUser updateUserRole(String id, AppUserDTO userData) {
        AppUser appUserToUpdate = getAppUserById(id);
        AppUser appUserToSave = appUserToUpdate.withRole(userData.role());
        return appUserRepository.save(appUserToSave);
    }
}
