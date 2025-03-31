package com.hdi.backend.security;

import com.hdi.backend.appuser.AppUser;
import com.hdi.backend.appuser.AppUserRepository;
import com.hdi.backend.appuser.AppUserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Test
    @DirtiesContext
    void getMe() throws Exception {

        AppUser testUser = AppUser.builder()
                .id("1")
                .role(AppUserRole.ADMIN)
                .username("testUser")
                .build();
        appUserRepository.save(testUser);
        mvc.perform(MockMvcRequestBuilders.get("/api/auth/me")
                        .with(oidcLogin().idToken(token -> token
                                .claim("sub", "1")
                        ))
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                                        {
                                                          id: "1",
                                                          role: "ADMIN",
                                                          username: "testUser",
                                                          avatarUrl: null,
                                                          createdAt: null
                                                        }
                                """
                ));
    }
}