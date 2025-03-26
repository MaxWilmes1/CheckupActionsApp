package com.hdi.backend.CheckupActions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class CheckupActionControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CheckupActionRepository checkupActionRepository;

    @Test
    @DirtiesContext
    void shouldReturnAllActions_whenActionsExist() throws Exception {
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);

        mvc.perform(MockMvcRequestBuilders.get("/api/checkup-actions"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                [
                                 {
                                  id: "1",
                                  title: "test"
                                 }
                                ]
                                """
                ));
    }

    @Test
    @DirtiesContext
    void shouldReturnActionById_whenActionExist() throws Exception {
        String idToFind = "1";
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);

        mvc.perform(MockMvcRequestBuilders.get("/api/checkup-actions/" + idToFind))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                 {
                                  id: "1",
                                  title: "test"
                                 }
                                """
                ));
    }

    @Test
    @DirtiesContext
    void addAction() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/checkup-actions/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "title": "testPassed"
                                        }
                                        """
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                                """
                                         {
                                          title: "testPassed"
                                         }
                                        """
                        )
                )
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    void deleteAction() throws Exception {
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);
        String idToDelete = "1";
        mvc.perform(MockMvcRequestBuilders.delete("/api/checkup-actions/delete/" + idToDelete))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    @DirtiesContext
    void shouldReturnUpdatedAction_whenUpdatingExistingAction() throws Exception {
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);

        mvc.perform(MockMvcRequestBuilders.put("/api/checkup-actions/update/" + action.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "title": "testPassed"
                                        }
                                        """
                        )
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                 {
                                 id: "1",
                                  title: "testPassed"
                                 }
                                """
                ));
    }
}