package com.hdi.backend.appuser;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class AppUserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void getAppUsers_shouldReturnListOf2Users_when2UsersSavedInRepo() throws Exception {
        // GIVEN
        AppUser u1 = AppUser.builder()
                .id("1")
                .username("testname1")
                .role(AppUserRole.USER)
                .build();
        AppUser u2 = AppUser.builder()
                .id("2")
                .username("testname2")
                .role(AppUserRole.ADMIN)
                .build();
        appUserRepository.save(u1);
        appUserRepository.save(u2);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/user"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [
                            {
                                id: "1",
                                username: "testname1",
                                role: "USER"
                            },
                            {
                                id: "2",
                                username: "testname2",
                                role: "ADMIN"
                            }
                        ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void getAppUserById_shouldReturnUser_whenUserWithGivenIdExists() throws Exception {
        // GIVEN
        AppUser u = AppUser.builder()
                .id("1")
                .username("testname1")
                .role(AppUserRole.USER)
                .build();
        appUserRepository.save(u);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/user/" + u.id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                    {
                                                        id: "1",
                                                        username: "testname1",
                                                        role: "USER"
                                                    }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void updateUserRole_shouldUpdateRoleOfUserToNone_whenUserExistsAndHasRoleADMIN() throws Exception {
        // GIVEN
        AppUser u = AppUser.builder()
                .id("1")
                .username("testname1")
                .role(AppUserRole.ADMIN)
                .build();
        appUserRepository.save(u);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.put("/api/user/" + u.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "1",
                                     "username": "testname1",
                                    "role": "NONE"
                                }
                                """)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                                                                            {
                                                                                id: "1",
                                                                                username: "testname1",
                                                                                role: "NONE"
                                                                            }
                        """));
    }
}