package com.hdi.backend.appuser;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUser getAppUserById(String id) {
        return appUserRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User with id: " + id + " not found"));
    }

    public AppUserDTO updateUserRole(String id, AppUserDTO userData) {
        AppUser appUserToUpdate = getAppUserById(id);
        AppUser appUserToSave = appUserToUpdate.withRole(userData.role());
        appUserRepository.save(appUserToSave);
        return userData;
    }
}
