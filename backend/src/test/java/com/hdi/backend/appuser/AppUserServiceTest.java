package com.hdi.backend.appuser;

import com.hdi.backend.exception.UserNotFoundException;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    private final AppUserRepository mockAppUserRepository = mock(AppUserRepository.class);
    private final AppUserService appUserService = new AppUserService(mockAppUserRepository);

    @Test
    void getAppUserById_shouldReturnUser_whenUserExist() {
        // GIVEN
        AppUser u = AppUser.builder()
                .id("1")
                .role(AppUserRole.USER)
                .username("testname")
                .build();
        when(mockAppUserRepository.findById(u.id())).thenReturn(Optional.of(u));
        // WHEN
        AppUser actual = appUserService.getAppUserById(u.id());
        // THEN
        verify(mockAppUserRepository).findById(u.id());
        assertEquals(u, actual);
    }

    @Test
    void getAppUserById_shouldThrowException_whenUserNotFound() {
        // GIVEN
        String notExistentId = "9999";
        when(mockAppUserRepository.findById(notExistentId)).thenReturn(Optional.empty());
        String expected = "User with id 9999 not found";
        // WHEN & THEN
        Exception actual = assertThrows(UserNotFoundException.class, () -> appUserService.getAppUserById(notExistentId));
        verify(mockAppUserRepository).findById(notExistentId);
        assertEquals(expected, actual.getMessage());
    }

    @Test
    void updateUserRole_shouldUpdateUserRoleToAdmin_whenUserExistAndRoleisUser() {
        // GIVEN
        String id = "1";
        AppUser existingUser = AppUser.builder()
                .id("1")
                .username("testusername")
                .role(AppUserRole.USER)
                .build();
        AppUserDTO userUpdateData = AppUserDTO.builder()
                .role(AppUserRole.ADMIN)
                .build();
        AppUser updatedUser = AppUser.builder()
                .id("1")
                .username("testusername")
                .role(AppUserRole.ADMIN)
                .build();
        when(mockAppUserRepository.findById(id)).thenReturn(Optional.ofNullable(existingUser));
        when(mockAppUserRepository.save(updatedUser)).thenReturn((updatedUser));
        // WHEN
        AppUser actual = appUserService.updateUserRole(id, userUpdateData);
        // THEN
        verify(mockAppUserRepository).findById(id);
        verify(mockAppUserRepository).save(updatedUser);
        assertEquals(updatedUser, actual);
    }
}